const sendEmail = require('./sendEmails');

const demoFunction = async()=>{
try {
  await sendEmail.run();
} catch (error) {
  console.log(error)
}

}

demoFunction()