const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Example route to fetch GitHub repositories
app.get('/api/github/:username/repos', async (req, res) => {
    const { username } = req.params;
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        res.status(500).json({ message: 'Failed to fetch GitHub repositories' });
    }
});

// Example route to fetch LinkedIn profile (simulated)
app.get('/api/linkedin/profile', (req, res) => {
    // Simulate fetching LinkedIn profile data
    const profileData = {
        name: 'John Doe',
        title: 'Software Engineer',
        education: [
            { institution: 'University of Example', degree: 'Computer Science' }
        ],
        experience: [
            { company: 'Example Inc.', position: 'Software Developer' }
        ]
    };
    res.json(profileData);
});

// Serve static files from the React app
app.use(express.static('client/build'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
