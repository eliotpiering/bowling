test( "see if a game, and frame exist", function() {
    ok(game, "does it exist")
    ok(frame, "does it exist")
});

test("a game has ten frames", function() {
    equal(game.frame, 10)
});

test("a frame can have either 1 or 2 rolls", function() {
    equal(frame.rolls = 1 || 2)
});

test("the tenth frame has either 2 or 3 rolls", function() {
    var f = new frame(10)
    equal(f.rolls, 2 || 3)
});