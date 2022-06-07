const dotenv = require('dotenv')
const express = require('express');
const colors = require('colors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();



const userRoute = require('./routes/userRoutes');
const authRoute = require('./routes/authRoutes');
const postRoute = require('./routes/postRoutes');
dotenv.config()

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log(colors.bgWhite.bold('Database Berhasil Terhubung'))
})


//MIDDLEWARE
app.use(express.json());
app.use(helmet());
app.use(morgan("common"))



app.get('/', (req, res) => {
    res.send('hello')
})

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);

app.listen(process.env.PORT, () => {
    console.log(colors.bgCyan.bold(`Server Telah Berjalan di http://localhost:${process.env.PORT}/ `))
})

