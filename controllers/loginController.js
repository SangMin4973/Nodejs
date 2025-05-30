const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");

const getLogin = (req, res) => {
    res.render("home");
}

const loginUser = asyncHandler(async(req, res) => {
    const {username, password} = req.body;
    if(username === "admin" && password === "1234"){
        res.send("Login success");
    } else {
        res.send("Login failed");
    }
});

const getRegister = (req, res) => {
    res.render("register")
}

const registerUser = asyncHandler(async (req, res) => {
    const { username, password, password2 } = req.body;
    if (password === password2) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword})
        res.status(201).json({message: "Register successful", user})
    } else {
        res.send("Register Failed")
    }
})
module.exports = {getRegister, registerUser, getLogin, loginUser}