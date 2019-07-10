var brain = {
    socket: {},
    mouse: {},
    map: {},
    timer: 200,
    move: {},
    start : function() {
        //
        // var socket = brain.socket;
        var mouse = brain.mouse;
        var map = brain.map;
        var finish = map.getFinishZone();

        this.move = setInterval(function() {

            // this represents each step the mouse takes

            var currentRoom = mouse.getLocation();

            if (finish.x == currentRoom.x &&
                finish.y == currentRoom.y) {

                // brain.socket.emit('mazeFinished', {
                //     name: mouse.getName(),
                //     steps: steps
                // });
                //
                //

            } else {

                // brain.socket.emit('mouseMoved', {
                //     name: name,
                //     location: mouse.getLocation(),
                //     steps: steps,
                //     resetMouse: resetMouse
                // });
            }

        }, brain.timer)
    },
    stop: function() {
        clearInterval(brain.move);
    }
}

module.exports.getBrain = function (socket, mouse, map) {

    brain.map = map;
    brain.mouse = mouse;
    brain.socket = socket;
    // brain.timer = brain.maxTimer;

    return brain;
}