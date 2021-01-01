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

    var notification_body = {
        //notification with topic
        'to' : '/topics/topic',
        'notification' : notification,
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
    var notification ={
        'title' : 'Title of notification',
        'text' : 'Subtitle'
    };

    var notification_body = {
        //notification with topic
        'to' : '/topics/some-topic',
        'notification' : notification,
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
        topic: '/topics/some-topic',
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