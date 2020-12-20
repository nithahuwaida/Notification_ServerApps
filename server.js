const express = require('express');

const app = express();

const PORT = process.env.PORT || 5123 ;

app.listen(PORT,()=> console.log('server started'))