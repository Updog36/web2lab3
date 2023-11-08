export class Asteroid {
    constructor(game) {
        this.width = Math.random() * 30 + 30; // random width and height of asteroid between 30 and 60 da ne bi bilo prelagano 
        this.height = this.width; // square hitbox so height is the same as width :D
        this.x = Math.random() > 0.5 ? -this.width : game.width + this.width; // spawn off screen for width
        this.y = Math.random() > 0.5 ? -this.height : game.height + this.height; // and height
        this.vx = Math.random() * 4 - 2; // random velocities between -2 and 2 for x
        this.vy = Math.random() * 4 - 2; // and y
        this.rotation = Math.random() * 0.2 - 0.1; // random rotation between -0.1 and 0.1
        this.rotationDirection = Math.random() > 0.5 ? 1 : -1; // random rotation direction (1 or -1) (left or right)
        this.image = document.getElementById('asteroid'); // load the image preloaded in html
        this.markedForDeletion = false; // set "newborn" marked for deletion to false
        this.offset = 100; // offset to avoid marking "newborns" for deletion (TUŽNO!!!). čitaj "threshold"
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
        context.save(); // save the current context
        context.translate(this.x + this.width / 2, this.y + this.height / 2); // translate the context to the center of the asteroid
        context.rotate(this.rotation); // rotate the context
        context.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height); // draw the image
        context.restore(); // restore the context
    }
}
