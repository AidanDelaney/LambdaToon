function SlideShow(canvas) {
    this.canvas   = canvas;
//    this.timer    = undefined;
//    this.iterator = undefined;
}

// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/The_Iterator_protocol
function makeIterator(array){
    var nextIndex = 0;

    return {
        next: function(){
            return nextIndex < array.length ?
                {value: array[nextIndex++], done: false} :
                {done: true};
        }
    }
}

SlideShow.prototype = {
    timer: undefined,
    iterator: undefined,

    _changeSlide : function() {
        var nxt = this.iterator.next();
        if(!nxt.done) {
            var ctx = this.canvas.getContext('2d');
            // FIXME: hard coding width & height
            ctx.drawImage(nxt.value, 0, 0, 1024, 768);
        } else {
            this.stop();
        }
    },

    update : function() {
        var that   = this;
        var images = [];

        $('.thumbnail').each(function(index, value){
            images.push(value);
        });

        that.iterator = makeIterator(images);
    },

    play: function() {
        var that = this;
        that.update();
        that.timer = setInterval(function() {that._changeSlide();}, 250);
    },

    stop: function() {
        if(this.timer) {
            clearInterval(this.timer);
        }
    },
}
