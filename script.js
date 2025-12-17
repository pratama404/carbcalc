// Global variables
let scene, camera, renderer, earth, particles;
let co2Counter = 2847392;
let treesCounter = 15847;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    init3DEarth();
    initCounters();
    initScrollAnimations();
});

// 3D Earth Animation
function init3DEarth() {
    const container = document.getElementById('earth-container');
    if (!container) return;

    // Scene setup
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(400, 400);
    container.appendChild(renderer.domElement);

    // Earth geometry and material
    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        color: 0x4ade80,
        wireframe: false
    });
    earth = new THREE.Mesh(geometry, material);
    scene.add(earth);

    // Add particles for CO2 effect
    createParticles();

    // Camera position
    camera.position.z = 4;

    // Start animation
    animate3D();
}

function createParticles() {
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
        color: 0xff6b6b,
        size: 0.05,
        transparent: true,
        opacity: 0.6
    });

    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
}

function animate3D() {
    requestAnimationFrame(animate3D);

    // Rotate earth
    if (earth) {
        earth.rotation.y += 0.005;
    }

    // Animate particles
    if (particles) {
        particles.rotation.y += 0.002;
        const positions = particles.geometry.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
            positions[i] += 0.01;
            if (positions[i] > 5) {
                positions[i] = -5;
            }
        }
        particles.geometry.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
}

// Counter animations
function initCounters() {
    animateCounter('co2-counter', co2Counter, 2000);
    animateCounter('trees-counter', treesCounter, 1500);
    
    // Update counters periodically
    setInterval(() => {
        co2Counter += Math.floor(Math.random() * 50) + 10;
        treesCounter += Math.floor(Math.random() * 3);
        
        document.getElementById('co2-counter').textContent = co2Counter.toLocaleString() + ' kg';
        document.getElementById('trees-counter').textContent = treesCounter.toLocaleString();
    }, 5000);
}

function animateCounter(elementId, target, duration) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString() + (elementId === 'co2-counter' ? ' kg' : '');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString() + (elementId === 'co2-counter' ? ' kg' : '');
        }
    }
    
    updateCounter();
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.dashboard-card, .testimonial-card, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Dashboard popup functionality
function openPopup(type) {
    const overlay = document.getElementById('popup-overlay');
    const title = document.getElementById('popup-title');
    const body = document.getElementById('popup-body');
    
    let content = '';
    
    switch(type) {
        case 'today-breakdown':
            title.textContent = "Today's Detailed Breakdown";
            content = `
                <div class="breakdown-section">
                    <h4>🚗 Transportation: 3.7kg (45%) ↓ 20% from avg</h4>
                    <ul>
                        <li>Car trips: 3.2kg (2 trips, 30km total)</li>
                        <li>Public transport: 0.3kg (TransJakarta)</li>
                        <li>Walking: 0.2kg (steps bonus!)</li>
                    </ul>
                </div>
                <div class="breakdown-section">
                    <h4>💡 Energy: 2.5kg (30%) ↓ 15% from avg</h4>
                    <ul>
                        <li>Home electricity: 1.8kg (12 kWh)</li>
                        <li>Office usage: 0.5kg (shared)</li>
                        <li>Charging devices: 0.2kg</li>
                    </ul>
                </div>
                <div class="breakdown-section">
                    <h4>🍽️ Food: 1.6kg (20%) ↑ 5% from avg</h4>
                    <ul>
                        <li>Breakfast: 0.3kg (oatmeal + fruits)</li>
                        <li>Lunch: 0.8kg (beef rendang)</li>
                        <li>Dinner: 0.5kg (fish + vegetables)</li>
                    </ul>
                </div>
                <div class="popup-actions">
                    <button class="btn btn-primary">🤖 Get AI Tips</button>
                    <button class="btn btn-outline">📝 Add Activity</button>
                </div>
            `;
            break;
            
        case 'month-breakdown':
            title.textContent = "Monthly Progress";
            content = `
                <div class="progress-chart">
                    <h4>Monthly Target: 300kg CO2e</h4>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 82%"></div>
                    </div>
                    <p>Current: 245kg (82% of target)</p>
                </div>
                <div class="monthly-stats">
                    <div class="stat-row">
                        <span>Best day:</span>
                        <span>Dec 3 (4.1kg) - Weekend at home</span>
                    </div>
                    <div class="stat-row">
                        <span>Worst day:</span>
                        <span>Dec 15 (15.2kg) - Business trip</span>
                    </div>
                    <div class="stat-row">
                        <span>Average:</span>
                        <span>8.2kg/day</span>
                    </div>
                </div>
            `;
            break;
            
        case 'achievements':
            title.textContent = "Your Achievements";
            content = `
                <div class="achievement-grid">
                    <div class="achievement-item earned">
                        <span class="badge">🌟</span>
                        <div>
                            <h4>Action Hero</h4>
                            <p>Complete 5 action plans</p>
                        </div>
                    </div>
                    <div class="achievement-item earned">
                        <span class="badge">🚴</span>
                        <div>
                            <h4>Commute Champion</h4>
                            <p>1 week without car</p>
                        </div>
                    </div>
                    <div class="achievement-item available">
                        <span class="badge">🌱</span>
                        <div>
                            <h4>Carbon Neutral</h4>
                            <p>Offset 100% of emissions</p>
                            <small>Progress: 78%</small>
                        </div>
                    </div>
                </div>
                <div class="level-progress">
                    <h4>Level 3: Eco Warrior</h4>
                    <div class="xp-bar">
                        <div class="xp-fill" style="width: 63%"></div>
                    </div>
                    <p>1,250 / 2,000 XP to Level 4</p>
                </div>
            `;
            break;
    }
    
    body.innerHTML = content;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    const overlay = document.getElementById('popup-overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Tab switching functionality
function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    // Show corresponding content (simplified for demo)
    const content = document.getElementById(tabName + '-tab');
    if (content) {
        content.classList.add('active');
    }
}

// FAQ functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Button actions
function startFreeTrial() {
    showRegister();
}

function playDemo() {
    alert('Opening demo video...');
    // In real implementation, open video modal
}

// Auth functions
function showLogin() {
    const overlay = document.getElementById('auth-overlay');
    const title = document.getElementById('auth-title');
    const body = document.getElementById('auth-body');
    
    title.textContent = '🔑 Login to CarbCalc';
    body.innerHTML = `
        <form class="auth-form" onsubmit="handleLogin(event)">
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="login-email" placeholder="your@email.com" required>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" id="login-password" placeholder="Your password" required>
            </div>
            <button type="submit" class="btn btn-primary btn-full">🚀 Login</button>
            <div class="auth-divider">or</div>
            <button type="button" class="btn btn-outline btn-full" onclick="showRegister()">🌱 Create New Account</button>
        </form>
        <div class="demo-login">
            <p><strong>🎯 Quick Demo Access:</strong></p>
            <button class="btn btn-demo" onclick="demoLogin()">Try Demo Account</button>
        </div>
    `;
    
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function showRegister() {
    const overlay = document.getElementById('auth-overlay');
    const title = document.getElementById('auth-title');
    const body = document.getElementById('auth-body');
    
    title.textContent = '🌱 Join CarbCalc Community';
    body.innerHTML = `
        <form class="auth-form" onsubmit="handleRegister(event)">
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" id="register-name" placeholder="John Doe" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="register-email" placeholder="your@email.com" required>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" id="register-password" placeholder="Min. 6 characters" required minlength="6">
            </div>
            <div class="form-group checkbox">
                <label>
                    <input type="checkbox" required>
                    I agree to <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
                </label>
            </div>
            <button type="submit" class="btn btn-primary btn-full">🚀 Create Account</button>
            <div class="auth-divider">or</div>
            <button type="button" class="btn btn-outline btn-full" onclick="showLogin()">🔑 Already have account?</button>
        </form>
    `;
    
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAuth() {
    const overlay = document.getElementById('auth-overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Show loading
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '🔄 Logging in...';
    submitBtn.disabled = true;
    
    // Simulate login process
    setTimeout(() => {
        // Store user session
        localStorage.setItem('carbcalc_user', JSON.stringify({
            name: email.split('@')[0],
            email: email,
            loginTime: new Date().toISOString()
        }));
        
        // Redirect to dashboard
        redirectToDashboard();
    }, 1500);
}

function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    // Show loading
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '🔄 Creating account...';
    submitBtn.disabled = true;
    
    // Simulate registration process
    setTimeout(() => {
        // Store user session
        localStorage.setItem('carbcalc_user', JSON.stringify({
            name: name,
            email: email,
            loginTime: new Date().toISOString(),
            isNewUser: true
        }));
        
        // Redirect to dashboard
        redirectToDashboard();
    }, 2000);
}

function demoLogin() {
    // Store demo user session
    localStorage.setItem('carbcalc_user', JSON.stringify({
        name: 'Demo User',
        email: 'demo@carbcalc.app',
        loginTime: new Date().toISOString(),
        isDemo: true
    }));
    
    redirectToDashboard();
}

function redirectToDashboard() {
    closeAuth();
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'success-toast';
    successMsg.innerHTML = '✅ Login successful! Redirecting to dashboard...';
    document.body.appendChild(successMsg);
    
    // Redirect after short delay
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

function playVideo(videoId) {
    alert(`Playing video: ${videoId}`);
    // In real implementation, open video player
}

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', function() {
    const user = localStorage.getItem('carbcalc_user');
    if (user) {
        const userData = JSON.parse(user);
        // Update nav to show user info
        updateNavForLoggedInUser(userData);
    }
});

function updateNavForLoggedInUser(userData) {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.innerHTML = `
        <a href="#features" class="nav-link">Features</a>
        <a href="#pricing" class="nav-link">Pricing</a>
        <a href="dashboard.html" class="nav-btn nav-btn-primary">📋 Dashboard</a>
        <div class="user-menu">
            <span class="user-greeting">Hi, ${userData.name}! 👋</span>
            <button class="nav-btn nav-btn-outline" onclick="logout()">🚪 Logout</button>
        </div>
    `;
}

function logout() {
    localStorage.removeItem('carbcalc_user');
    location.reload();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Add CSS for popup content
const additionalCSS = `
.breakdown-section {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e2e8f0;
}

.breakdown-section h4 {
    color: #22c55e;
    margin-bottom: 0.5rem;
}

.breakdown-section ul {
    list-style: none;
    padding-left: 1rem;
}

.breakdown-section li {
    margin-bottom: 0.25rem;
    color: #666;
}

.popup-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

.progress-bar {
    width: 100%;
    height: 20px;
    background: #e2e8f0;
    border-radius: 10px;
    overflow: hidden;
    margin: 1rem 0;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #22c55e, #16a34a);
    transition: width 0.3s ease;
}

.monthly-stats {
    margin-top: 2rem;
}

.stat-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid #f1f5f9;
}

.achievement-grid {
    display: grid;
    gap: 1rem;
    margin-bottom: 2rem;
}

.achievement-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 10px;
    background: #f8fafc;
}

.achievement-item.earned {
    background: #f0fdf4;
    border-left: 4px solid #22c55e;
}

.achievement-item.available {
    background: #fef3c7;
    border-left: 4px solid #f59e0b;
}

.badge {
    font-size: 2rem;
}

.level-progress {
    text-align: center;
}

.xp-bar {
    width: 100%;
    height: 15px;
    background: #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
    margin: 1rem 0;
}

.xp-fill {
    height: 100%;
    background: linear-gradient(90deg, #3b82f6, #1d4ed8);
    transition: width 0.3s ease;
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);