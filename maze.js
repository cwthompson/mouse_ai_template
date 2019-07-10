var fs = require('fs');
var generator = require('generate-maze');
const mapRoom = require('./room.js');
var crypto = require('crypto');

var maze = {
    hash: '5cf2cb714fce3beaca0fe07371360a05', // add hash to load here and set load to true
    file: "",
    load: true,
    startZone: {
        x: 0,
        y: 0
    },
    finishZone: {
        x:0,
        y:0
    },
    xMultiplier: 2, // max 10
    yMultiplier: 4, // max 10
    area : [],
    rooms: [],
    init: function () {

        if (this.load) {
            this.loadArea();
        } else {
            this.generateArea();
        }
        this.translateMap();

        console.log(this.finishZone.x + " "+this.finishZone.x+' is finish');
        return this;
    },
    getStartZone: function () {
        return this.startZone;
    },
    getFinishZone: function () {
        return this.finishZone;
    },
    getArea: function () {
        return this.area;
    },
    generateArea: function () {

        var randNum = Math.floor(Math.random() * this.xMultiplier) + 1;
        // update area details here later

        // update the generator vars at some point
        this.area = generator(this.xMultiplier, this.yMultiplier);
        this.generateHash();
    },
    generateHash: function () {

        this.hash = crypto.createHash('md5').update(JSON.stringify(this.getArea())).digest("hex");
        console.log('hash generated for map: '+this.hash);
        this.generateFilename();
    },
    generateFilename: function () {
        this.file = "docs/mazes/maze_"+this.hash+".txt";
        console.log(this.file);
    },
    loadArea: function() {
        this.generateFilename();
        if (fs.existsSync(this.file)) {
            console.log('loading maze');
            this.area = JSON.parse(fs.readFileSync(this.file, 'utf-8'));
        } else {
            error.log('Maze file not found');
            this.generateArea();
        }
    },
    getRooms: function () {
        return this.rooms;
    },
    translateMap: function() {

        var rooms = [];
        var rowsCount = 0;
        var rowsTotoal = this.area.length;
        this.area.forEach(function(rows) {

            rowsCount ++;
            var row = [];

            var roomCount = 0;
            rows.forEach(function (room) {

                roomCount ++;
                room.isFinish = false;
                room.isStart = false;

                // always make the bottom right the finish for now
                if (rowsCount == rowsTotoal &&
                    roomCount == rows.length) {
                    room.isFinish = true;
                    maze.finishZone = {
                        x: room.x,
                        y: room.y
                    }
                }

                if (room.y == maze.startZone.y && room.x == maze.startZone.x) {
                    room.isStart = true;
                    maze.startZone = {
                        x: room.x,
                        y: room.y
                    }
                }
                var room = mapRoom.getRoom(room);

                row.push(room);
                //add to row
            });

            rooms.push(row);
        });

        this.rooms = rooms;
    },
    getCurrentRoom: function(currentRoom) {
        return this.rooms[currentRoom.y][currentRoom.x];
    },
    getMazeHash: function() {
        return this.hash;
    }
}

module.exports.getMaze = function () {
    maze.init();
    return maze;
};