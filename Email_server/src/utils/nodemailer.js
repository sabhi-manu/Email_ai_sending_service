import nodemailer  from "nodemailer"

console.log("Nodemailer initialized :",process.env.EMAIL_USER,process.env.EMAIL_PASS)
const transporter = nodemailer.createTransport({
    service: "Gmail", 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
 

async function sendMail({to,subject,text,html,attachments}) {
    console.log("Nodemailer initialized :",process.env.EMAIL_USER,process.env.EMAIL_PASS)
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER ,
            to,
            subject,
            text,
            html,
            attachments
        })
         console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error("Error while sending mail:", error);
         throw error;
    }
    
}

export default sendMail