
const express = require('express')
const { fetchDoorFunc, updateDoorAccount } = require('./hygraphService')
const { SendMail } = require('./MailService');
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

let doors = [];
let results;


const OTPGenerator = () => {
  let otp = Math.floor(Math.random() * 899999) + 100000;
  console.log(otp, 'otp')
  return otp;
}
const fetchDoorEmail = async (doorId) => {
  results = await fetchDoorFunc();
  doors = results;
  console.log(doors);
  let email;
  doors.map(async (door) => {
    if (door.doorId == doorId) { email = door.email }
  })
  return email
}

app.get('/api/otp', (req, res) => {
  res.json(OTPGenerator())
})
app.post('/api/otp/', async (req, res) => {
  const email = await fetchDoorEmail(req.body.doorId);
  const result = SendMail({ email: email, otp: req.body.otp })
  res.send(result)
})
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
