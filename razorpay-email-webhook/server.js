import express from 'express';
import bodyParser from 'body-parser';
const { json } = bodyParser;

import { createHmac } from 'crypto';
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();

// Use raw body parser for signature verification if required
app.use(express.json({
  verify: (req, res, buf) => {
    if (buf && buf.length) {
      req.rawBody = buf.toString();
    }
  }
}));

const PORT = process.env.PORT || 3000;
const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

// Configure Nodemailer transporter (example using Gmail SMTP)
const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // Use environment variables or secure storage in production
  }
});

// Helper function to verify Razorpay signature
function verifySignature(body, signature) {
  if (!body) {
    console.error('Error: No body received for signature verification.');
    return false; // Return false instead of crashing
  }

  const expectedSignature = createHmac('sha256', WEBHOOK_SECRET)
    .update(body)
    .digest('hex');

  return expectedSignature === signature;
}

// Webhook endpoint
app.post('/webhook', (req, res) => {
  const razorpaySignature = req.headers['x-razorpay-signature'];

  console.log("Raw body received:", req.rawBody);
  console.log("Signature received:", razorpaySignature);

  

  if (!verifySignature(req.rawBody, razorpaySignature)) {
    console.error('Invalid signature');
    return res.status(400).send('Invalid signature');
  }

  const payload = req.body;
  console.log('Received webhook:', payload);

  // Check if the event is 'payment.captured'
  if (payload.event === 'payment.captured') {
    // Extract payment details as needed (e.g., payer email)
    const paymentData = payload.payload.payment.entity;
    console.log("Email Address is - ", paymentData.email);
    
    const payerEmail = paymentData.email || process.env.EMAIL_DEFAULT;  // Replace with correct extraction logic

    // Compose your email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: payerEmail,
      subject: 'Payment Successful',
      text: `Hi there,\n\nYour payment of Rs. ${paymentData.amount / 100} was successful. Thank you for your purchase!
      \n\n This is Your Link to the 800+ EBooks : ${process.env.GOOGLE_DRIVE_LINK}
      \n\nRegards,\nShri Enterprise`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }

  // Acknowledge receipt of the webhook to Razorpay
  res.status(200).send('OK');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
