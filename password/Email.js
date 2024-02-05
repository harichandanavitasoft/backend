const nodemailer = require("nodemailer");

const sendEmail = async (req, res, next) => {
     const email=req.body.email

   
        const transporter = nodemailer.createTransport({
          
            service: "gmail",
          
            auth: {
                user: "harichandanavita@gmail.com",
                pass: "wghv wrvi uebp ibmt",
            },

        });
       let emaildata={
        from: "harichandanavita@gmail.com",
        to: email,
        subject: "password reset",
        text: "http://localhost:4200/reset",
       }
       transporter.sendMail(emaildata,async(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("email sent successfully");
         
         
        }
       })
    }  

       
module.exports = sendEmail;