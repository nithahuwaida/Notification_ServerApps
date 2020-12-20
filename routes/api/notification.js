const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

router.post('/sendToAll', (req,res)=>{
    var notification ={
        'title' : 'Title of notification',
        'text' : 'Subtitle'
    };

    var fcm_tokens = [
        'eRmDU5f7T5ObtHa77e-wFE:APA91bEBks4Insckx56p1sAoSNTe2-VnXg-vt4MMRMyhR5PClpPmcaKMSFY82leYub7DtfeE3mi4xsyOQHW3QtCQBYRhs0QfGuKv5JtpPxBSjcDPRUSHsauFc7Z6Yjd23G42RgvN18D6'
    ];
    var notification_body = {
        'notification' : notification,
        'registration_ids' : fcm_tokens
    }

    fetch('https://fcm.googleapis.com/fcm/send', {
        'method' : 'POST',
        'headers' : {
            'Authorization' : 'key='+'AAAAS8aIykg:APA91bFgQ7PXzzpGjqlpFeilxFqCnTzDhxa-Pl4zTwHcNpRKzSRJD3glgQduBkptYdiN6o0KG22z6oj17fWZbc7svpRDCZoUzYr9V9hHPYm8sqEbGg9NG8h5MHZTQNvbLxFbTwuSScQM',
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