const express = require('express');
const router = express.Router();
const WishSchema = require('../models/wish');
const axios = require('axios');
const {ai21RequestBodyData} =  require('../utils/request');
const {newYearPrompt, christmasPrompt, valentinesPrompt} = require('../utils/prompts');

router.post('/new-year', async (req, res) => {
  const data = req.body;
  const {recipientName, senderName} = data;
  try {
    const prompt = newYearPrompt( senderName, recipientName);
    const response = await axios.post(process.env.AI21_URI,ai21RequestBodyData(prompt), {
      headers: {
        'Authorization': 'Bearer ' + process.env.AI21_API_KEY,
        "Accept-Encoding": "gzip,deflate,compress"
      }
    })
    const generatedWish = response.data.completions[0].data.text
    const wish = new WishSchema({
      recipientName,
      senderName,
      generatedWish,
      rate: null
    })
    await wish.save()
    res.status(200).json({message: generatedWish})
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
});

router.post('/valentines', async (req, res) => {
  const data = req.body;
  const {recipientName, senderName} = data;
  try {
    const prompt = valentinesPrompt(senderName, recipientName);
    const response = await axios.post(process.env.AI21_URI,ai21RequestBodyData(prompt), {
      headers: {
        'Authorization': 'Bearer ' + process.env.AI21_API_KEY,
        "Accept-Encoding": "gzip,deflate,compress"
      }
    })
    const generatedWish = response.data.completions[0].data.text
    const wish = new WishSchema({
      recipientName,
      senderName,
      generatedWish,
      rate: null
    })
    await wish.save()
    res.status(200).json({message: generatedWish})
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
});



router.get('/stats', async (req, res) => {
  try {
    const stats = await WishSchema.aggregate([
      {
        $group: {
          _id: "$senderName",
          count: { $sum: 1 }
        }
      }
    ])
    res.status(200).json({message: stats})
  } catch (e) {
    console.log(e)
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
});

module.exports = router;
