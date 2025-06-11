const { SESClient } = require("@aws-sdk/client-ses");
// Set the AWS Region.
const REGION = "ap-south-1";
require('dotenv').config();

// Create SES service object.
const sesClient = new SESClient({
  region: REGION,
  credentials:{
    accessKeyId:process.env.AWS_ACCESS_KEY,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
  }
});

//AWS_ACCESS_KEY   AWS_SECRET_ACCESS_KEY
module.exports = { sesClient };