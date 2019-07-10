# mouse-ai

personal project aimed at testing simple ai and making something my 5yr will enjoy

the project contains a mouse, maze, room and brain.

- maze a collection of rooms that has been build on preset json files

    The maze understands where the start and finish (cheese) is in the maze
   , currently the start is set as the top left cornor and the finish is set as the bottom right
   
- rooms contain details about an individual room in the maze,. This includes thier coordinates, if they are the start or finish of the maze and the number of doors.

- mouse is the movable "player" the aim is to get the mouse to find a room in the maze that contains the cheese

- brain decides what action should be taken next. example interactions to the front end have been left in as comments


websockets have been set up in order to allow the front end comunicate with any scripts running in the back end.