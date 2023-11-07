// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config(); 

const app = express();
app.use(cors());
const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());

// Import the sample data JSON
const sampleData = require('./sample-data.json');

const { WorkExperience, Education } = require('./schema'); // Import schemas from the schema.js file

// Import data into MongoDB
sampleData.resume.sections.forEach(async (section) => {
    if (section.title === 'Work Experience') {
      for (const item of section.items) {
        // Convert "Present" to null for the endDate
        if (item.endDate === 'Present') {
          item.endDate = null;
        }
        try {
          await WorkExperience.create(item);
        } catch (err) {
          console.error('Error importing work experience data:', err);
        }
      }
    } else if (section.title === 'Education') {
      for (const item of section.items) {
        try {
          await Education.create(item);
        } catch (err) {
          console.error('Error importing education data:', err);
        }
      }
    }
  });

// Define API endpoints to retrieve work experience and education data
app.get('/api/education', async (req, res) => {
    try {
      const educationData = await Education.find().exec();
      res.json(educationData);
    } catch (error) {
      console.error('Error fetching education data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.get('/api/work-experience', async (req, res) => {
    try {
      const workExperienceData = await WorkExperience.find().exec();
      res.json(workExperienceData);
    } catch (error) {
      console.error('Error fetching work experience data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
