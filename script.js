
const canvas = document.getElementById('galaxyCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.getElementById('enterBtn');
    const backBtn = document.getElementById('backBtn');
    const card1 = document.getElementById('card1');
    const card2 = document.getElementById('card2');

    console.log("Чи знайшов я кнопку Enter?:", enterBtn);

    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            console.log("Кнопку Enter натиснуто!");
            card1.classList.add('hidden');
            card2.classList.remove('hidden');

            const iframe = document.getElementById('bgMusic');
            if (iframe) {
                iframe.src += "&autoplay=1";
            }
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            console.log("Кнопку Back натиснуто!");
            card2.classList.add('hidden');
            card1.classList.remove('hidden');
        });
    }
});

const particles = [];
const particleCount = 250;
const heartPoints = [];

for (let angle = 0; angle < Math.PI * 2; angle += 0.05) {
    const x = 16 * Math.pow(Math.sin(angle), 3);
    const y = -(13 * Math.cos(angle) - 5 * Math.cos(2*angle) - 2 * Math.cos(3*angle) -
Math.cos(4*angle));
    heartPoints.push({ x: x * 10, y: y * 10});
}

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.target = heartPoints[Math.floor(Math.random() * heartPoints.length)];
        this.x = width / 2 + (Math.random() - 0.5) * width;
        this.y = height / 2 + (Math.random() - 0.5) * height;
        this.size = Math.random() * 2 + 1;
        this.speed = Math.random() * 0.02 + 0.01;
        this.alpha = Math.random() 0.5 + 0.5;
        this.color = `rgba(255, ${Math.floor(Math.random() * 80 + 20)}, ${Math.floor(Math.random() * 150 + 100)}, `;
    }
    update() {
        const targetX = width / 2 + this.target.x;
        const targetY = height / 2 + this.target.y;
        this.x += (targetX - this.x) * this.speed;
        this.y += (targetY - this.y) * this.speed;
        if (Math.abs(this.x - targetX) < 2 && Math.abs(this.y - targetY) < 2) {
            this.reset();
        }
    }
    draw() {
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.fillStyle = 'rgba(10, 5, 15, 0.2)';
    ctx.fillRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
animate();
