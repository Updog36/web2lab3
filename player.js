export class Player {
    constructor(game) {
        this.game = game; // store the game
        this.width = 30; // set the width 
        this.height = 30; // and height
        this.x = this.game.width / 2; // set the starting position to the center of the screen
        this.y = this.game.height / 2;
        this.image = document.getElementById('player'); // load the preloaded image from the html
    }

    update(input) {
        if (input.includes('ArrowDown')) this.y++; // if the input array contains the arrow down key, move down
        if (input.includes('ArrowUp')) this.y--; // up key, move down
        if (input.includes('ArrowLeft')) this.x--; // etc
        if (input.includes('ArrowRight')) this.x++; // etc...
        
        // player can't go out of bounds
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        if (this.y < 0) this.y = 0;
        if (this.y > this.game.height - this.height) this.y = this.game.height - this.height;
        if (input != []) {
            // when the player first moves, start the ambient noise
            this.game.ambientNoise.play();
        }
    }

    draw(context){
        // draw the player
        context.drawImage(this.image, this.x, this.y);
    }

}