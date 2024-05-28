const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const calloutsanitationscheduleRoutes = require('./routes/callout_sanitation_scheduleRoutes');
const ejs = require('ejs');
const  path = require("path");
const serverless = require('serverless-http');

app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Expose-Headers", "cage, dragon, location");
    res.header("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, mode");
    next();
  });
app.use(bodyParser.json());

// module.exports = async () => {
//     try {
//         await mongoose.connect('mongodb://localhost:27017/mydatabase', {});
//         console.log("CONNECTED TO DATABASE SUCCESSFULLY");
//     } catch (error) {
//         console.error('COULD NOT CONNECT TO DATABASE:', error.message);
//     }
// };
mongoose.connect(process.env.MONGO_URI_Local, {useNewUrlParser: true,
useUnifiedTopology: true}).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
//app.get('/api/auth', authRoutes);
app.use(authRoutes);
app.use(dashboardRoutes);
app.use(calloutsanitationscheduleRoutes);

app.get('/home', require('./routes/dashboardRoutes'));
app.set('view engine', 'ejs');
app.use(express.static('views/public'));
app.get('/*', (req, res) => {res.render('login');
});
// app.post('/login', (req, res, next)=>{
//   res.render('signup');
//   });
//app.use('/.netlify/functions/app',router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
module.exports = app;
module.exports.handler = serverless(app);
