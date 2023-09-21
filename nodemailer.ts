import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export async function sendMessage(name: string, email: string, message: string) {
  const info = await transporter.sendMail({
    from: `"${name}" <${email}>`,
    to: process.env.NODEMAILER_DIRECTION,
    subject: "Hello nodemailer",
    text: message,
  });

  console.log("Message sent: %s", info.messageId);

  transporter.close();
}

sendMessage("soerjo hastomo", "soerjohastomo@gmail.com", "pesan mandiri").catch(console.error);
