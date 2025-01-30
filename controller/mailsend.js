const nodemailer = require("nodemailer");

const sendEmail = async (
  email,
  subject,
  message,
  isHTML = false,
  user,
  pass,
  fromemail
) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: user,
      pass: pass,
    },
  });

  let mailOptions = {
    from: fromemail, // Your email address
    to: email,
    subject: subject,
    text: isHTML ? undefined : message,
    html: isHTML ? message : undefined,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

// POST route to handle email sending
const emailSend = async (req, res) => {
  const { email, subject, message, isHTML, user, pass, fromemail } = req.body;

  if (!email || !subject || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  try {
    const result = await sendEmail(
      email,
      subject,
      message,
      isHTML,
      user,
      pass,
      fromemail
    );
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = { emailSend };