export class InputHandler {
    constructor(){
        this.keys = []; // array of keys pressed
        window.addEventListener('keydown', e => { // key press listener
            if ((e.key === 'ArrowDown' || // for all arrows
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight')
            && this.keys.indexOf(e.key) === -1) { // if not already in array
                this.keys.push(e.key); // add it
            }
        });

        window.addEventListener('keyup', e => { // same thing for key release
            if (e.key === 'ArrowDown' || 
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight') {
                this.keys.splice(this.keys.indexOf(e.key), 1); // but remove it
            }
        });
    }
}