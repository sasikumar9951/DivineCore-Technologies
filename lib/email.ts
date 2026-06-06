import nodemailer from "nodemailer";

interface EmailConfig {
  to: string;
  candidateName: string;
  role: string;
  applicationId: string;
  applicationType: string;
}

export async function sendConfirmationEmail({
  to,
  candidateName,
  role,
  applicationId,
  applicationType,
}: EmailConfig) {
  // Validate presence of SMTP configurations
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    console.error("SMTP Configuration missing in environment variables. Email confirmation skipped.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  });

  const mailOptions = {
    from: `"DivineCore Technologies Recruitment" <${user}>`,
    to,
    subject: `Application Received - ${role} - ${applicationId}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Application Received</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f6f9;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
            border: 1px solid #e1e8ed;
          }
          .header {
            background-color: #0b3c5d;
            padding: 40px 20px;
            text-align: center;
            color: #ffffff;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: 0.5px;
          }
          .header p {
            margin: 5px 0 0 0;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #328cc1;
            font-weight: bold;
          }
          .content {
            padding: 30px 40px;
            color: #333333;
            line-height: 1.6;
          }
          .content h2 {
            font-size: 18px;
            margin-top: 0;
            color: #0b3c5d;
          }
          .details-box {
            background-color: #f8fafd;
            border-left: 4px solid #328cc1;
            padding: 15px 20px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .details-box p {
            margin: 8px 0;
            font-size: 14px;
          }
          .details-box strong {
            color: #0b3c5d;
          }
          .footer {
            background-color: #f8fafc;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #777777;
            border-top: 1px solid #e1e8ed;
          }
          .footer a {
            color: #328cc1;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>DivineCore Technologies</h1>
            <p>Recruitment Desk</p>
          </div>
          <div class="content">
            <h2>Hello ${candidateName},</h2>
            <p>Thank you for applying to DivineCore Technologies. Your application has been submitted successfully.</p>
            <p>Our recruitment team will review your profile and contact shortlisted candidates for further rounds.</p>
            
            <div class="details-box">
              <p><strong>Application ID:</strong> ${applicationId}</p>
              <p><strong>Position:</strong> ${role}</p>
              <p><strong>Type:</strong> ${applicationType}</p>
            </div>

            <p>If we require any further details or schedule an interview, we will reach out to you on this email address or your mobile number.</p>
            <p>Best Regards,<br><strong>DivineCore Technologies Recruitment Team</strong></p>
          </div>
          <div class="footer">
            <p>&copy; 2026 DivineCore Technologies. All rights reserved.</p>
            <p>Website: <a href="http://www.divinecoretech.in">www.divinecoretech.in</a> | Email: <a href="mailto:info@divinecoretech.in">info@divinecoretech.in</a></p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${to}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`Error sending confirmation email to ${to}:`, error);
    throw error;
  }
}
