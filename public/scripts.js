var socket = io();
//
// socket.emit('create', 'room1');

var start = function(){

    $('.room')
        .addClass('not-visited')
        .removeClass('mouse') // update to all mice coats
        .removeClass('not-visited-finished');

    $('#roomX0Y0')
        .addClass('mouse') // update to all mice coats
        .removeClass('not-visited');

    $('#start').attr('disabled', true);
    $('#stop').attr('disabled', false);
    socket.emit('startMouse', {});
};

var stop = function(){
    socket.emit('stopMouse',{});

    $('#stop').attr('disabled', true);
    $('#start').attr('disabled', false);
};

var load = function(){

    hash = $('#hashSelect').val();
    $.ajax({
        method: "GET",
        url: "/maze/"+hash,
    })
    .done(function(maze) {
        $('.map').html(maze);
        $('.log').html('<li>Maze loaded</li>');
    });

    stop();
};

socket.on('mazeFinished', function(data){

    // apply visual display to rooms the mouse did not visit
    $('.not-visited')
        .addClass('not-visited-finished');

    data.deadEnds.forEach((function(deadEnd) {
            $('#roomX'+deadEnd.x+'Y'+deadEnd.y)
                .addClass('dead-end');
        })
    );
    $('.log li:first-child').before('<li>'+data.name+' found cheese in '+data.steps+' steps</li>');
});

socket.on('mouseMoved',function(data){

    // get details of mouse here

    if (data.resetMouse) {
        $('#something').html("Reset Mouse");
        $('.log li:first-child').before('<li>'+data.name+' unable to find the cheese - '+data.steps+' steps taken</li>');
    } else {
        // record what the viewers mouse is here
        $('#something').html(data.name+' moved to room '+data.location.x+ " - "+data.location.y+ " and has taken "+data.steps+" steps");
    }

    $('#roomX'+data.location.x+'Y'+data.location.y).addClass('mouse') // update to mouse
});

$( document ).ready(function() {

    $('.room').removeClass('mouse');

    $('#roomX0Y0').addClass('mouse')
});