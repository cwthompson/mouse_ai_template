function Room(mazeArea) {

    this.numberOfDoors = 0;
    this.doors = []; // doors refer to the location to adjacent rooms
    this.x = mazeArea.x;
    this.y = mazeArea.y;
    this.isStart = false;
    this.isFinish = false;
    this.setRoomDetails(mazeArea)
}

Room.prototype.setRoomDetails = function (room) {

    var doors = [];

    var styleClass = 'tile';

    if (!room.left) {
        doors.push({x: room.x - 1, y: room.y});
        styleClass = styleClass + ' no-wall-left';
    }
    if (!room.right) {
        doors.push({x: room.x + 1, y: room.y});
        styleClass = styleClass + ' no-wall-right';
    }
    if (!room.top) {
        doors.push({x: room.x, y: room.y - 1});
        styleClass = styleClass + ' no-wall-top';
    }
    if (!room.bottom) {
        doors.push({x: room.x, y: room.y + 1});
        styleClass = styleClass + ' no-wall-bottom';
    }
    if (room.isFinish) {
        this.isFinish = true;
        styleClass = styleClass + ' finish';
    }
    if (room.isStart) {
        this.isStart = true;
        styleClass = styleClass + ' start mouse';
    }

    this.styleId = 'roomX'+room.x+'Y'+room.y;
    this.styleClass = styleClass;
    this.doors = doors;
    this.numberOfDoors = doors.length;
}

Room.prototype.getDoors = function () {
    return this.doors;
}

module.exports.getRoom = function (mazeRoom) {
    return new Room(mazeRoom);
};
