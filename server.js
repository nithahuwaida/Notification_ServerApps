const express = require('express');

const app = express();
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use('/api/notification/devices',require('./routes/api/notification_withIdDevices'));
app.use('/api/notification/topic',require('./routes/api/notification_withTopic'));
app.use('/api/notification/topic/action',require('./routes/api/notification_with_action_click_v2'));

const PORT = process.env.PORT || 5123 ;

app.listen(PORT,()=> console.log('server started'))