function game () {
    this.currentFrame = new frame();
    this.frames = [];
    this.gameStatus = 1;
    this.roll = function (pins) {
        if (pins < 0 || pins > 10) {
            throw new Error();
        }
        if (this.currentFrame.roll1 + pins > 10 && this.gameStatus != 10 && this.currentFrame.roll1 != 10)  {
            throw new Error('dont cheat')
        }

        if (this.currentFrame.roll1 == null) {
            this.currentFrame.roll1 = pins
            if (pins == 10 && this.gameStatus != 10) {
                this.frames.push(this.currentFrame);
                this.currentFrame = new frame();
                this.gameStatus += 1;
            }
        } else if (this.currentFrame.roll2 == null) {
            this.currentFrame.roll2 = pins
            if (this.gameStatus < 9) {
                this.frames.push(this.currentFrame);
                this.currentFrame = new frame();
                this.gameStatus += 1;
            } else if (this.gameStatus == 9 ){
                this.frames.push(this.currentFrame);
                this.currentFrame = new lastFrame();
                this.gameStatus += 1;
            } else if (this.currentFrame.roll3 == null && (this.currentFrame.roll1 + this.currentFrame.roll2 < 10)) {
                this.frames.push(this.currentFrame);
                this.gameStatus = 'over';
            }
        } else {
            this.currentFrame.roll3 = pins;
            this.frames.push(this.currentFrame);
            this.gameStatus = 'over';
        }
    };

    this.score = function() {
        var score = 0;
        var lastFrameStrike = false;
        var lastFrameSpare = false;
        for (var i = 0; i < this.frames.length; i++) {
            var f = this.frames[i];
            if (lastFrameSpare) {
                score = score + f.roll1;
            }
            if (lastFrameStrike){
                score = score + f.roll1 + f.roll2;
            }
            if (f instanceof lastFrame && f.roll1 == 10) {
                score = score + f.roll2 + f.roll3
            } else if (f instanceof lastFrame && (f.roll1 + f.roll2) == 10) {
                score += f.roll3
            }

            score += f.roll1;
            if (f.roll2) {
                score += f.roll2
            }
            if (f.roll3) {
                score += f.roll3
            }
            if (f.roll1 + f.roll2 == 10 && f.roll2 != null){
                lastFrameSpare = true;
                lastFrameStrike = false;
            } else if (f.roll1 == 10) {
                lastFrameStrike = true;
                lastFrameSpare = false;
            } else {
                lastFrameStrike = false;
                lastFrameSpare = false;
            }
        }
        return score
    }
 }

function frame ()
{
    this.roll1 = null;
    this.roll2 = null;
}

function lastFrame ()
{
    this.roll1 = null;
    this.roll2 = null;
    this.roll3 = null;
}

