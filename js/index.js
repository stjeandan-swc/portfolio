// Express
const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
// create application/json parser
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

// create a reuseable transport object
const smtpTransport = nodemailer.createTransport({
    service: process.env.EMAIL_PROVIDER,
    auth: {
        user: email,
        pass: password
    }
});


// Start the server
app.listen(PORT, () => {
    console.log('listening on port: ' + PORT);
});

// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../html', '/contact.html'));
});

app.post('/contact', urlencodedParser, async (req, res) => {
        
    const userEmail = req.body.user_email;
    // define mail options
    const mailOptions = {
        from: userEmail,
        to: email,
        subject: req.body.subject,
        text: req.body.message,
        html: `name: ${req.body.user_name} <br><br> ${req.body.message}`
    };

    // send mail with defined transport object
    await smtpTransport.sendMail(mailOptions, function(error, info) {
        if(error) {
            console.log(error);
        }
        else {
            console.log('email sent: ' + info.response);
        }
    });

});