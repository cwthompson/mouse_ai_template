const express = require('express');
const app = express();
const serv = require('http').Server(app);

const mazeArea = require('./maze.js');
const m = require('./mouse.js');
const b = require('./brain.js');

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

serv.listen(7000);

app.get('/', (req, res) => {

    res.render('index', {
        showCoordinates: false, // set to true to display room coordinates
        mazeHash: maze.getMazeHash(),
        maze: maze.getRooms(),
        mouse: mouse,
        showCoordinates: false
    });
});

app.get('/maze/:id', (req, res) => {

    maze.load = true;
    maze.hash = req.params.id;
    maze.init();

    mouse.number = 0;
    mouse.updateLocation(maze.getStartZone());

    res.render('maze', {
        maze: maze.getRooms(),
        mouse: mouse,
        showCoordinates: false
    });
});

// - setup -----------------------------------

var brain;
var maze = mazeArea.getMaze();
var mouse = m.getMouse();

mouse.updateLocation(maze.getStartZone());

// - socket -----------------------------------

var io = require('socket.io')(serv,{});

io.sockets.on('connection', function(socket){

    brain = b.getBrain(socket, mouse, maze);

    socket.on('startMouse',function(data){

        mouse.steps = 0;
        mouse.resetMouse();
        mouse.updateLocation(maze.getStartZone());
        brain.start();
    });

    socket.on('stopMouse',function(data){

        brain.stop();
    });

    socket.on('loadMaze',function(data){

        maze.load = true;
        maze.hash = data.hash;
        maze.loadArea();
        brain.stop();
    });
});
