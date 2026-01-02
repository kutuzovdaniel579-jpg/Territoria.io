const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    x: 100,
    y: 100,
    size: 20,
    color: '#ff0000',
    dir: 'RIGHT',
    trail: [] // Hierin slaan we de getrokken lijn op
};

let bots = [
    { x: 500, y: 500, color: 'blue', dir: 'LEFT', trail: [] }
];

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    // Beweeg de speler
    if (player.dir === 'RIGHT') player.x += 2;
    if (player.dir === 'LEFT') player.x -= 2;
    if (player.dir === 'UP') player.y -= 2;
    if (player.dir === 'DOWN') player.y += 2;

    // Voeg huidige positie toe aan de trail
    player.trail.push({x: player.x, y: player.y});

    // Simpele Bot logica (willekeurig draaien)
    bots.forEach(bot => {
        if (Math.random() < 0.02) {
            const dirs = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
            bot.dir = dirs[Math.floor(Math.random() * dirs.length)];
        }
        // Beweeg bot...
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Teken de trail van de speler
    ctx.beginPath();
    ctx.strokeStyle = player.color;
    player.trail.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.stroke();

    // Teken de speler zelf
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x - 10, player.y - 10, 20, 20);
}

gameLoop();
