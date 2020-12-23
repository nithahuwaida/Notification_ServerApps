const express = require('express');
var admin = require("firebase-admin");
var serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const router = express.Router();


router.post('/v1', (req,res)=>{
    var topicName = 'industry-tech'

    var message = {
    notification: {
        title: 'Breaking News....'
    },
    android: {
        notification: {
        click_action: 'https://www.google.com/'
        }
    },
    apns: {
        payload: {
        aps: {
            'category': 'INVITE_CATEGORY'
        }
        }
    },
    webpush: {
        fcm_options: {
        link: 'https://www.google.com/'
        }
    },
    topic: topicName,
    };

    admin.messaging().send(message)
    .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
    })
    .catch((error) => {
        console.log('Error sending message:', error);
    });
});

module.exports = router;