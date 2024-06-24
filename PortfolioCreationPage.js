import React, { useState } from 'react';
import axios from 'axios';

const PortfolioCreationPage = () => {
    const [githubUsername, setGithubUsername] = useState('');
    const [githubRepos, setGithubRepos] = useState([]);
    const [linkedinProfile, setLinkedinProfile] = useState(null);

    const fetchGithubRepos = async () => {
        try {
            const response = await axios.get(`/api/github/${githubUsername}/repos`);
            setGithubRepos(response.data);
        } catch (error) {
            console.error('Error fetching GitHub repos:', error);
        }
    };

    const fetchLinkedinProfile = async () => {
        try {
            const response = await axios.get('/api/linkedin/profile');
            setLinkedinProfile(response.data);
        } catch (error) {
            console.error('Error fetching LinkedIn profile:', error);
        }
    };

    return (
        <div>
            <h1>Portfolio Creation Page</h1>
            <input
                type="text"
                placeholder="Enter GitHub Username"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
            />
            <button onClick={fetchGithubRepos}>Fetch GitHub Repos</button>
            <button onClick={fetchLinkedinProfile}>Fetch LinkedIn Profile</button>

            <h2>GitHub Repositories:</h2>
            <ul>
                {githubRepos.map(repo => (
                    <li key={repo.id}>{repo.name}</li>
                ))}
            </ul>

            <h2>LinkedIn Profile:</h2>
            {linkedinProfile && (
                <div>
                    <p>Name: {linkedinProfile.name}</p>
                    <p>Title: {linkedinProfile.title}</p>
                    <p>Education:</p>
                    <ul>
                        {linkedinProfile.education.map((edu, index) => (
                            <li key={index}>{edu.institution} - {edu.degree}</li>
                        ))}
                    </ul>
                    <p>Experience:</p>
                    <ul>
                        {linkedinProfile.experience.map((exp, index) => (
                            <li key={index}>{exp.company} - {exp.position}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PortfolioCreationPage;
