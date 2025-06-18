const cron = require('node-cron');
const dateFns = require("date-fns");
const connectionRequestModel = require("../models/connectionRequest");
const sendEmail = require("./sendEmails");
cron.schedule('40 21 8 * * *', async () => {
  // get yesterday
  // const yesterday = dateFns.subDays(new Date(),1);
  // const yesterdayBegin = dateFns.startOfDay(yesterday);
  // const yesterdayEnd = dateFns.endOfDay(yesterday);
  try {
    const requestsPending = await connectionRequestModel.find({
      status: "interested"
    }).populate("toUserId");
    
    const emailsToSend = [...new Set(requestsPending.map((request)=>request.toUserId.emailId))];
    console.log(emailsToSend);
    emailsToSend.forEach(async(email)=>{
        try {
          await sendEmail.run("Pending Connection requests","To many requestion request pending. Please review request");
        } catch (error) {
          console.log(error);
        }
    })
  } catch (error) {
    console.log(error);
  }



});

