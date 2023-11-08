export class Asteroid {
    constructor(game) {
        this.width = Math.random() * 30 + 30;
        this.height = this.width;
        // spawn off screen (x = -width or x = game.width + width)
        this.x = Math.random() > 0.5 ? -this.width : game.width + this.width;
        this.y = Math.random() > 0.5 ? -this.height : game.height + this.height;
        // random velocities between -2 and 2 for x and y
        this.vx = Math.random() * 4 - 2;
        this.vy = Math.random() * 4 - 2;
        this.rotation = Math.random() * 0.2 - 0.1;
        this.rotationDirection = Math.random() > 0.5 ? 1 : -1;
        this.image = document.getElementById('asteroid');
        this.markedForDeletion = false;
        this.offset = 100;
    }
    update(game) {
        // update the x and y coordinates based on the velocities
        this.x += this.vx;
        this.y += this.vy;
        // update the rotation
        this.rotation += this.rotationDirection * 0.1;
        // if the asteroid goes off screen with its size plus an offset, mark it for deletion
        if (this.x < -this.width - this.offset ||
            this.x > game.width + this.offset ||
            this.y < -this.height - this.offset ||
            this.y > game.height + this.offset) {
            this.markedForDeletion = true;
        }
    }

    draw(context) {
        context.save();
        context.translate(this.x + this.width / 2, this.y + this.height / 2);
        context.rotate(this.rotation);
        context.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        context.restore();
    }
}
