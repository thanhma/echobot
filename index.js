'use strict'
const line = require('node-line-bot-api')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// need raw buffer for signature validation
app.use(bodyParser.json({
  verify (req, res, buf) {
    req.rawBody = buf
  }
}))

// init with auth
line.init({
  accessToken: '/D/ka4Qj/JmwAKHoH1VXlJij+RnAYAI31LS8ogiSXejzyXS1mAreGzlV07mo/5N0X6LJSj9VyHDnsJfO9km3K6yJvkudaQeX2gXcLHpI1qNps9QLuw8ogoRqIWH5/qsDV3o+kDj800YLw98M01L40AdB04t89/1O/w1cDnyilFU=',
  // (Optional) for webhook signature validation
  channelSecret: '91d571d2bb897d6779eb7329d96dd1ec'
})

app.post('/webhook/', line.validator.validateSignature(), (req, res, next) => {
  // get content from request body
  const promises = req.body.events.map(event => {
    // reply message
    return line.client
      .replyMessage({
        replyToken: event.replyToken,
        messages: [
          {
            type: 'text',
            text: event.message.text
          }
        ]
      })
  })
  Promise
    .all(promises)
    .then(() => res.json({success: true}))
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening on port 3000!')
})
