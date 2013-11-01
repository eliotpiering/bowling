function game() {
    f = new frame();
    this.roll = function() {
        var rollAgain = true;
        pins = (Math.random()*10) + 1;
        if (pins = 10) {
            var rollAgain = false;
        }

    };
    this.score = function(score) {
    return score
    };
 }

function frame() {
    this.rolls = 0;
    this.curentFrame = 0
}
