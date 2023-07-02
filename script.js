const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const particlesArray = [];

console.log(ctx);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
})

const mouse = {
    x: undefined,
    y: undefined
}

// function drawCircle() {
//     ctx.fillStyle = "white";
//     ctx.strokeStyle = "orange";
//     ctx.lineWidth = 5;
//     ctx.beginPath();
//     ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
//     ctx.fill();
//     ctx.stroke();
// }
// drawCircle();


canvas.addEventListener("click", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    // for (let i = 0; i < 10; i++) {
    //     particlesArray.push(new Particle());   
    // }
    // drawCircle();
})

canvas.addEventListener("mousemove", function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    // for (let i = 0; i < 1; i++) {
    //     particlesArray.push(new Particle());   
    // }
    // drawCircle();
})


class Particle {
    constructor() {
        // this.x = mouse.x;
        // this.y = mouse.y;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5; 
        this.speedY = Math.random() * 3 - 1.5;
    }
    update() {
        this.x += this.speedX / 3;
        this.y += this.speedY / 3;
        // if ((this.x == canvas.width)) {
        //     // this.x = this.x * -1;
        //     console.log(this.x)
        // }
        // if (this.size > 0.2) this.size -= 0.1; 
    }
    draw() {
        ctx.fillStyle = "orange";
        ctx.strokeStyle = "orange";
        ctx.lineWidth = 1/6;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
}

function init() {
    for (let i = 0; i < 150; i++) {
        particlesArray.push(new Particle());
    }
}
init();


function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
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
        // if (particlesArray[i].size < 0.3) {
        //     particlesArray.splice(i, 1);
        //     i--;
        // }
    }
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drawCircle();
    handleParticles();
    requestAnimationFrame(animate);
}
animate();