const mongoose = require('mongoose');
const morgan = require('morgan');
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors');
const clientRoutes = require('./routes/client')



dotenv.config({path: './config/config.env'})

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(err);
  }
}
connectDB().then((response)=> response);


app.use(express.urlencoded({ extended: false }))
app.use(cors());
app.use(express.json())
app.use(morgan('tiny'))
app.use('/api', clientRoutes);

app.listen(process.env.PORT, console.log(`Server is starting at ${process.env.PORT}`))