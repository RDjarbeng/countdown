// js/contributors.js

const owner = 'RDjarbeng';
const repo = 'countdown';
const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contributors`;
const container = document.getElementById('contributors-container');

const CACHE_KEY = 'github_contributors';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

async function fetchContributors() {
    // Check for cached data
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
        const { timestamp, contributors } = JSON.parse(cachedData);
        // Use cache if it's not expired
        if (new Date().getTime() - timestamp < CACHE_DURATION) {
            console.log('Loading contributors from cache.');
            displayContributors(contributors);
            return;
        }
    }

    try {
        console.log('Fetching contributors from GitHub API...');
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const contributors = await response.json();

        // Save to cache with a new timestamp
        const cache = {
            timestamp: new Date().getTime(),
            contributors: contributors,
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cache));

        displayContributors(contributors);
    } catch (error) {
        console.error('Failed to fetch contributors:', error);
        displayError();
    }
}

function displayContributors(contributors) {
    if (!container) return;

    // Clear previous content
    container.innerHTML = '';

    const contributorsGrid = document.createElement('div');
    contributorsGrid.className = 'contributors-grid';

    contributors.forEach(contributor => {
        const contributorCard = document.createElement('a');
        contributorCard.href = contributor.html_url;
        contributorCard.className = 'contributor-card';
        contributorCard.target = '_blank';
        contributorCard.rel = 'noopener noreferrer';

        const avatar = document.createElement('img');
        avatar.src = contributor.avatar_url;
        avatar.alt = `${contributor.login}'s avatar`;
        avatar.className = 'contributor-avatar';

        const username = document.createElement('span');
        username.textContent = contributor.login;
        username.className = 'contributor-username';

        contributorCard.appendChild(avatar);
        contributorCard.appendChild(username);
        contributorsGrid.appendChild(contributorCard);
    }
    );

    container.appendChild(contributorsGrid);
}

function displayError() {
    if (!container) return;
    container.innerHTML = '<p>Unable to load contributors. Please check the GitHub repository directly.</p>';
}

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', fetchContributors);
