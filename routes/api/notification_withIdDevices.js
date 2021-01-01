const express = require('express');
const fetch = require('node-fetch');
var admin = require("firebase-admin");
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

router.post('/web/sendToAll', (req,res)=>{
    console.log('masuk')
    var notification ={
        'title' : 'Title of notification',
        'body' : 'Subtitle',
        "click_action": "http://localhost:3000/",
        "icon": "http://localhost:3000/favicon.ico"
    };

    var fcm_tokens = [
        `${process.env.FCM_TOKEN_WEB}`
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

router.post('/web2/sendToAll', (req,res)=>{
    var fcm_tokens = `${process.env.FCM_TOKEN_WEB}`
    var notification ={
        'title' : 'Title of notification',
        'body' : 'Subtitle'
    };

    var message = {
        notification: notification,
        webpush: {
            fcm_options: {
                link: 'https://www.google.com/'
            }
        },
        token: fcm_tokens,
    };

    admin.messaging().send(message)
    .then((response)=>{
        console.log(response)
        res.status(200).send('Notification send successfully');
    }).catch((err)=>{
        res.status(400).send('Something went wrong!');
        console.log(err);
    })
});

module.exports = router;