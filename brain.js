var brain = {
    socket: {},
    mouse: {},
    maze: {},
    timer: 200,
    move: {},
    start : function() {
        //
        var socket = brain.socket;
        var mouse = brain.mouse;
        var maze = brain.maze;

        this.move = setInterval(function() {

            var finish = maze.getFinishZone();

            // this represents each step the mouse takes

            var currentLocation = mouse.getLocation();

            if (finish.x == currentLocation.x &&
                finish.y == currentLocation.y) {

                // //  update the number of the mouse and reset details such as steps ect.
                //
                //mouse.resetMouse();
                //
                // // socket used update the client side display. e.g display a message saying the mouse has finished
                //
                // socket.emit('mazeFinished', {
                //     name: mouse.getName(),
                //     steps: mouse.getSteps()
                // });

                brain.stop();

            } else {

                // // socket used to update the client side display. e.g visually make the mouse move
                //
                // socket.emit('mouseMoved', {
                //     name: mouse.getName(),
                //     location: mouse.getLocation(),
                //     steps: mouse.getSteps(),
                //     resetMouse: false // used to determin what message to display - not to be confused with mouse.reset
                // });
            }

        }, brain.timer)
    },
    stop: function() {
        clearInterval(brain.move);
    }
}

module.exports.getBrain = function (socket, mouse, maze) {

    brain.maze = maze;
    brain.mouse = mouse;
    brain.socket = socket;

    return brain;
}