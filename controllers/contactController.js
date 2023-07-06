const asyncHandler = require("express-async-handler");
const ContactModel = require("../models/contactModel");

//@desc Get All Contacts
//@route GET /api/contacts/
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await ContactModel.find({ user_id: req.user.id });
  //res.status(200).json({ message: "Get All Contacts" });
  res.status(200).json(contacts);
});

//@desc Create a Contact
//@route POST /api/contacts/
//@access private
const postContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await ContactModel.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json({ message: "Create Success", contact });
});

//@desc Get Single Contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await ContactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  res.status(200).json(contact);
});
//@desc Update Contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await ContactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User dont have permission to update other user contact");
  }

  const updatedContact = await ContactModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res
    .status(200)
    .json({ message: "Update Success", updateContact: updatedContact });
});

//@desc Delete a Contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await ContactModel.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User dont have permission to delete other user contact");
  }

  await ContactModel.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "Delete Success", contact: contact });
});

module.exports = {
  getContacts,
  postContact,
  getContact,
  updateContact,
  deleteContact,
};
