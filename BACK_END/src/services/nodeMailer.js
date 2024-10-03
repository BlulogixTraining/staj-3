// services/emailService.js
const nodemailer = require('nodemailer');
const path = require('path');
const { generateInvoicePDF } = require('../utils/PdfGenerator'); // Import the PDF generator

require('dotenv').config({ path: path.join(__dirname, '../..', '.env') });

const sendEmail = async (config) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
      }
    });

    // Generate the invoice PDF
    const invoicePDF = await generateInvoicePDF(config.invoiceData); 

    let mailOptions = {
      from: config.from,
      to: config.to,
      subject: config.subject,
      text: config.text,
      html: config.html, // Optionally send HTML content
      attachments: [
        {
          filename: 'invoice.pdf',
          content: invoicePDF,
          encoding: 'base64'
        }
      ]
    };

    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return info;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = sendEmail;
