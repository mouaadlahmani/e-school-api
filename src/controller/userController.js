const userService = require("../service/userService");

const login = async (req, res) => {
    try {
        console.log("Request body:", req.body);

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const { token, user } = await userService.login(email, password);
        res.status(200).json({ message: "Login successful.", token, user });
    } catch (error) {
        console.error(error.message);
        if (error.message === "Invalid credentials.") {
            return res.status(401).json({ message: error.message });
        }
        res.status(500).json({ message: "Server error." });
    }
};

module.exports = {
    login
}