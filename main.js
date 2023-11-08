import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Asteroid } from './asteroid.js';
import { Timer } from './timer.js';

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    // resize the canvas to fit the window but maintain aspect ratio
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // resize the canvas if the window is resized
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    class Game {
        constructor(width, height) {
            // this.width = browser window width
            this.width = width;
            // this.height = browser window height
            this.height = height;
            this.player = new Player(this);
            this.input = new InputHandler();
            this.enemies = [];
            this.maxEnemies = 25;
            for (let i = 0; i < this.maxEnemies; i++) {
                this.enemies.push(new Asteroid(this));
            }
            this.timer = new Timer();
            this.ambientNoise = new Audio('assets/ambient-noise.wav');
            this.ambientNoise.volume = 0.2;
            this.ambientNoise.loop = true;
            this.crashSound = new Audio('assets/8-bit-explosion.wav');
            this.crashSound.volume = 0.1;
            this.dead = false;

    }
    update(){
        if (this.dead) return;
        this.player.update(this.input.keys);
        this.enemies.forEach(enemy => enemy.update(game));
        this.timer.update(game);
        // remove the enemies that are marked for deletion
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
        // if there are less than the max number of enemies, add more
        if (this.enemies.length < this.maxEnemies) {
            console.log("adding more enemies")
            this.enemies.push(new Asteroid(this));
        }
        // every 10 seconds increase the max number of enemies
        if (this.timer.seconds % 10 === 0 && this.timer.milliseconds === 0) {
            this.maxEnemies++;
            console.log(this.maxEnemies);
        }

        // check for collisions
        this.enemies.forEach(enemy => {
            if (this.player.x < enemy.x + enemy.width &&
                this.player.x + this.player.width > enemy.x &&
                this.player.y < enemy.y + enemy.height &&
                this.player.y + this.player.height > enemy.y) {
                this.crashSound.play();
                canvas.style.backgroundColor = 'red';
                this.input.keys = [];
                this.enemies = [];
                this.dead = true;
                setTimeout(() => {
                    canvas.style.backgroundColor = 'black';
                    console.log("resetting game")
                    this.player = new Player(this);
                    this.maxEnemies = 25;
                    this.enemies = [];
                    for (let i = 0; i < this.maxEnemies; i++) {
                        this.enemies.push(new Asteroid(this));
                    }
                    // store the best time in local storage in miliseconds using HTML5 Web Storage API
                    if (this.timer.milliseconds + this.timer.seconds * 1000 + this.timer.minutes * 60000 > this.timer.bestTime) {
                        localStorage.setItem('bestTime', this.timer.milliseconds + this.timer.seconds * 1000 + this.timer.minutes * 60000);
                    }
                    this.timer = new Timer();
                    this.dead = false;
                }, 500);         
            }
        });

    }

    draw(context){
        this.player.draw(context);
        this.enemies.forEach(enemy => enemy.draw(context));
        this.timer.draw(context);

    }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});