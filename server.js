const express = require('express');

const app = express();

app.use('/api/notification/devices',require('./routes/api/notification_withIdDevices'));
app.use('/api/notification/topic',require('./routes/api/notification_withTopic'));

const PORT = process.env.PORT || 5123 ;

app.listen(PORT,()=> console.log('server started'))