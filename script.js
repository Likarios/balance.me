// Functions and variables for the image touch grabing

function startDrag(e) {
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
        var newTop = pos[1] + deltaY;
        if (newLeft > 0 && newLeft < containerWidth - this.width) {
            this.style.left = newLeft + 'px';
        }
        if (newTop > 0 && newTop < containerHeight - this.height) {
            this.style.top = newTop + 'px';
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

var containerWidth = window.screen.width - document.querySelector('.container').offsetLeft;
var containerHeight = window.screen.height - document.querySelector('.container').offsetTop;

var elements = document.querySelectorAll('.character');
[].forEach.call(elements, function(element) {
    element.ontouchstart = element.onmspointerdown = startDrag;
    element.style.position = 'absolute';
});

document.ongesturechange = function() {
    return false;
}

// Functions and variables for the image tilting based on phone orientation

if ('DeviceOrientationEvent' in window) {
    window.addEventListener('deviceorientation', deviceOrientationHandler, false);
} else {
    document.getElementsByClassName('container')[0].innerText = 'Device Orientation API not supported.';
}

function deviceOrientationHandler(eventData) {
    var tiltLR = eventData.gamma;
    var logo = document.getElementsByClassName("character");
    logo[0].style.transform = "rotate(" + tiltLR + "deg)";
}

// Functions and variables for the camera capture

function getUserMedia(options, successCallback, failureCallback) {
    var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (api) {
        return api.bind(navigator)(options, successCallback, failureCallback);
    }
}

var theStream;

function getStream() {
    if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
        !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
        alert('User Media API not supported.');
        return;
    }

    var constraints = {
        video: true
    };

    getUserMedia(constraints, function(stream) {
        var mediaControl = document.querySelector('video');
        if ('srcObject' in mediaControl) {
            mediaControl.srcObject = stream;
            mediaControl.style.display = "block";
            containerWidth = window.screen.width - document.querySelector('.container').offsetLeft;
            containerHeight = window.screen.height - document.querySelector('.container').offsetTop;
        } else {
            mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
            mediaControl.style.display = "block";
            containerWidth = window.screen.width - document.querySelector('.container').offsetLeft;
            containerHeight = window.screen.height - document.querySelector('.container').offsetTop;
        }
        theStream = stream;
    }, function(err) {
        alert('Error: ' + err);
    });
}

function takePhoto() {
    var mediaControl = document.querySelector('video');
        if ('srcObject' in mediaControl) {
            mediaControl.style.display = "none";
            containerWidth = window.screen.width - document.querySelector('.container').offsetLeft;
            containerHeight = window.screen.height - document.querySelector('.container').offsetTop;
        }

    if (!('ImageCapture' in window)) {
        alert("La capture d'image n'est pas disponible !");
        return;
    }

    if (!theStream) {
        alert("Il faut d'abord lancer le stream vidéo !");
        return;
    }
    var theImageCapturer = new ImageCapture(theStream.getVideoTracks()[0]);

    theImageCapturer.takePhoto()
        .then(megablob => {
            var theImageTag = document.getElementsByClassName("character")[0];
            theImageTag.src = URL.createObjectURL(megablob);
            theImageTag.style.height = "200px";
        })
        .catch(err => alert('Error: ' + err));
}