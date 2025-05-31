import nodemailer from "nodemailer";

export async function sendEmailNotification({
  name,
  email,
  phone,
  service,
  dateTime,
  songCount, // Add songCount parameter
}: {
  name: string;
  email: string;
  phone: string;
  service: string;
  dateTime: string;
  songCount: number; // Add to type definition
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const formattedDateTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Edmonton", // <- Replace this with your actual time zone
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(dateTime));
  

  // Calculate session duration for display
  const durationMinutes = service === "final" ? songCount * 60 : songCount * 30;
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  const durationText = `${hours > 0 ? `${hours} hr${hours !== 1 ? 's' : ''}` : ''}${hours > 0 && minutes > 0 ? ' ' : ''}${minutes > 0 ? `${minutes} min${minutes !== 1 ? 's' : ''}` : ''}`;

  // Owner Notification - Booking details
  const mailOptionsOwner = {
    from: `"Bethany Recording Studio" <${process.env.EMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    subject: "New Booking at Bethany Recording Studio",
    text: `Hello,

You have a new booking at Bethany Recording Studio! Here are the details:

------------------------------------------
Name: ${name}
Email: ${email}
Phone: ${phone}

Service Requested: ${service === "final" ? "Final Vocal Recording" : "Demo Recording"}
Number of Songs: ${songCount}
Estimated Duration: ${durationText}

Date & Time of Session: ${formattedDateTime}

Please review the booking and ensure the requested time is available.

Best regards,  
Bethany Recording Studio Team
`,
  };

  // Customer Confirmation - Booking confirmation details
  const mailOptionsCustomer = {
    from: `"Bethany Recording Studio" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Booking Confirmation – Bethany Recording Studio",
    text: `Hello ${name},

Thank you for booking a session at Bethany Recording Studio! I am excited to have you. Below are the details of your booking:

------------------------------------------
Service Requested: ${service === "final" ? "Final Vocal Recording" : "Demo Recording"}
Number of Songs: ${songCount}
Estimated Duration: ${durationText}

Date & Time of Your Session: ${formattedDateTime}

------------------------------------------

I look forward to providing you with a great recording experience. If you need to make any changes or have any questions, feel free to contact me at (587)-664-9918.

See you soon!

Best regards,  
Kaleb - Bethany Recording Studio 
`,
  };

  // Send both emails
  try {
    await transporter.sendMail(mailOptionsOwner);
    console.log("Owner notification sent.");
    await transporter.sendMail(mailOptionsCustomer);
    console.log("Customer confirmation sent.");
  } catch (error) {
    console.error("Error sending emails:", error);
    throw error; // Re-throw to handle in the calling function
  }
}