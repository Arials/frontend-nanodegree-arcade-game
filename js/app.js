// Blocks sizes
var block_width = 101;
var block_height = 83;
var x_block = block_width / 2;
var y_block = block_height / 2;
// Char sizes
var char_width = 101;
var char_height = 110;

// Enemies our player must avoid
var Enemy = function(x, y, speed, player) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.player = player;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt);

    if (this.x > (101*5))
    {
        this.x = -101;
    };

    // check collision with player
    if (Math.abs(this.x - this.player.x) < 50)
    {
        if (Math.abs(this.y - this.player.y) < 20)
        {
            this.player.reset();
        };
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.x = (block_width - char_width);
    this.y = (block_height - char_height);
    this.block_x = 2;
    this.block_y = 5;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.handleInput = function(allowedKeys) {
    if (allowedKeys === 'up') {
        this.block_y--;
        if (this.block_y < 0)
        {
            this.block_y = 6 + this.block_y;
        };
    }else{
        if (allowedKeys === 'down'){
            if (this.block_y < 5)
            {
                this.block_y++;
            }
        }else{
            if (allowedKeys === 'left')
            {
                this.block_x--;
                if (this.block_x < 0)
                {
                    this.block_x = 5 + this.block_x;
                };
            }else{
                if (allowedKeys === 'right')
                {
                    this.block_x++;
                    this.block_x %= 5;
                };
            };
        };
    };
};

Player.prototype.update = function() {
    this.x = (block_width - char_width) + (this.block_x * block_width);
    this.y = (block_height - char_height) + (this.block_y * block_height);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset the player to the start position
Player.prototype.reset = function() {
    this.block_x = 2;
    this.block_y = 5;
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [new Enemy(-101,65,50, player), new Enemy(-101,140,80, player)];





// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
