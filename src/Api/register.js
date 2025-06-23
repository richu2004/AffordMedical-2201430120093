const axios = require('axios');

async function register() {
  const response = await axios.post('http://20.244.56.144/evaluation-service/register', {
    email: "agarwalrichu3@gmail.com",
    name: "Richu Agarwal",
    mobileNo: "9876543210",
    githubUsername: "http/github.com/richu2004",
    rollNo: "2201430120093",
    collegeName: "IMS Engineering College",
    accessCode: "nsXDeD"
  });

  console.log("Registration Response:", response.data);
}

register().catch(console.error);