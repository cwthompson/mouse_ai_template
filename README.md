# mouse-ai

A tech test based off a personal project aimed at creating a simple ai and making something my 5yr will enjoy
-

the aim is to create an AI that will help the mouse navigate the maze and find the cheese at the end. The smarter the mouse the better.

- the mouse can only move one room at a time and only to an adjacent room (no teleportation)
- a mouse shouldn't instantly know the correct path and instead should learn the best route through trial and error.
- a mouse can inherit knowledge of the maze from previous runs.

the project contains a mouse, maze, room and brain.

- `maze` a collection of rooms that has been build on preset json files

    The maze understands where the start and finish (cheese) are located in the maze
   , currently the start is set as the top left corner and the finish is set as the bottom right
   
   the plugin used to generate the maze starts the top left room as `x: 0 y: 0` and increments out from there (the room to the right being `x: 0 y:1` and the one below being `x:0 y:1`), 
   these can be diplayed in the maze by setting `showCoordinates` to true in `app.js`
   
- `rooms` contain details about an individual room in the maze,. This includes their coordinates, if they are the start or finish of the maze and the number of doors.
    
    each room element is given an id based on its coordinates e.g. `roomX0Y0`
    
    room.doors refer to adjacent rooms

- `mouse` is the movable "player" the aim is to get the mouse to find a room in the maze that contains the cheese

- `brain` decides what action should be taken next. brain also emits data via websocket the the client side to update any displays e.g. update the visual location of the mouse.

    websockets have been set up in order to allow the front end communicate with any scripts running in the back end.


the app is set up with docker and runs on `http://localhost:3000/` after running `docker-compose build` and `docker-compose up`

the main areas to focus on will be in `brain.start` and `mouse.move()`. `brain.start()` contains a loop that represents each time the mouse will move.