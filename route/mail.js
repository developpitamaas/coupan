const Email = require("../controller/mailsend");
const express = require("express");
const Mail = express.Router();


Mail.route("/").post(Email.emailSend);


module.exports = Mail;