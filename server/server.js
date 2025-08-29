require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const crudRoutes = require('./routes/crud');

const app = express();

//middleware
app.use(cors());
app.use(express.json());


//mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/mern-pro', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log("Connection error : ", err));


app.get('/', (req, res) => {
    res.send('Hello from Node JS');
})

app.use('/api', authRoutes);
app.use('/api', crudRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
})