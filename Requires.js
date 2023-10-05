const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const Students = require('./Routes/Students');
const Teachers = require('./Routes/Teachers')
const vip = require('./Routes/vip');
const Rental = require('./Routes/Rental');
const contact = require('./Routes/contact');

const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended :  true}));
app.use(bodyparser.json());
app.use('/Students', Students);
app.use('/Teachers', Teachers);
app.use('/vip', vip);
app.use('/Rental', Rental);
app.use('/contact', contact);








module.exports = app;