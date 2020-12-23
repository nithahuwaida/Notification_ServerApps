const express = require('express');
const fetch = require('node-fetch');
var dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

router.post('/sendToAll', (req,res)=>{
    var notification ={
        'title' : 'Title of notification',
        'text' : 'Subtitle'
    };

    var fcm_tokens = [
        `${process.env.FCM_TOKEN}`
    ];
    var notification_body = {
        'notification' : notification,
        'registration_ids' : fcm_tokens
    }

    fetch('https://fcm.googleapis.com/fcm/send', {
        'method' : 'POST',
        'headers' : {
            'Authorization' : 'key='+`${process.env.FIREBASE_KEY}`,
            'Content-Type' : 'application/json'
        },
        'body' : JSON.stringify(notification_body)
    }).then((response)=>{
        console.log(response)
        res.status(200).send('Notification send successfully');
    }).catch((err)=>{
        res.status(400).send('Something went wrong!');
        console.log(err);
    })
});

module.exports = router;