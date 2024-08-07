const crypto = require('crypto');
const { Event } = require("@suprsend/node-sdk");
const { Suprsend } = require("@suprsend/node-sdk");

const supr_client = new Suprsend("eY0zNzLO0x7LGovrI9vG", "SS.WSS._YDCcHe0LB3OOtmGZ8Oo4PVuMBGgAKciOrGmUt_A");

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const { distinct_id, secret, tasksObj } = req.query;

    if (!distinct_id || !secret) {
      return res.status(400).json({ error: 'Missing distinct_id or secret' });
    }

    const tasksStr = decodeURIComponent(tasksObj);
    const tasks = JSON.parse(tasksStr);
    const hash = hmac_rawurlsafe_base64_string(distinct_id, secret);

    const user = supr_client.user.get_instance(distinct_id);
    const response1 = await user.save(); // Trigger request
    console.log("User save response:", response1);

    const event_name = "REMINDERS";
    for (let i = 0; i < tasks.length; i++) {
      if (isToday(tasks[i].taskDeadline)) {
        const properties = {
          "task": tasks[i].taskName,
          "dead line": tasks[i].taskDeadline
        };
        const event = new Event(distinct_id, event_name, properties);
        const response = await supr_client.track_event(event);
        console.log("Event tracking response:", response);
      }
    }

    console.log("From API:", hash);
    res.json({ hash });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

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

// Check if the date is today
function isToday(dateString) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todaysDate = `${year}-${month}-${day}`;
  return todaysDate === dateString;
}
