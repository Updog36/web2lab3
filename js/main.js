import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Asteroid } from "./asteroid.js";
import { Timer } from "./timer.js";
import { Stars } from "./stars.js";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  // resize the canvas to fit the window but maintain aspect ratio
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  // resize the canvas if the window is resized
  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.player = new Player(this); // pass the game object to the player instance
      this.input = new InputHandler(); // create a new input handler
      this.stars = [];
      this.maxStars = 100;
      for (let i = 0; i < this.maxStars; i++) {
        this.stars.push(new Stars(this));
      };
      this.enemies = []; // create an empty array for the enemies
      this.maxEnemies = 25; // set the max number of enemies (this will increase over time)
      for (let i = 0; i < this.maxEnemies; i++) {
        // create the enemies
        this.enemies.push(new Asteroid(this));
      }
      this.timer = new Timer(); // create a new timer
      this.ambientNoise = new Audio("../assets/ambient-noise.wav"); // load the ambient noise
      this.ambientNoise.volume = 0.2; // set the volume
      this.ambientNoise.loop = true; // loop the audio (jako loš loop ali nemam vremena baš naći bolji način žao mi je ali fora je svejedno valjda)
      this.crashSound = new Audio("../assets/8-bit-explosion.wav"); // collision sound (DOSTA GLASNO)
      this.crashSound.volume = 0.05; // zato ga smanjujem baš je kritično
      this.dead = false; // dead flag for disabling input and resetting the game
    }
    update() {
      if (this.dead) return; // if dead, don't update
      this.player.update(this.input.keys); // player update
      this.enemies.forEach((enemy) => enemy.update(game)); // update all enemies
      this.timer.update(game); // update the timer
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion); // remove the enemies that are marked for deletion
      if (this.enemies.length < this.maxEnemies) {
        // if there are less than the max number of enemies, add more
        this.enemies.push(new Asteroid(this));
      }

      // update the stars
      this.stars.forEach((star) => star.update(game));

      // update the ambient noise to satisfy google update about autoplaying audio
      if (this.input.keys.length > 0) {
        this.ambientNoise.play();
      }

      // every 10 seconds increase the max number of enemies
      if (this.timer.seconds % 10 === 0 && this.timer.milliseconds === 0) {
        this.maxEnemies++;
      }

      // check for collisions
      this.enemies.forEach((enemy) => {
        if (
          this.player.x < enemy.x + enemy.width &&
          this.player.x + this.player.width > enemy.x &&
          this.player.y < enemy.y + enemy.height &&
          this.player.y + this.player.height > enemy.y
        ) {
          // game over, crash
          this.crashSound.play();
          // boom
          canvas.style.backgroundColor = "red";
          // freeze
          this.input.keys = [];
          // everything is gone
          this.enemies = [];
          // you are dead
          this.dead = true;
          // 500ms until reset
          setTimeout(() => {
            // reset, unboom
            canvas.style.backgroundColor = "black";
            // new player
            this.player = new Player(this);
            // reset max enemies and make new enemies instantly
            this.maxEnemies = 25;
            this.enemies = [];
            for (let i = 0; i < this.maxEnemies; i++) {
              this.enemies.push(new Asteroid(this));
            }
            // store the best time in local storage in miliseconds
            if (
              this.timer.milliseconds +
                this.timer.seconds * 1000 +
                this.timer.minutes * 60000 >
              this.timer.bestTime
            ) {
              localStorage.setItem(
                "bestTime",
                this.timer.milliseconds +
                  this.timer.seconds * 1000 +
                  this.timer.minutes * 60000
              );
            }
            // reset the timer
            this.timer = new Timer();
            // you are not dead anymore :D
            this.dead = false;
          }, 500);
        }
      });
    }
    // draw everything
    draw(context) {
      this.stars.forEach((star) => star.draw(context));
      this.player.draw(context);
      this.enemies.forEach((enemy) => enemy.draw(context));
      this.timer.draw(context); 
    }
  }

  // new game instance
  const game = new Game(canvas.width, canvas.height);


  function animate() {
    // clear the canvas every frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // update the game and draw everything
    game.update();
    game.draw(ctx);
    // loop
    requestAnimationFrame(animate);
  }
  animate();
});
