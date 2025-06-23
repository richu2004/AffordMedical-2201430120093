const axios = require('axios');

async function getToken() {
  const res = await axios.post('http://20.244.56.144/evaluation-service/auth', {
    email: "agarwalrichu3@gmail.com",
    name: "Richu Agarwal",
    rollNo: "2201430120093",
    accessCode: "nsXDeD",
    clientID: "Anshul-Client1234",
    clientSecret: "Anshul-Secret1234"
  });

  console.log("Auth Token:", res.data);
}

getToken().catch(console.error);