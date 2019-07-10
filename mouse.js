var fs = require('fs');

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {

        if (list[i].x === obj.x && list[i].y === obj.y) {
            return true;
        }
    }

    return false;
}

var mouse = {
    number: 0,
    steps: 0,
    name: 'Mouse',
    location: {
        x: 0,
        y: 0
    },
    move: function(room) {

    },
    getLocation: function () {
        return this.location;
    },
    getName: function () {
        return this.name;
    },
    setName: function (name) {
        this.name = name;
    },
    updateLocation: function (room) {
        this.location = {
            x: room.x,
            y: room.y
        }
    },
    resetMouse: function () {
        this.number ++;
        this.setName('Mouse '+this.number);
        this.steps = 0;

        this.location = { x: 0, y: 0 };
    },
    getSteps: function () {
        return this.steps;
    }
}

module.exports.getMouse = function () {
    return mouse;
};
