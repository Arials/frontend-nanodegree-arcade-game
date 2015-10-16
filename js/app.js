// Constants values:

// Blocks sizes
var BLOCK_WIDTH= 101;
var BLOCK_HEIGHT = 83;

// Char sizes
var CHAR_WIDTH = 101;
var CHAR_HEIGHT = 110;

// Enemies our player must avoid
var Enemy = function(x, y, speed, player) {
    // Enemy position
    this.x = x;
    this.y = y;

    // Enemy speed
    this.speed = speed;

    // Player instance
    // For collision calculatio
    this.player = player;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);

    // If enemy out for the right, come back for the left
    if (this.x > (101*5))
    {
        this.x = -101;
    };

    // check collision with player
    if (Math.abs(this.x - this.player.x) < 50)
    {
        if (Math.abs(this.y - this.player.y) < 20)
        {
            // Collision detected, reset the player position
            // You lose!
            this.player.reset();
            this.player.score = 0;
        };
    };
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function(){
    // player position
    this.x = (BLOCK_WIDTH- CHAR_WIDTH);
    this.y = (BLOCK_HEIGHT - CHAR_HEIGHT);

    // player block.
    // Identify the row/column of the player
    this.block_x = 2;
    this.block_y = 5;

    // The image/sprite for our player
    this.sprite = 'images/char-boy.png';
    this.score = 0;
};

// Input handler for player movement
Player.prototype.handleInput = function(key) {
    if (key === 'up') {
        this.block_y--;
        if (this.block_y < 1)
        {
            // Player wins
            this.reset();
            this.score++;
        }
    }else{
        if (key === 'down'){
            // player can only go down until row 5
            if (this.block_y < 5)
            {
                this.block_y++;
            }
        }else{
            if (key === 'left')
            {
                this.block_x--;
                // If go the left of column 0
                // appears on the right
                if (this.block_x < 0)
                {
                    this.block_x = 5 + this.block_x;
                }
            }else{
                if (key === 'right')
                {
                    this.block_x++;
                    // If go to the left of column 5
                    // appears on the left
                    this.block_x %= 5;
                }
            }
        }
    }
};

// Update player position
Player.prototype.update = function() {
    this.x = (BLOCK_WIDTH- CHAR_WIDTH) + (this.block_x * BLOCK_WIDTH);
    this.y = (BLOCK_HEIGHT - CHAR_HEIGHT) + (this.block_y * BLOCK_HEIGHT);
};

// Draw Player in canvas
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    printScore(this.score);
};

// Reset the player to the start position
Player.prototype.reset = function() {
    this.block_x = 2;
    this.block_y = 5;
};


// Code from MemesMake for score system
var printScore = function(score){
    // Text attributes
    ctx.font = '20pt Impact';
    ctx.textAlign = 'center';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'white';
    var topLine = 'Score ' + score;

    // Print score in canvas
    if (topLine != null) {
        ctx.fillText(topLine, 505 / 2, 80);
        ctx.strokeText(topLine, 505 / 2, 80);
    }
};

// Player instance
var player = new Player();

// Array of Enemys instances
var allEnemies = [
    new Enemy(-101, 65, 50, player),
    new Enemy(-101, 65, 90, player),
    new Enemy(-101, 140, 80, player),
    new Enemy(-101, 140, 120, player),
    new Enemy(-101, 140, 170, player),
    new Enemy(-101, 140, 80, player),
    new Enemy(-101, 220, 200, player),
    new Enemy(-101, 220, 100, player)
    ];





// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
