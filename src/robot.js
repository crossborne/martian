var Robot = function(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this._saveState();
};

var directionsToTheLeft = {
    'W': 'S',
    'S': 'E',
    'E': 'N',
    'N': 'W'
};

var directionsToTheRight = {};
for(var key in directionsToTheLeft) {
    directionsToTheRight[directionsToTheLeft[key]] = key;
}

Robot.prototype = {

    directionCallbacks: {
        'W': function() { this.x--; },
        'S': function() { this.y--; },
        'E': function() { this.x++; },
        'N': function() { this.y++; }
    },

    turnLeft: function() {
        this.direction = directionsToTheLeft[this.direction];
        return this.direction;
    },

    turnRight: function() {
        this.direction = directionsToTheRight[this.direction];
        return this.direction;
    },

    moveForward: function() {
        this.directionCallbacks[this.direction].call(this);
        return { x: this.x, y: this.y };
    },

    handleInstruction: function(instruction) {
        this._saveState();

        var possibleInstructions = {
            'L': this.turnLeft,
            'R': this.turnRight,
            'F': this.moveForward
        };
        possibleInstructions[instruction].call(this);
        return this;
    },

    getCurrentPositionString: function() {
        return this._formatPositionString(this.getCurrentPosition());
    },

    getCurrentPosition: function() {
        return this;
    },

    getPreviousPositionString: function() {
        return this._formatPositionString(this.getPreviousPosition());
    },

    getPreviousPosition: function() {
        return this.prevState;
    },

    _formatPositionString: function(position) {
        return position.x + ' ' + position.y + ' ' + position.direction;
    },

    _saveState: function() {
        this.prevState = JSON.parse(JSON.stringify(this));
    },
};

module.exports = Robot;
