let currentEquation;
let lives = 3;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateEquation() {
    const equationType = getRandomInt(1, 3); // Randomly choose equation type
    let a = getRandomInt(1, 10);
    let b = getRandomInt(-10, 10);
    let c = getRandomInt(-10, 10);
    let equationText;

    switch (equationType) {
        case 1: // Linear: v = ax + b
            equationText = `v = ${a}x + ${b}`;
            currentEquation = { type: 'linear', a, b, text: equationText };
            break;
        case 2: // Quadratic: v = ax^2 + bx + c
            equationText = `v = ${a}x² + ${b}x + ${c}`;
            currentEquation = { type: 'quadratic', a, b, c, text: equationText };
            break;
        case 3: // Cubic: v = ax^3 + bx^2 + c
            equationText = `v = ${a}x³ + ${b}x² + ${c}`;
            currentEquation = { type: 'cubic', a, b, c, text: equationText };
            break;
    }

    document.getElementById('equation').innerText = equationText;
    document.getElementById('equation').style.display = 'none';
    calculateValues();
}

function checkGuess() {
    const guessInput = document.getElementById('guessInput').value;
    const livesDisplay = document.getElementById('livesDisplay');

    if (guessInput.trim() === currentEquation.text) {
        alert("Correct! You've guessed the equation!");
        return;
    }

    lives--;
    livesDisplay.innerText = `Lives: ${lives}`;

    if (lives <= 0) {
        alert(`Game Over! The equation was: ${currentEquation.text}`);
        document.getElementById('equation').style.display = 'block'; // Reveal equation
        document.getElementById('results').style.display = 'none'; // Hide results
    } else {
        alert("Wrong guess! Try again.");
    }

    document.getElementById('guessInput').value = ''; // Clear input
}

function toFraction(num) {
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    const numerator = Math.round(num * 100);
    const denominator = 100;
    const divisor = gcd(Math.abs(numerator), denominator);
    return `${numerator / divisor}/${denominator / divisor}`;
}

function calculateValues() {
    const resultsTable = document.getElementById('results');
    const headerRow = document.getElementById('headerRow');
    const vRow = resultsTable.querySelector('tbody tr');

    headerRow.innerHTML = '<th>x</th>'; // Reset header row
    vRow.innerHTML = '<th>v</th>'; // Reset v row

    for (let x = -5; x <= 5; x++) {
        let v;
        if (currentEquation.type === 'linear') {
            const { a, b } = currentEquation;
            v = a * x + b;
        } else if (currentEquation.type === 'quadratic') {
            const { a, b, c } = currentEquation;
            v = a * x * x + b * x + c;
        } else if (currentEquation.type === 'cubic') {
            const { a, b, c } = currentEquation;
            v = a * x * x * x + b * x * x + c;
        }

        if (typeof v === 'number' && !Number.isInteger(v)) {
            v = toFraction(v); // Convert to fraction if it's a decimal
        }

        headerRow.innerHTML += `<td>${x}</td>`;
        vRow.innerHTML += `<td>${v}</td>`;
    }

    resultsTable.style.display = 'table'; // Show the table
}