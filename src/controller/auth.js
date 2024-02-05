const user = require("../database/user.js")
const argon2 = require("argon2")
const connection = require("../connection/db.js")

export const Login = async (req, res) => {
    const { email, password } = req.body;

    connection.query(
        "SELECT * FROM user WHERE username = ?",
        [email],
        async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: "Server Error" });
            }

            if (!results.length) {
                return res.status(404).json({ msg: "User tidak ditemukan" });
            }

            const user = results[0];

            try {
                const match = await argon2.verify(user.password, password);

                if (!match) {
                    return res.status(400).json({ msg: "Password salah" });
                }

                req.session.userId = user.id; // Sesuaikan dengan kolom yang menyimpan UUID
                const { id, name, username, role } = user;
                res.status(200).json({ id, name, username, role });
            } catch (error) {
                console.error(error);
                res.status(500).json({ msg: "Server Error" });
            }
        }
    );
};

export const Me = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }

    connection.query(
        "SELECT * FROM user WHERE id = ?",
        [req.session.userId],
        async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ msg: "Server Error" });
            }

            if (!results.length) {
                return res.status(404).json({ msg: "User tidak ditemukan" });
            }

            const user = results[0];
            const { id, name, username, role } = user;

            res.status(200).json({ id, name, username, role });
        }
    );
};

export const logOut = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(400).json({ msg: "Tidak dapat logout" });
        }

        res.status(200).json({ msg: "Anda telah logout" });
    });
};