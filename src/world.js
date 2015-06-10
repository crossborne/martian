var World = function(width, height) {
    this.width = width;
    this.height = height;
    this.monument = {};
};

World.prototype = {

    passInstructions: function (robot, instructionString) {
        var instructions = instructionString.split('');

        while(instructions.length > 0) {
            var instruction = instructions.shift();

            // skip instruction if previous robot felt off
            if (this.isAboutToFallOff(robot.getCurrentPosition(), instruction)) {
                continue;
            }

            robot.handleInstruction(instruction);

            // if robot falls off, leave scent and return the last state with additional LOST message
            if (this.isOffTheGrid(robot.getCurrentPosition())) {
                this.leaveScent(robot, instruction);
                return robot.getPreviousPositionString() + ' LOST';
            }
        }
        return robot.getCurrentPositionString();
    },

    isAboutToFallOff: function(state, nextInstruction) {
        var key = this.buildGridKey(state);
        if (this.monument[key] && this.monument[key].indexOf(state.direction + nextInstruction) > -1)
            return true;
        return false;
    },

    buildGridKey: function(state) {
        return state.y + 'x' + state.x;
    },

    isOffTheGrid: function(state) {
        if (state.x < 0 ||
            state.y < 0 ||
            state.x > this.width ||
            state.y > this.height)
            return true;
        return false;
    },

    leaveScent: function(robot, lastInstruction) {
        if (!this.monument[this.buildGridKey(robot.getPreviousPosition(), lastInstruction)]) {
            this.monument[this.buildGridKey(robot.getPreviousPosition(), lastInstruction)] = [robot.direction + lastInstruction];
        } else {
            this.monument[this.buildGridKey(robot.getPreviousPosition(), lastInstruction)].push(robot.direction + lastInstruction);
        }
    }
};

module.exports = World;
