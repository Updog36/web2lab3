export class Stars {
    constructor(game) {
        this.game = game;
        this.x = Math.random() * this.game.width; // random x position within game width
        this.y = Math.random() * this.game.height; // random y position within game height
        this.size = 1; // size of the star
        this.speed = 0.5; // speed of the star
        this.angle = Math.random() * Math.PI * 2; // random starting angle
    }

    update() {
        // move the star horizontally
        this.x += this.speed;

        // if the star goes off the screen, reset its position
        if (this.x > this.game.width + this.size) {
            this.x = -this.size;
            this.y = Math.random() * this.game.height;
        }

        // rotate the star
        this.angle += 0.1;
    }

    draw(context) {
        // save the current context state
        context.save();

        // translate to the center of the star
        context.translate(this.x + this.size / 2, this.y + this.size / 2);

        // rotate the context
        context.rotate(this.angle);

        // draw the star
        context.fillStyle = "#fff";
        context.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);

        // restore the context state
        context.restore();
    }
}