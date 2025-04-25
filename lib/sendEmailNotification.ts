import nodemailer from "nodemailer";

export async function sendEmailNotification({
  name,
  email,
  service,
  dateTime,
}: {
  name: string;
  email: string;
  service: string;
  dateTime: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Bethany Recording Studio" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL, // your own email
    subject: "New Studio Booking",
    text: `New booking by ${name} (${email})
Service: ${service}
Date & Time: ${new Date(dateTime).toLocaleString()}`,
  };

  await transporter.sendMail(mailOptions);
}
