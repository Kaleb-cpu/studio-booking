import nodemailer from "nodemailer";

export async function sendEmailNotification({
  name,
  email,
  phone,
  service,
  dateTime,
}: {
  name: string;
  email: string;
  phone: string;
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

  const formattedDateTime = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(dateTime));

  // Owner Notification - Booking details
  const mailOptionsOwner = {
    from: `"Bethany Recording Studio" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL, // my own email
    subject: "New Booking at Bethany Recording Studio",
    text: `Hello,

You have a new booking at Bethany Recording Studio! Here are the details:

------------------------------------------
Name: ${name}
Email: ${email}
Phone: ${phone}

Service Requested: ${service}

Date & Time of Session: ${formattedDateTime}

Please review the booking and ensure the requested time is available.

Best regards,  
Bethany Recording Studio Team
`,
  };

  // Customer Confirmation - Booking confirmation details
  const mailOptionsCustomer = {
    from: `"Bethany Recording Studio" <${process.env.EMAIL_USER}>`,
    to: email, // Send confirmation to the customer's email
    subject: "Booking Confirmation – Bethany Recording Studio",
    text: `Hello ${name},

Thank you for booking a session at Bethany Recording Studio! I am excited to have you. Below are the details of your booking:

------------------------------------------
Service Requested: ${service}

Date & Time of Your Session: ${formattedDateTime}

------------------------------------------

I look forward to providing you with a great recording experience. If you need to make any changes or have any questions, feel free to contact me at (587) - 664 9918.

See you soon!

Best regards,  
Kaleb - Bethany Recording Studio 
`,
  };

  // Send both emails
  try {
    // Send email to the owner
    await transporter.sendMail(mailOptionsOwner);
    console.log("Owner notification sent.");

    // Send email to the customer
    await transporter.sendMail(mailOptionsCustomer);
    console.log("Customer confirmation sent.");
  } catch (error) {
    console.error("Error sending emails:", error);
  }
}
