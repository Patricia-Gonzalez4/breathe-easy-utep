exports.handler = async function(event, context) {

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  let body;
  try {
    body = JSON.parse(event.body);
  } catch(e) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify(body)
    });
    const response = await fetch(
  "https://api.purpleair.com/v1/sensors?fields=name,latitude,longitude,pm2.5_atm,last_seen&nwlat=31.755&nwlng=-106.475&selat=31.735&selng=-106.440",
  {
    headers: {
      "X-API-Key": process.env.PURPLEAIR_API_KEY
    }
  }
);

const data = await response.json();
console.log(data);

    const text = await response.text();
    console.log("Anthropic response:", text);

    return { 
      statusCode: 200, 
      headers, 
      body: text
    };

  } catch(error) {
    console.log("Error:", error.message);
    return { 
      statusCode: 500, 
      headers, 
      body: JSON.stringify({ error: error.message }) 
    };
  }
};
