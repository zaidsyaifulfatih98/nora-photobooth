import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "zaidsyaifulfatih98@gmail.com",
    pass: 'xioiyvjewmlrnztq', // The 16-character App Password
  },
});


export default transporter