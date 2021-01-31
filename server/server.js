const axios = require('axios').default
require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000

const base_url = "https://api.telegram.org/bot"

const { sequelize } = require('../db/db')

const User = require('../models/users')

const Message = require('../telegram/message')
const message = new Message();

// async function test(){
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// test();

app.use(require('body-parser').json())

app.get('/', (req, res) => {
  // console.log(req.query);
  res.send(process.env.BOT_TOKEN)
})

app.post('/:token/setWebhook/', (req, res) => {
  // if(req.params.token === process.env.BOT_TOKEN){
  //   axios.post(base_url + process.env.BOT_TOKEN + '/setWebhook', {url: req.body.url})
  //     .then((r) => {
  //       console.log(r);
  //       res.send("Success")
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       res.status(400).send("Error")
  //     })
  // } else {
  //   res.status(400).send("Wrong bot token")
  // }
})

app.post('/handler/', async (req, res) => {

  if(req.body.message !== undefined){
  //   const user = await User.findOne({where: {telegram_id: req.body.message.from.id}})
  //   if(user === null) {
  //     await User.create({
  //       first_name: req.body.message.from.first_name,
  //       last_name: req.body.message.from.last_name,
  //       username: req.body.message.from.username,
  //       telegram_id: req.body.message.from.id,
  //     })
  //   } else {
  //     console.log(user.dataValues.id + ' send some message');
  //   }
    console.log(req.body.message);
  }else if(req.body.callback_query !== undefined){
    console.log(req.body.callback_query.data);
  }


  axios.post(base_url + process.env.BOT_TOKEN + '/sendMessage',
    {chat_id: req.body.message.chat.id, text: "Hello", reply_markup: message.getInlineKeyboardMarkup('Text button')})
      .then((r) => {
        // console.log(r);
        res.send("Success")
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send("Error")
      })//}
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
