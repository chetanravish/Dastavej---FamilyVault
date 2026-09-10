import dotenv from 'dotenv';

dotenv.config();

if(!process.env.MONGO_URI)  {
    throw new Error("MONGO URI Is Not Defined")
}
if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is not defined")
}
if(!process.env.BREVO_HOST){
    throw new Error("BREVO_HOST is not defined")
}
if(!process.env.BREVO_PORT){
    throw new Error("BREVO_PORT is not defined")
}
if(!process.env.BREVO_LOGIN){
    throw new Error("BREVO_LOGIN is not defined")
}
if(!process.env.BREVO_SMTP_KEY){
    throw new Error("BREVO_SMTP_KEY is not defined")
}
if(!process.env.BREVO_SENDER_EMAIL){
    throw new Error("BREVO_SENDER_EMAIL is not defined")
}
if(!process.env.BREVO_SENDER_NAME){
    throw new Error("BREVO_SENDER_NAME is not defined")
}

if(!process.env.AWS_ACCESS_KEY_ID){
    throw new Error("AWS_ACCESS_KEY_ID is not defined")
}
if(!process.env.AWS_SECRET_ACCESS_KEY){
    throw new Error ("AWS_SECRET_ACCESS_KEY is not defined")
}
if(!process.env.AWS_REGION){
    throw new Error("AWS_REGION is not defined")
}
const config ={
    MONGO_URI:process.env.MONGO_URI,
    JWT_SECRET:process.env.JWT_SECRET,
    BREVO_HOST:process.env.BREVO_HOST,
    BREVO_PORT:process.env.BREVO_PORT,
    BREVO_LOGIN:process.env.BREVO_LOGIN,
    BREVO_SMTP_KEY:process.env.BREVO_SMTP_KEY,
    BREVO_SENDER_EMAIL:process.env.BREVO_SENDER_EMAIL,
    BREVO_SENDER_NAME:process.env.BREVO_SENDER_NAME,
    AWS_REGION:process.env.AWS_REGION,
    AWS_ACCESS_KEY_ID:process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY:process.env.AWS_SECRET_ACCESS_KEY,
    AWS_BUCKET_NAME:process.env.AWS_BUCKET_NAME


}
export default config;