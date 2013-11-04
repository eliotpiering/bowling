
test( "see if a game, and frame exist", function() {
    ok(game, "does it exist");
    ok(frame, "does it exist");
});

test("a game has ten frames", function() {
    var g = new game();
    for (var i = 0;i < 10; i++) {
        g.roll(3);
        g.roll(4);
    }
    equal(g.gameStatus, 'over', "the game should be over")
});

test("after a roll the game should update the current frame", function() {
    var g = new game();
    equal(g.gameStatus, 1, "it should be the 1st frame in the game");

    g.roll(5);
    g.roll(5);
    equal(g.gameStatus, 2, "it should be the 2nd frame after not getting a strike");

    g.roll(10);
    equal(g.gameStatus, 3, "it should be the 3rd frame after getting a strike");

});


test("if it is the tenth frame you can have up to three rolls", function() {
    var g = new game();
    g.gameStatus = 9;

    g.roll(5);
    g.roll(5);
    equal(g.gameStatus, 10, "it should be the 2nd frame after not getting a strike");
    ok(g.currentFrame instanceof lastFrame, "it should be the last frame");

    g.roll(3);
    g.roll(7);
    equal(g.gameStatus, 10, "shouldn't be over yet");
    g.roll(8);
    equal(g.gameStatus, 'over',  "game over");

});

test("if it is the tenth frame you can have up to three rolls even if you are rolling strikes", function() {
    var g = new game();
    g.gameStatus = 9;

    g.roll(5);
    g.roll(5);
    g.roll(10);
    g.roll(10);
    equal(g.gameStatus, 10, "shouldn't be over yet");
    g.roll(10);
    equal(g.gameStatus, 'over',  "game over");

});

test("game.roll() takes 1 number that has to be between 0 and 10", function() {
    var g = game;
    throws(function() {g.roll(11)},  "should throw an error");
    throws(function() {g.roll(-1)},  "should throw an error");
});

test("you cannot get more than 10 on a single frame,", function () {
    g = new game();
    g.roll(6)
    throws(function () {g.roll(7)}, "should throw an error");

});

test("score should add up the score of a full game", function() {
    var g = new game();
    for (var i = 0;i < 10; i++) {
        g.roll(3);
        g.roll(4);
    }
    equal(g.score(), 70, "you scored 74 points this game")
});

test("if you get a strike or a spare, score should take into account your next roll", function() {
    var g = new game();
    g.roll(5);
    g.roll(5);
    g.roll(2);
    g.roll(2);
    equal(g.score(), 16, "only the first roll after a spare should be added twice");

    g.roll(0);
    g.roll(10);
    g.roll(10);
    equal(g.score(), 46, "a strike should be added onto a spare");

    g.roll(5);
    g.roll(5);
    g.roll(0);
    g.roll(5);
    equal(g.score(), 71, "if the next roll after a strike or spare is 0 it should not be added on");

    g.roll(10);
    g.roll(4);
    g.roll(5);
    equal(g.score(), 99, "the next two rolls after a strike should be added on");
});

test("score should work on the last frame", function() {
    var g = new game();
    g.gameStatus = 9;
    g.roll(5);
    g.roll(5);
    g.roll(10);
    g.roll(4);
    g.roll(5);
    equal(g.score(), 48, "the score should be 48... i think")
});