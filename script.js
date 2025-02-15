const questions = [
    { 
        question: "How do you talk to yourself when you make a mistake?", 
        options: [
            { text: "With kindness 💕", points: 2, message: "That’s amazing! Being kind to yourself builds self-love. 🌸" },
            { text: "Neutrally 🤔", points: 1, message: "You’re doing okay, but a little more self-kindness will help! 💫" },
            { text: "I'm very harsh on myself 😞", points: 0, message: "Be gentle with yourself. You deserve kindness too. 💖" }
        ]
    },
    { 
        question: "What’s one thing you love about yourself?", 
        options: [
            { text: "My kindness ✨", points: 2, message: "Kindness is a gift! Keep embracing it. 🌿" },
            { text: "My intelligence 🧠", points: 2, message: "Your mind is powerful! Keep appreciating your brilliance. 🔥" },
            { text: "I struggle with this... 😔", points: 0, message: "It’s okay! Let’s find something to love about you. 💕" }
        ]
    },
    { 
        question: "Do you take time for self-care?", 
        options: [
            { text: "Always! 🌸", points: 2, message: "Self-care is an act of love! Keep going. 🛁" },
            { text: "Sometimes 💫", points: 1, message: "You're trying, and that’s great! A little more will help. ✨" },
            { text: "Not really... 😣", points: 0, message: "You deserve to care for yourself. Let’s start today. 💖" }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const introText = document.getElementById("intro-text");
const startBtn = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackContainer = document.getElementById("feedback-container");
const feedbackMessage = document.getElementById("feedback-message");
const nextQuestionBtn = document.getElementById("next-question-btn");
const resultContainer = document.getElementById("result-container");
const resultMessage = document.getElementById("result-message");
const nextBtn = document.getElementById("next-btn");
const finalMessageContainer = document.getElementById("final-message-container");
const finalMessage = document.getElementById("final-message");
const playAgainBtn = document.getElementById("play-again-btn");
playAgainBtn.addEventListener("click", restartGame);

startBtn.addEventListener("click", startGame);
nextQuestionBtn.addEventListener("click", nextQuestion);
nextBtn.addEventListener("click", showFinalMessage);

function startGame() {
    introText.style.display = "none"; // Hide intro text when game starts
    startBtn.style.display = "none";
    resultContainer.classList.add("hidden");
    finalMessageContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    feedbackContainer.classList.add("hidden");
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResult();
        return;
    }

    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    optionsContainer.innerHTML = "";
    feedbackContainer.classList.add("hidden"); // Hide previous feedback
    nextQuestionBtn.classList.add("hidden"); // Hide next question button until they answer

    question.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option.text;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(option.points, option.message));
        optionsContainer.appendChild(button);
    });
}

function selectOption(points, message) {
    score += points;

    // Change score color based on points
    if (points === 0) {
        feedbackMessage.innerHTML = message + `<br><br> <span class="score red">💔 Current Score: ${score}</span>`;
    } else {
        feedbackMessage.innerHTML = message + `<br><br> <span class="score pink">💕 Current Score: ${score}</span>`;
    }

    feedbackContainer.classList.remove("hidden");
    nextQuestionBtn.classList.remove("hidden"); // Show next question button
}

function nextQuestion() {
    currentQuestionIndex++; // Move to the next question
    showQuestion();
}

function showResult() {
    questionContainer.classList.add("hidden");
    feedbackContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    if (score >= 5) {
        resultMessage.innerHTML = "💖 You're thriving in self-love! Keep shining! ✨ <br><br> Your heart is already glowing with kindness towards yourself. Stay on this path and continue embracing your worth!";
    } else if (score >= 3) {
        resultMessage.innerHTML = "🌸 You're on the path to self-love! <br><br> You have moments of self-care and kindness, but there's still room to embrace yourself fully. Keep going, you deserve all the love in the world!";
    } else {
        resultMessage.innerHTML = "💔 You deserve more love from yourself. <br><br> Be gentle, be kind, and remember: You are your own hero in this world, and loving yourself is the key to any quest.";
    }

    nextBtn.classList.remove("hidden");
}

function showFinalMessage() {
    resultContainer.classList.add("hidden");
    finalMessageContainer.classList.remove("hidden");

    if (score < 3) {
        finalMessage.innerHTML = "🌍 The world is vast, full of mountains to climb and quests to conquer. But before you take on any adventure, you must first love the hero of your own story, you. 💖 <br><br> You are worthy of love, care, and kindness. Start by giving it to yourself.";
    } else {
        finalMessage.innerHTML = "✨ Keep shining and spreading love, but don’t forget: the most important love story you’ll ever have is the one with yourself. 💕";
    }
}
function restartGame() {
    finalMessageContainer.classList.add("hidden"); // Hide final message
    resultContainer.classList.add("hidden"); // Hide result message
    feedbackContainer.classList.add("hidden"); // Hide any feedback messages
    startBtn.style.display = "block"; // Show the Start button again
    introText.style.display = "block"; // Show intro text again (if hidden)
    score = 0; // Reset score
    currentQuestionIndex = 0; // Reset question index
}

function createHearts() {
    setInterval(() => {
        const heart = document.createElement("div");
        heart.innerHTML = "❤️";
        heart.classList.add("heart");
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 2 + 3 + "s";
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 500);
}

createHearts(); // Call the function when the page loads
