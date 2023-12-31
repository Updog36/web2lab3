export class Timer {
    constructor() {
        // have minutes seconds and milliseconds
        this.minutes = 0;
        this.seconds = 0;
        this.milliseconds = 0;
        // take best time from local storage
        this.bestTime = localStorage.getItem('bestTime') || 0;
        // from miliseconds, calculate minutes, seconds and milliseconds
        this.bestTimeMinutes = Math.floor(this.bestTime / 60000);
        this.bestTimeSeconds = Math.floor((this.bestTime - this.bestTimeMinutes * 60000) / 1000);
        this.bestTimeMilliseconds = this.bestTime - this.bestTimeMinutes * 60000 - this.bestTimeSeconds * 1000;
    }
    update(game) {
        // the game is running at 60 frames per second
        // so in 60 frames, 1000 milliseconds pass
        // so every 60 frames, seconds++
        // and every 60 seconds, minutes++
        this.milliseconds += Math.round(1000 / 60);
        if (this.milliseconds >= 1000) {
            this.seconds++;
            this.milliseconds = 0;
        }
        if (this.seconds >= 60) {
            this.minutes++;
            this.seconds = 0;
        }
    }

    draw(context) {
        // draw the timer in the top right corner
        context.font = '23px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'right';
        context.fillText(`Time: ${this.minutes}:${this.seconds.toString().padStart(2, '0')}.${this.milliseconds.toString().padStart(3, '0')}`, context.canvas.width - 10, 60);
        // draw the best time just above the timer
        context.fillText(`Best Time: ${this.bestTimeMinutes}:${this.bestTimeSeconds.toString().padStart(2, '0')}.${this.bestTimeMilliseconds.toString().padStart(3, '0')}`, context.canvas.width - 10, 30);
    }
}