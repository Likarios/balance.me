function startDrag(e) {
    this.style.position = 'absolute';

    this.ontouchmove = this.onmspointermove = moveDrag;

    this.ontouchend = this.onmspointerup = function() {
        this.ontouchmove = this.onmspointermove = null;
        this.ontouchend = this.onmspointerup = null;
    }

    var pos = [this.offsetLeft, this.offsetTop];
    var origin = getCoors(e);

    function moveDrag(e) {
        var currentPos = getCoors(e);
        var deltaX = currentPos[0] - origin[0];
        var deltaY = currentPos[1] - origin[1];
        var newLeft = pos[0] + deltaX;
        var newRight = pos[1] + deltaY;
        console.log("Nouvelle coordonnée : " + newLeft)
        console.log("Taille écran : " + window.screen.width)
        console.log("Taille image : " + this.width)
        if (newLeft > 0 && newLeft < window.screen.width - this.width){
            this.style.left = newLeft + 'px';
        }
        if (newRight > 0 && newRight < window.screen.height - this.height){
            this.style.top = newRight + 'px';
        }
        return false;
    }

    function getCoors(e) {
        var coors = [];
        if (e.targetTouches && e.targetTouches.length) {
            var thisTouch = e.targetTouches[0];
            coors[0] = thisTouch.clientX;
            coors[1] = thisTouch.clientY;
        } else {
            coors[0] = e.clientX;
            coors[1] = e.clientY;
        }
        
        return coors;
    }
}

var elements = document.querySelectorAll('.character');
[].forEach.call(elements, function(element) {
    element.ontouchstart = element.onmspointerdown = startDrag;
});

document.ongesturechange = function() {
    return false;
}