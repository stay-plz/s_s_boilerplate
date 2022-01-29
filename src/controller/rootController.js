import User from "../models/User";

export const home = (req, res) => res.send("Home Router");

export const getRegister = (req, res) => res.send("Register Router");
export const postRegister = async (req, res) => {
    try {
        const {
            body: { name, email, password },
        } = req;

        const user = new User({
            name,
            email,
            password,
        });

        const result = await user.save();
        console.log(result);
        return res.status(200).end();
    } catch (err) {
        return res.status(500).end();
    }
};
