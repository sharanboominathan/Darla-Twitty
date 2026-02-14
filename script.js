// Game State Management
const gameState = {
    currentLevel: 0,
    maxLevels: 5
};

// --- Core Game Logic ---
function initGame() {
    const path = window.location.pathname;
    const page = path.split("/").pop();

    // Check if game is active or user refreshed
    if (page !== "index.html" && page !== "") {
        const isGameActive = sessionStorage.getItem('gameActive');
        if (!isGameActive) {
            // User refreshed or jumped in -> Reset
            window.location.href = "index.html";
            return;
        }
    } else {
        // We are on index.html
        sessionStorage.clear(); // Reset on home
    }

    // Specific Page Logic
    if (page === "level1.html") initLevel1();
    if (page === "level2.html") initLevel2();
    if (page === "level3.html") initLevel3();
    if (page === "level4.html") initLevel4();
    if (page === "level5.html") initLevel5();

    startFloatingHearts();
}

function startGame() {
    sessionStorage.setItem('gameActive', 'true');
    window.location.href = "level1.html";
}

function nextLevel(url) {
    // Add transition effect here?
    document.body.style.opacity = 0;
    setTimeout(() => {
        window.location.href = url;
    }, 500);
}


// --- Level 1: Quiz ---
function initLevel1() {
    let qIndex = 0;
    const questions = [
        { q: "Who fell first? 💘", a: ["Twitty", "Darla"], correct: 0 }, // 0 is Twitty
        { q: "Favorite late night snack? 🍕", a: ["Ice Cream", "Chips"], correct: 0 },
        { q: "Dream dest together? ✈️", a: ["Paris", "Home"], correct: 1 }
    ];

    const qText = document.getElementById('q-text');
    const btn1 = document.getElementById('opt1');
    const btn2 = document.getElementById('opt2');
    const progress = document.getElementById('progress-fill');

    function loadQuestion() {
        if (qIndex >= questions.length) {
            document.getElementById('quiz-box').innerHTML = "<h3>Level Complete! 💖</h3>";
            document.getElementById('next-btn').style.display = 'inline-block';
            return;
        }
        const q = questions[qIndex];
        qText.innerText = q.q;
        btn1.innerText = q.a[0];
        btn2.innerText = q.a[1];
        progress.style.width = ((qIndex / questions.length) * 100) + "%";
    }

    window.checkAnswer = (idx) => {
        // Always correct for a cute game
        // Maybe add fun feedback
        const btn = idx === 0 ? btn1 : btn2;
        btn.style.background = "#90EE90"; // Green
        setTimeout(() => {
            btn.style.background = "white";
            qIndex++;
            loadQuestion();
        }, 500);
    };

    loadQuestion();
}


// --- Level 2: Story Board ---
function initLevel2() {
    let slideIndex = 0;
    const slides = document.querySelectorAll('.story-slide');

    window.nextSlide = () => {
        slides[slideIndex].classList.remove('active');
        slideIndex++;
        if (slideIndex >= slides.length) {
            document.getElementById('next-btn').style.display = 'inline-block';
        } else {
            slides[slideIndex].classList.add('active');
        }
    };
}

// --- Level 3: Timeline ---
function initLevel3() {
    const items = document.querySelectorAll('.timeline-item');
    let unlocked = 0;

    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            if (index === unlocked) {
                item.classList.remove('locked');
                item.classList.add('unlocked');
                unlocked++;
                if (unlocked === items.length) {
                    document.getElementById('next-btn').style.display = 'inline-block';
                }
            } else if (index > unlocked) {
                alert("Unlock previous memories first! 🔒");
            }
        });
    });
}

// --- Level 4: Gallery ---
function initLevel4() {
    const photos = document.querySelectorAll('.photo-card');
    let revealed = 0;

    photos.forEach(p => {
        p.addEventListener('click', () => {
            if (!p.classList.contains('revealed')) {
                p.classList.add('revealed');
                revealed++;
                if (revealed === photos.length) {
                    document.getElementById('next-btn').style.display = 'inline-block';
                }
            }
        });
    });
}

// --- Level 5: Letter ---
function initLevel5() {
    const text = "My Dearest Darla,\n\nEvery level of this game, just like every year of our life, has been my favorite adventure. I'm ready for the boss level: Forever. \n\nAre you ready? ❤️";
    const el = document.getElementById('letter-text');
    let i = 0;

    function type() {
        if (i < text.length) {
            el.innerHTML += text.charAt(i) === '\n' ? '<br>' : text.charAt(i);
            i++;
            setTimeout(type, 50);
        } else {
            document.getElementById('next-btn').style.display = 'inline-block';
        }
    }
    type();
}


// --- Utility ---
function startFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = Math.random() > 0.5 ? '💗' : '✨';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }, 800);
}

// Check game status on load
document.addEventListener('DOMContentLoaded', initGame);
