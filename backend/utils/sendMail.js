const transporter = require("./transporter");

module.exports = async (to, text) => {
    try {
        await transporter.sendMail({
            from: `"${process.env.MAIL_SERVICE_NAME}" <${process.env.MAIL_SERVICE_EMAIL}>`,
            to,
            subject: "Searched Records",
            text,
            html: text
        });
        console.log("E-mail sent to: " + to);
    } catch (error) {
        console.log(error);
    }
};