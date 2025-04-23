// SELFy - System for Emotional & Life Feedback
// Main application script

// Global state object to store user data
const selfyState = {
    identity: null,
    intention: null,
    mood: null,
    meals: {
        breakfast: null,
        lunch: null,
        dinner: null
    },
    energy: 50,
    dayWord: "",
    avoidance: "",
    secret: "",
    thoughts: [],
    scores: {
        mood: 0,
        meal: 0,
        trust: 0
    },
    // For dashboard
    history: {
        moods: [65, 72, 45, 84, 77, 60, 55],
        energy: [60, 45, 50, 75, 65, 55, 50],
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    }
};

// DOM elements
const screens = document.querySelectorAll('.screen');
const beginButton = document.getElementById('begin-button');
const setupNextButton = document.getElementById('setup-next');
const checkinNextButton = document.getElementById('checkin-next');
const auditNextButton = document.getElementById('audit-next');
const feedbackNextButton = document.getElementById('feedback-next');
const thoughtNextButton = document.getElementById('thought-next');
const restartButton = document.getElementById('restart-button');
const viewDashboardButton = document.getElementById('view-dashboard');
const dashboardBackButton = document.getElementById('dashboard-back');
const energySlider = document.getElementById('energy-slider');
const energyValue = document.getElementById('energy-value');
const ambientSound = document.getElementById('ambient-sound');
const clickSound = document.getElementById('click-sound');

// Audio settings
ambientSound.volume = 0.2;
clickSound.volume = 0.3;

// Helper function to transition between screens
function showScreen(screenId) {
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    
    // Play click sound on transition
    clickSound.currentTime = 0;
    clickSound.play();
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Helper function to update glitch text data attributes
function setupGlitchTexts() {
    const glitchTexts = document.querySelectorAll('.glitch-text');
    glitchTexts.forEach(text => {
        text.setAttribute('data-text', text.textContent);
    });
}

// Setup option button functionality
function setupOptionButtons(selector, singleSelect = true) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (singleSelect) {
                buttons.forEach(btn => btn.classList.remove('selected'));
            }
            button.classList.toggle('selected');
            
            // Play click sound
            clickSound.currentTime = 0;
            clickSound.play();
            
            // Check if any button is selected to enable next button
            const selectedButtons = document.querySelectorAll(`${selector}.selected`);
            
            if (selector === '.option-btn') {
                selfyState.identity = button.getAttribute('data-identity');
                setupNextButton.disabled = false;
            } else if (selector === '.intention-btn') {
                selfyState.intention = button.getAttribute('data-intention');
                setupNextButton.disabled = false;
                
                // Show intention response
                const intentionResponse = document.getElementById('intention-response');
                intentionResponse.style.display = 'block';
                
                if (selfyState.intention === 'selfcare') {
                    intentionResponse.textContent = "Self-care mode activated. I'll help you focus on nurturing yourself today.";
                } else if (selfyState.intention === 'energy') {
                    intentionResponse.textContent = "Energy booster selected. Let's identify what drains you and what energizes you.";
                } else if (selfyState.intention === 'chill') {
                    intentionResponse.textContent = "Chill & Reflect mode engaged. Today we'll practice mindfulness and perspective.";
                }
            } else if (selector === '.mood-btn') {
                selfyState.mood = button.getAttribute('data-mood');
                checkCheckinProgress();
            } else if (selector.includes('.meal-btn')) {
                const meal = button.getAttribute('data-meal');
                const status = button.getAttribute('data-status');
                selfyState.meals[meal] = status;
                checkCheckinProgress();
            }
        });
    });
}

// Check if daily check-in is complete
function checkCheckinProgress() {
    const moodSelected = selfyState.mood !== null;
    const breakfastSelected = selfyState.meals.breakfast !== null;
    const lunchSelected = selfyState.meals.lunch !== null;
    const dinnerSelected = selfyState.meals.dinner !== null;
    const wordEntered = document.getElementById('day-word').value.trim() !== '';
    
    if (moodSelected && breakfastSelected && lunchSelected && dinnerSelected && wordEntered) {
        checkinNextButton.disabled = false;
    }
}

// Show SELFy's response to one-word description
function updateWordResponse() {
    const dayWord = document.getElementById('day-word').value.trim();
    const wordResponse = document.getElementById('word-response');
    
    if (dayWord) {
        selfyState.dayWord = dayWord;
        wordResponse.style.display = 'block';
        
        // Different responses based on the word
        const positiveWords = ['amazing', 'good', 'great', 'wonderful', 'happy', 'productive', 'peaceful'];
        const negativeWords = ['terrible', 'awful', 'bad', 'sad', 'depressing', 'tiring', 'exhausting'];
        
        if (positiveWords.some(word => dayWord.toLowerCase().includes(word))) {
            wordResponse.textContent = `"${dayWord}" - I'm glad you're having a positive experience. Let's build on this energy.`;
        } else if (negativeWords.some(word => dayWord.toLowerCase().includes(word))) {
            wordResponse.textContent = `"${dayWord}" - I understand. Today we'll focus on small improvements and manageable goals.`;
        } else {
            wordResponse.textContent = `"${dayWord}" - Interesting choice of word. I'll help you explore this feeling further.`;
        }
        
        checkCheckinProgress();
    }
}

// Calculate and display scores
function calculateScores() {
    // Mood score calculation (based on mood selection)
    if (selfyState.mood === 'happy') {
        selfyState.scores.mood = 85 + Math.floor(Math.random() * 15);
    } else if (selfyState.mood === 'neutral') {
        selfyState.scores.mood = 60 + Math.floor(Math.random() * 20);
    } else if (selfyState.mood === 'sad') {
        selfyState.scores.mood = 30 + Math.floor(Math.random() * 30);
    } else if (selfyState.mood === 'angry') {
        selfyState.scores.mood = 20 + Math.floor(Math.random() * 40);
    }
    
    // Meal score calculation
    let mealCount = 0;
    if (selfyState.meals.breakfast === 'had') mealCount++;
    if (selfyState.meals.lunch === 'had') mealCount++;
    if (selfyState.meals.dinner === 'had') mealCount++;
    
    selfyState.scores.meal = Math.round((mealCount / 3) * 100);
    
    // Self-Trust Index - based on avoidance and secrets
    const avoidance = selfyState.avoidance.length;
    const secret = selfyState.secret.length;
    
    // More written = less self-trust score
    let trustBase = 100 - Math.min(((avoidance + secret) / 100) );
    // Add randomness
    selfyState.scores.trust = Math.max(10, Math.min(95, trustBase + (Math.random() * 20 - 10)));
    
    // Animate progress bars
    animateProgressBar('mood-progress', selfyState.scores.mood);
    animateProgressBar('meal-progress', selfyState.scores.meal);
    animateProgressBar('trust-progress', selfyState.scores.trust);
    
    // Update score texts
    document.getElementById('mood-score').textContent = `${selfyState.scores.mood}%`;
    document.getElementById('meal-score').textContent = `${selfyState.scores.meal}%`;
    document.getElementById('trust-score').textContent = `${selfyState.scores.trust}%`;
}

// Animate progress bars
function animateProgressBar(id, value) {
    const progressBar = document.getElementById(id);
    let width = 0;
    const interval = setInterval(() => {
        if (width >= value) {
            clearInterval(interval);
        } else {
            width++;
            progressBar.style.width = width + '%';
        }
    }, 15);
}

// Function to update audit response
function updateAuditResponse() {
    const auditResponse = document.getElementById('audit-response');
    const avoidance = document.getElementById('avoid-input').value.trim();
    const secret = document.getElementById('secret-input').value.trim();
    
    if (avoidance && secret) {
        selfyState.avoidance = avoidance;
        selfyState.secret = secret;
        auditResponse.style.display = 'block';
        
        // Creepy insights
        const responses = [
            "Interesting. Your patterns of avoidance reveal more than you might realize.",
            "Your secrets are safe with me. For now.",
            "You're not the first to have these thoughts. But your pattern is... unique.",
            "I'm detecting some misalignment between your actions and your true desires.",
            "What you avoid speaks volumes about what controls you.",
            "Your shadows are showing. They're quite revealing."
        ];
        
        auditResponse.textContent = responses[Math.floor(Math.random() * responses.length)];
        auditNextButton.disabled = false;
    }
}

// Function to handle thought posting
function postThought() {
    const thoughtInput = document.getElementById('thought-input').value.trim();
    const thoughtResponse = document.getElementById('thought-response');
    
    if (thoughtInput) {
        // Add to thoughts array
        selfyState.thoughts.push({
            text: thoughtInput,
            date: new Date().toLocaleDateString(),
            tags: generateRandomTags()
        });
        
        thoughtResponse.style.display = 'block';
        thoughtResponse.textContent = "Thought added to your MindCloud. I'll analyze this pattern over time.";
        
        // Clear input
        document.getElementById('thought-input').value = '';
    }
}

// Generate random tags for thoughts
function generateRandomTags() {
    const allTags = ['reflection', 'growth', 'challenge', 'insight', 'memory', 'goal', 'fear', 'desire', 'confusion', 'clarity'];
    const numTags = Math.floor(Math.random() * 2) + 1; // 1-2 tags
    const tags = [];
    
    for (let i = 0; i < numTags; i++) {
        const randomIndex = Math.floor(Math.random() * allTags.length);
        tags.push(allTags[randomIndex]);
        allTags.splice(randomIndex, 1);
    }
    
    return tags;
}

// Dashboard Functions
function setupDashboard() {
    // Update stats
    document.getElementById('dashboard-mood-value').textContent = `${selfyState.scores.mood}%`;
    document.getElementById('dashboard-energy-value').textContent = `${selfyState.energy}%`;
    document.getElementById('dashboard-meal-value').textContent = `${selfyState.scores.meal}%`;
    document.getElementById('dashboard-trust-value').textContent = `${selfyState.scores.trust}%`;
    
    // Set random trends
    setupRandomTrends();
    
    // Setup mood chart
    setupMoodChart();
    
    // Setup energy chart
    setupEnergyChart();
    
    // Setup thoughts
    setupThoughtsSection();
    
    // Setup insights
    setupInsights();
}

function setupRandomTrends() {
    const trendElements = document.querySelectorAll('.stat-trend');
    trendElements.forEach(element => {
        const random = Math.random();
        if (random > 0.6) {
            element.textContent = `+${Math.floor(Math.random() * 10) + 1}%`;
            element.className = 'stat-trend positive';
        } else if (random > 0.3) {
            element.textContent = `-${Math.floor(Math.random() * 10) + 1}%`;
            element.className = 'stat-trend negative';
        } else {
            element.textContent = `${Math.floor(Math.random() * 3) - 1}%`;
            element.className = 'stat-trend neutral';
        }
    });
}

function setupMoodChart() {
    const moodChartBars = document.getElementById('mood-chart-bars');
    const moodChartLabels = document.getElementById('mood-chart-labels');
    
    moodChartBars.innerHTML = '';
    moodChartLabels.innerHTML = '';
    
    selfyState.history.moods.forEach((mood, index) => {
        // Create bar
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = `${mood}%`;
        bar.setAttribute('data-day', selfyState.history.days[index]);
        moodChartBars.appendChild(bar);
        
        // Create label
        const label = document.createElement('span');
        label.textContent = selfyState.history.days[index];
        moodChartLabels.appendChild(label);
    });
}

function setupEnergyChart() {
    const energyChartSvg = document.getElementById('energy-chart-svg');
    const energyChartLabels = document.getElementById('energy-chart-labels');
    
    energyChartSvg.innerHTML = '';
    energyChartLabels.innerHTML = '';
    
    // Create polyline for energy chart
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    
    // Calculate points
    const points = selfyState.history.energy.map((energy, index) => {
        const x = (index / (selfyState.history.energy.length - 1)) * 300;
        // Invert y-axis for SVG (0 is top)
        const y = 150 - (energy / 100) * 150;
        return `${x},${y}`;
    }).join(' ');
    
    polyline.setAttribute('points', points);
    polyline.setAttribute('fill', 'none');
    polyline.setAttribute('stroke', 'var(--primary-color)');
    polyline.setAttribute('stroke-width', '3');
    polyline.setAttribute('stroke-linecap', 'round');
    polyline.setAttribute('stroke-linejoin', 'round');
    
    // Add dots at data points
    selfyState.history.energy.forEach((energy, index) => {
        const x = (index / (selfyState.history.energy.length - 1)) * 300;
        const y = 150 - (energy / 100) * 150;
        
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', '4');
        circle.setAttribute('fill', 'var(--primary-color)');
        
        energyChartSvg.appendChild(circle);
    });
    
    energyChartSvg.appendChild(polyline);
    
    // Add labels
    selfyState.history.days.forEach((day, index) => {
        const label = document.createElement('span');
        label.textContent = day;
        energyChartLabels.appendChild(label);
    });
}

function setupThoughtsSection() {
    const thoughtsContainer = document.getElementById('thoughts-container');
    thoughtsContainer.innerHTML = '';
    
    // Add default thoughts if none exist
    if (selfyState.thoughts.length === 0) {
        selfyState.thoughts = [
            {
                text: "Sometimes I wonder if my choices really matter in the grand scheme of things.",
                date: "4/20/2025",
                tags: ["reflection", "philosophy"]
            },
            {
                text: "Today I managed to avoid that difficult conversation again. Not sure if that's good or bad.",
                date: "4/21/2025",
                tags: ["avoidance", "growth"]
            },
            {
                text: "The rain today matched my mood perfectly. There's something comforting about that synchronicity.",
                date: "4/22/2025",
                tags: ["insight", "reflection"]
            }
        ];
    }
    
    // Add user's thoughts
    selfyState.thoughts.forEach(thought => {
        const thoughtCard = document.createElement('div');
        thoughtCard.className = 'thought-card';
        
        const thoughtText = document.createElement('div');
        thoughtText.className = 'thought-text';
        thoughtText.textContent = thought.text;
        
        const thoughtFooter = document.createElement('div');
        thoughtFooter.className = 'thought-footer';
        
        const thoughtDate = document.createElement('div');
        thoughtDate.className = 'thought-date';
        thoughtDate.textContent = thought.date;
        
        const thoughtTags = document.createElement('div');
        thoughtTags.className = 'thought-tags';
        
        thought.tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'thought-tag';
            tagSpan.textContent = tag;
            thoughtTags.appendChild(tagSpan);
        });
        
        thoughtFooter.appendChild(thoughtDate);
        thoughtFooter.appendChild(thoughtTags);
        
        thoughtCard.appendChild(thoughtText);
        thoughtCard.appendChild(thoughtFooter);
        
        thoughtsContainer.appendChild(thoughtCard);
    });
}

function setupInsights() {
    const insightsContainer = document.getElementById('insights-container');
    insightsContainer.innerHTML = '';
    
    const insights = [
        "Your mood tends to drop after missed meals. Consider setting meal reminders.",
        "You use more negative words on days when your energy is below 40%. Try positive affirmations.",
        "Your self-trust seems higher on days you engage in self-care. Consider making it a daily habit.",
        "Patterns suggest you avoid important tasks when your mood is low. Try breaking tasks into smaller steps."
    ];
    
    insights.forEach(insight => {
        const insightCard = document.createElement('div');
        insightCard.className = 'insight-card';
        
        const insightIcon = document.createElement('div');
        insightIcon.className = 'insight-icon';
        insightIcon.textContent = '💡';
        
        const insightText = document.createElement('div');
        insightText.className = 'insight-text';
        insightText.textContent = insight;
        
        insightCard.appendChild(insightIcon);
        insightCard.appendChild(insightText);
        
        insightsContainer.appendChild(insightCard);
    });
}

// Initialize the app
function initializeApp() {
    // Setup glitch text effects
    setupGlitchTexts();
    
    // Begin welcome screen events
    beginButton.addEventListener('click', () => {
        showScreen('setup-screen');
        ambientSound.play();
    });
    
    // Setup identity and intention selection
    setupOptionButtons('.option-btn');
    setupOptionButtons('.intention-btn');
    
    // Setup daily check-in events
    setupOptionButtons('.mood-btn');
    setupOptionButtons('.meal-btn[data-meal="breakfast"]');
    setupOptionButtons('.meal-btn[data-meal="lunch"]');
    setupOptionButtons('.meal-btn[data-meal="dinner"]');
    
    // Energy slider
    energySlider.addEventListener('input', () => {
        energyValue.textContent = energySlider.value;
        selfyState.energy = parseInt(energySlider.value);
        checkCheckinProgress();
    });
    
    // One-word description
    document.getElementById('day-word').addEventListener('input', updateWordResponse);
    
    // Behavioral audit events
    document.getElementById('avoid-input').addEventListener('input', updateAuditResponse);
    document.getElementById('secret-input').addEventListener('input', updateAuditResponse);
    
    // Thought posting
    document.getElementById('post-thought').addEventListener('click', postThought);
    
    // Navigation events
    setupNextButton.addEventListener('click', () => showScreen('checkin-screen'));
    checkinNextButton.addEventListener('click', () => showScreen('audit-screen'));
    auditNextButton.addEventListener('click', () => {
        showScreen('feedback-screen');
        calculateScores();
    });
    feedbackNextButton.addEventListener('click', () => showScreen('thought-screen'));
    thoughtNextButton.addEventListener('click', () => showScreen('final-screen'));
    restartButton.addEventListener('click', () => {
        // Reset state
        selfyState.identity = null;
        selfyState.intention = null;
        selfyState.mood = null;
        selfyState.meals = { breakfast: null, lunch: null, dinner: null };
        selfyState.energy = 50;
        selfyState.dayWord = "";
        selfyState.avoidance = "";
        selfyState.secret = "";
        
        // Reset UI
        document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
        document.getElementById('energy-slider').value = 50;
        document.getElementById('energy-value').textContent = 50;
        document.getElementById('day-word').value = '';
        document.getElementById('avoid-input').value = '';
        document.getElementById('secret-input').value = '';
        document.getElementById('thought-input').value = '';
        
        // Hide responses
        document.querySelectorAll('.selfy-response').forEach(el => el.style.display = 'none');
        
        // Disable next buttons
        setupNextButton.disabled = true;
        checkinNextButton.disabled = true;
        auditNextButton.disabled = true;
        
        showScreen('welcome-screen');
    });
    
    // Dashboard navigation
    viewDashboardButton.addEventListener('click', () => {
        showScreen('dashboard-screen');
        setupDashboard();
    });
    
    dashboardBackButton.addEventListener('click', () => {
        showScreen('final-screen');
    });
    
    // Export data button
    document.getElementById('export-data').addEventListener('click', () => {
        alert("Data export functionality is currently disabled.");
    });
    
    // Reset dashboard button
    document.getElementById('reset-dashboard').addEventListener('click', () => {
        if (confirm("Reset all dashboard data? This cannot be undone.")) {
            // Generate new random data
            selfyState.history.moods = selfyState.history.moods.map(() => Math.floor(Math.random() * 80) + 20);
            selfyState.history.energy = selfyState.history.energy.map(() => Math.floor(Math.random() * 80) + 20);
            setupDashboard();
        }
    });
    
    // Exit button (disabled for demo)
    document.getElementById('exit-button').addEventListener('click', () => {
        alert("Exit functionality is disabled in this demo.");
    });
    
    // Filter thoughts
    document.getElementById('thoughts-filter').addEventListener('change', (e) => {
        // In a real app, this would filter thoughts
        alert("Filtering by: " + e.target.value);
    });
}

// Start the app when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);