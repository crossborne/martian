var Should = require('should');
var World = require('../src/world.js');
var Robot = require('../src/robot.js');

describe('Robot', function() {
    beforeEach(function() {});

    describe('turnLeft()', function() {
        it('should return west from north', function() {
            var robot = new Robot(0, 0, 'N');
            robot.turnLeft().should.be.eql('W');
        });
    });

    describe('turnRight()', function() {
        it('should return west from south', function() {
            var robot = new Robot(0, 0, 'S');
            robot.turnRight().should.be.eql('W');
        });
    });

    describe('moveForward()', function() {
        it('should return new position x: 0, y: 1', function() {
            var robot = new Robot(0, 0, 'N');
            robot.moveForward().should.be.eql({ x: 0, y: 1 });
        });
    });

    describe('handleInstructionF()', function() {
        it('should return 0 1 N', function() {
            var robot = new Robot(0, 0, 'N');
            robot.handleInstruction('F').getCurrentPositionString().should.be.eql('0 1 N');
        });
    });

    describe('handleInstructionF() with previous position', function() {
        it('should return 0 1 N and 0 0 N', function() {
            var robot = new Robot(0, 0, 'N');
            robot.handleInstruction('F');
            robot.getCurrentPositionString().should.be.eql('0 1 N');
            robot.getPreviousPositionString().should.be.eql('0 0 N');
        });
    });
});

describe('World', function() {
    describe('handleInstructions()', function() {
        var mars = new World(5, 3);

        it('should return 1 1 E', function() {
            var robot = new Robot(1, 1, 'E');
            mars.passInstructions(robot, 'RFRFRFRF').should.be.eql('1 1 E');
        });

        it('should return 3 3 N LOST', function() {
            var robot = new Robot(3, 2, 'N');
            mars.passInstructions(robot, 'FRRFLLFFRRFLL').should.be.eql('3 3 N LOST');
        });

        it('should return 2 3 S', function() {
            var robot = new Robot(0, 3, 'W');
            mars.passInstructions(robot, 'LLFFFLFLFL').should.be.eql('2 3 S');
        });

        it('should return 5 0 S LOST', function() {
            var robot = new Robot(5, 3, 'S');
            mars.passInstructions(robot, 'FFFFFFF').should.be.eql('5 0 S LOST');
        });

        it('should return 5 0 S', function() {
            var robot = new Robot(5, 3, 'S');
            mars.passInstructions(robot, 'FFFFFFF').should.be.eql('5 0 S');
        });
    });
});
