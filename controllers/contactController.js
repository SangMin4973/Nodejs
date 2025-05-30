const asyncHandler = require("express-async-handler");
const Contact = require("../model/contactModel")

const getAllContacts = asyncHandler(async(req, res) => {
    const contacts = await Contact.find();
    res.render("index", {contacts: contacts})
});

const addContactForm = (req,res) => {
    res.render("add");
}

const getLogin = (req,res) => {
    res.render("home");
}

const createContact = asyncHandler(async(req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        return res.status(400).send("필수값이 입력되지 않았습니다.");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
    })
    res.redirect("/contacts");
});

const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    res.render("update", {contact: contact});
});

const updateContact = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { name, email, phone } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
        id,
        {name, email, phone},
        {new: true}
    )

    res.redirect("/contacts")
});

const deleteContact = asyncHandler(async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.redirect("/contacts")
});

module.exports = {
    getAllContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
    addContactForm,
    getLogin
};