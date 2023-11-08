export class Player {
    constructor(game) {
        this.game = game;
        this.width = 50;
        this.height = 50;
        this.x = this.game.width / 2;
        this.y = this.game.height / 2;
        this.image = document.getElementById('player');
    }

    update(input) {
        if (input.includes('ArrowDown')) this.y++;
        if (input.includes('ArrowUp')) this.y--;
        if (input.includes('ArrowLeft')) this.x--;
        if (input.includes('ArrowRight')) this.x++;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y > this.game.height - this.height) this.y = this.game.height - this.height;
        if (input) {
            this.game.ambientNoise.play();
        }
    }

    draw(context){
        context.drawImage(this.image, this.x, this.y);
    }

}