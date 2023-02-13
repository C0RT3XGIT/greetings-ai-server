const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const WishSchema = new Schema ({
  senderName: String,
  recipientName: String,
  generatedWish: String,
  rate: Number
})


module.exports = mongoose.model('valentinesWishes', WishSchema)
