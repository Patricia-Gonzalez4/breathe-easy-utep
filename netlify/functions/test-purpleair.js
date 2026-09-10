exports.handler = async function (event, context) {
  const response = await fetch(
    "https://api.purpleair.com/v1/sensors?fields=name,latitude,longitude,pm2.5_atm,last_seen&nwlat=31.755&nwlng=-106.475&selat=31.735&selng=-106.440",
    {
      headers: {
        "X-API-Key": process.env.PURPLEAIR_API_KEY
      }
    }
  );

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data, null, 2)
  };
};
