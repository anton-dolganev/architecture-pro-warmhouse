import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

function generateRandomTemperature() {
  return (Math.random() * 12 + 20).toFixed(1);
}

app.get('/temperature/:sensorID?', (req, res) => {
  let { sensorID } = req.params;
  let { location } = req.query;
  
  if (!location) {
    switch (sensorID) {
      case "1":
        location = "Living Room";
        break;
      case "2":
        location = "Bedroom";
        break;
      case "3":
        location = "Kitchen";
        break;
      default:
        location = "Unknown";
    }
  }

  if (!sensorID) {
    switch (location) {
      case "Living Room":
        sensorID = "1";
        break;
      case "Bedroom":
        sensorID = "2";
        break;
      case "Kitchen":
        sensorID = "3";
        break;
      default:
        sensorID = "0";
    }
  }

  const temperature = generateRandomTemperature();
  const response = {
    value: parseFloat(temperature),
    unit: "°C",
    timestamp: new Date().toISOString(),
    location: location,
    status: 'active',
    sensorId: sensorID,
    sensor_type: 'temperature'
  };

  res.json(response);
});

app.listen(PORT, () => {
  console.log(`Temperature API server running on port ${PORT}`);
});