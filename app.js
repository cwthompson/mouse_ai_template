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
        mazeHash: map.getMazeHash(),
        maze: map.getRooms(),
        mouse: mouse
    });
});

app.get('/maze/:id', (req, res) => {

    map.load = true;
    map.hash = req.params.id;
    map.init();

    mouse.number = 0;
    mouse.updateLocation(map.getStartZone());

    res.render('maze', {
        // mazeHash: map.getMazeHash(),
        // maze: map.getArea(),
        maze: map.getRooms(),
        mouse: mouse,
        showCoordinates: false
    });
});

// - setup -----------------------------------

var brain;
var map = mazeArea.getMaze();
var mouse = m.getMouse();

mouse.updateLocation(map.getStartZone());

// - socket -----------------------------------

var io = require('socket.io')(serv,{});

io.sockets.on('connection', function(socket){

    brain = b.getBrain(socket, mouse, map);

    console.log('socket connection');

    socket.on('startMouse',function(data){

        mouse.steps = 0;
        mouse.resetMouse();
        mouse.updateLocation(map.getStartZone());
        brain.start();
    });

    socket.on('stopMouse',function(data){

        brain.stop();
    });

    socket.on('loadMaze',function(data){

        map.load = true;
        map.hash = data.hash;
        map.loadArea();
        brain.stop();
    });
});
