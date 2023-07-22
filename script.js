const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const particlesArray = [];

console.log(ctx);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight / 2;

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight / 2;
    
})

const mouse = {
    x: undefined,
    y: undefined
}


canvas.addEventListener("click", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;

})

canvas.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;

})


class Particle {
    constructor() {
        // Random Position, Size and Speed of Each Particle
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5; 
        this.speedY = Math.random() * 3 - 1.5;
    }
    update() {
        // Make The Particle Move
        this.x += this.speedX / 3;
        this.y += this.speedY / 3;

    }
    draw() {
        // How The Particle Looks
        ctx.fillStyle = "orange";
        ctx.strokeStyle = "orange";
        ctx.lineWidth = 1/6;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
}

// Initiate a Number of Particles (constructor is called)
function init() {
    for (let i = 0; i < 150; i++) {
        particlesArray.push(new Particle());
    }
}
init();

// Call update method to make particle move, draw method to draw each particle
// And use Pythagorean Theorem to create connecting lines
function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {

        // Make Particles Move
        particlesArray[i].update();
        // Draw Each Particle
        particlesArray[i].draw();

        for (let j = i; j < particlesArray.length; j++) {
            // Connecting The Dots
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < 50) {
                ctx.beginPath();
                ctx.strokeStyle = "orange";
                ctx.lineWidth = 1/6;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }

            // Connecting The Dots To Mouse
            const mousedx = particlesArray[i].x - mouse.x;
            const mousedy = particlesArray[i].y - mouse.y;
            const distanceToMouse = Math.sqrt(mousedx*mousedx + mousedy*mousedy);
            if (distanceToMouse < 100) {
                ctx.beginPath();
                // ctx.strokeStyle = "yellow";
                // ctx.lineWidth = 1/6;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }

        // Keep Particles Inside Canvas
        if ((particlesArray[i].x >= canvas.width) || (particlesArray[i].x <= 0)) {
            particlesArray[i].speedX *= -1;
        }
        if ((particlesArray[i].y >= canvas.height) || (particlesArray[i].y <= 0)) {
            particlesArray[i].speedY *= -1;
        }

    }
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}
animate();