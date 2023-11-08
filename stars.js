class Stars {
    constructor(game) {
        this.game = game;
        this.x = Math.random() * this.game.width; // random x position within game width
        this.y = Math.random() * this.game.height; // random y position within game height
        this.size = 5; // size of the star
        this.speed = 1; // speed of the star
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

    draw() {
        const ctx = this.game.ctx;

        // save the current context state
        ctx.save();

        // translate to the center of the star
        ctx.translate(this.x + this.size / 2, this.y + this.size / 2);

        // rotate the context
        ctx.rotate(this.angle);

        // draw the star
        ctx.fillStyle = "#fff";
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);

        // restore the context state
        ctx.restore();
    }
}