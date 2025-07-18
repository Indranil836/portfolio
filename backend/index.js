const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'submissions.json');

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

const generateHash = (data) => {
  return crypto.createHash('sha256')
    .update(JSON.stringify(data))
    .digest('hex');
};

const isDuplicate = (submissions, hash) => {
  return submissions.some(sub => sub.hash === hash);
};

const saveSubmission = (data) => {
  const fs = require('fs');
  const DATA_FILE = path.join(__dirname, 'submissions.json');
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
  const submissions = JSON.parse(fs.readFileSync(DATA_FILE));
  const timestamp = new Date().toISOString();
  const hash = generateHash(data);
  const record = {
    hash,
    timestamp,
    data: data.formData,
    isDuplicate: isDuplicate(submissions, hash)
  };
  submissions.push(record);
  // fs.writeFileSync(DATA_FILE, JSON.stringify(submissions, null, 2));
  return record;
};

app.get('/', (req, res) => {
  res.json({ message: "GET request received!" });
});

const sendEmail = async (formData) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.APP_KEY
    }
  }); 
  const info = await transporter.sendMail({
    from: `Indranil Roy <${process.env.EMAIL_ID}>`,
    to: `${formData.email}`,
    cc: `Indranil Roy <${process.env.EMAIL_ID}>`,
    subject: `New ${formData.inquiryType} Inquiry: ${formData.subject || 'No Subject'}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; }
              .header { color: #2c3e50; font-size: 24px; margin-bottom: 20px; }
              .label { font-weight: bold; color: #34495e; width: 120px; display: inline-block; }
              .message { background: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; margin: 10px 0; }
              .footer { margin-top: 20px; font-size: 12px; color: #7f8c8d; }
          </style>
      </head>
      <body>
          <div class="header">New ${formData.inquiryType} Inquiry</div>
          
          <div><span class="label">Name:</span> ${formData.name}</div>
          <div><span class="label">Company:</span> ${formData.company || 'N/A'}</div>
          <div><span class="label">Email:</span> <a href="mailto:${formData.email}">${formData.email}</a></div>
          ${formData.budget ? `<div><span class="label">Budget:</span> ${formData.budget}</div>` : ``}
          ${formData.timeline ? `<div><span class="label">Timeline:</span> ${formData.timeline}</div>` : ``}
          ${formData.technologies ? `<div><span class="label">Technologies:</span> ${formData.technologies}</div>` : ``}
          ${formData.eventName ? `<div><span class="label">Event Name:</span> ${formData.eventName}</div>` : ``}
          ${formData.eventDate ? `<div><span class="label">Date:</span> ${formData.eventDate}</div>` : ``}
          ${formData.topic ? `<div><span class="label">Topic:</span> ${formData.topic}</div>` : ``}
          ${formData.mentoringArea ? `<div><span class="label">Mentoring Area:</span> ${formData.mentoringArea}</div>` : ``}
          ${formData.experienceLevel ? `<div><span class="label">Experience Level:</span> ${formData.experienceLevel}</div>` : ``}
        
          <div class="message">
              <div><strong>Message:</strong></div>
              <p>${formData.message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div class="footer">
              <p>This email was sent via your portfolio contact form at ${new Date().toLocaleString()}</p>
          </div>
      </body>
      </html>
      `
  }).then((info) => {
    console.log('Message sent: %s', info.messageId);
  }).catch((error) => {
    console.error('Error sending email:', error);
  });
  return info;
}

app.post('/contact', async (req, res) => {
  try {
    const formData = req.body;
    saveSubmission({ formData });
    await sendEmail(formData);
    res.status(200).json({ message: 'Submission received', 'data': formData });
  }
  catch (error) {
    console.error('Error processing submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/submissions', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error reading submissions' });
  }
});

const PORT = 9013;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});