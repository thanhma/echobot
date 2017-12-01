'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: '/D/ka4Qj/JmwAKHoH1VXlJij+RnAYAI31LS8ogiSXejzyXS1mAreGzlV07mo/5N0X6LJSj9VyHDnsJfO9km3K6yJvkudaQeX2gXcLHpI1qNps9QLuw8ogoRqIWH5/qsDV3o+kDj800YLw98M01L40AdB04t89/1O/w1cDnyilFU=',
  channelSecret: '91d571d2bb897d6779eb7329d96dd1ec',
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = '1234' || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});