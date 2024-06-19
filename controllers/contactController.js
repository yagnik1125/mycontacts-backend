const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@decription Get all contacts
//@route GET /api/contacts
//@access private

const getContacts = asyncHandler(async (req, res) => { //gonna return request and results
    // res.send("Get all contacts");
    const contacts = await Contact.find({user_id:req.user.id});
    // res.status(200).json({ message: "Get all contacts" });//json format response with 200 status code
    res.status(200).json(contacts);//json format response with 200 status code
});

//@decription Create New contact
//@route POST /api/contacts
//@access private

const createContact = asyncHandler(async (req, res) => { //gonna return request and results
    console.log("The request Body is: ", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are required to be filled");
    }
    const contact = await Contact.create({
        name, email, phone,
        user_id:req.user.id
    });
    // res.status(201).json({ message: "Create Contact" });//json format response with 200 status code
    res.status(201).json(contact);//json format response with 200 status code
});

//@decription Get contact
//@route GET /api/contacts/:id
//@access private

const getContact = asyncHandler(async (req, res) => {
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    // res.status(200).json({ message: `Get contact for ${req.params.id}` });
    res.status(200).json(contact);
});

//@decription Update contact
//@route PUT /api/contacts/:id
//@access private

const updateContact = asyncHandler(async (req, res) => {
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update another user's contacts!");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    // res.status(200).json({ message: `Update contact for ${req.params.id}` });
    res.status(200).json(updatedContact);
});

//@decription Delete contact
//@route DELETE /api/contacts/:id
//@access private

const deleteContact = asyncHandler(async (req, res) => {
    // if(contact.user_id.toString() !== req.user.id){
    //     res.status(403);
    //     throw new Error("User don't have permission to update another user's contacts!");
    // }

    // const contact = await Contact.findByIdAndDelete(req.params.id);

    // if (!contact) {
    //     res.status(404);
    //     throw new Error("Contact not found");
    // }


    // // res.status(200).json({ message: `Delete contact for ${req.params.id}` });
    // res.status(200).json(contact);
    
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update another user's contacts!");
    }
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
});

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };

// 9913014751