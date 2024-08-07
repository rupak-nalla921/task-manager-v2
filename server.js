const express = require('express');
const next = require('next');
const crypto = require('crypto');
const { Event } = require("@suprsend/node-sdk");
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const {Suprsend, WorkflowTriggerRequest} = require("@suprsend/node-sdk");

const supr_client = new Suprsend("eY0zNzLO0x7LGovrI9vG", "SS.WSS._YDCcHe0LB3OOtmGZ8Oo4PVuMBGgAKciOrGmUt_A");

app.prepare().then(() => {
  const server = express();

  // Custom API route for HMAC-SHA256 hashing
  server.get('/api/hmac', (req, res) => {
    console.log("/api/hmac");
    const { distinct_id, secret,tasksObj } = req.query;

    const tasksStr=decodeURIComponent(tasksObj);
    const tasks=JSON.parse(tasksStr);


    if (!distinct_id || !secret) {
      return res.status(400).json({ error: 'Missing distinct_id or secret' });
    }

    const hash = hmac_rawurlsafe_base64_string(distinct_id, secret);
    

  const user = supr_client.user.get_instance(distinct_id); // create user instance
  console.log(user);
// user methods mentioned in this docs can be attached to user instance if needed

  const response1 = user.save() // IMP: trigger request
  response1.then((res) => console.log("response", res));
  const event_name = "REMINDERS"
    for (let i=0;i<tasks.length;i++){
      // console.log(tasks[i]);
      if(isToday(tasks[i].taskDeadline)){
        console.log("today alert")
        // console.log(tasks[i]);
        const properties = {
          "task": tasks[i].taskName,
          "dead line": tasks[i].taskDeadline
        }
          console.log(typeof distinct_id)
        const event = new Event(distinct_id, event_name, properties)
          
        const response  = supr_client.track_event(event)
        response.then((res) => console.log("response", res));
      
      }
    }
  // dynamic data to render template and workflow variables
  
    console.log("from api",hash);
    res.json({ hash });
  });


  // tasks notification box
  




  // Function to handle HMAC-SHA256 and Base64URL encoding
  function hmac_rawurlsafe_base64_string(distinct_id, secret) {
    return crypto
      .createHmac("sha256", secret)
      .update(distinct_id)
      .digest("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
  



  

  // Track Event Example
    
  
  function isToday(dateString) {
    const today = new Date();
    
    // Format the date as YYYY-MM-DD
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');

    let todaysDate=`${year}-${month}-${day}`;
    console.log(todaysDate);
    return  todaysDate === dateString;
}  




  
  
  





  // Handle all other routes with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});


















