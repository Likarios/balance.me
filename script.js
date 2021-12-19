// ##########################################################################################################
// Functions and variables for the image touch grabing
// ##########################################################################################################

// Variables to get the container size
var containerWidth = window.screen.width - document.querySelector('.container').offsetLeft;
var containerHeight = window.screen.height - document.querySelector('.container').offsetTop;

// Select all elements with a certain class and make them draggable
var elements = document.querySelectorAll('.character');
[].forEach.call(elements, function(element) {
    element.ontouchstart = element.onmspointerdown = startDrag;
    element.style.position = 'absolute';
});

// Function called once when an element is being dragged.
// It is not called again until the user drops the element and drag it again
function startDrag(e) {
    // If the element has collided with a border since it is being dragged
    var hasBeenHurt = false;
    this.ontouchmove = this.onmspointermove = moveDrag;

    this.ontouchend = this.onmspointerup = function() {
        this.ontouchmove = this.onmspointermove = null;
        this.ontouchend = this.onmspointerup = null;
    }

    var pos = [this.offsetLeft, this.offsetTop];
    var origin = getCoors(e);

    // Function called every frame to update the position of the element to the position of the user's finger
    function moveDrag(e) {
        // If the element collides with at least one border
        var hurt = false;
        var currentPos = getCoors(e);
        var deltaX = currentPos[0] - origin[0];
        var deltaY = currentPos[1] - origin[1];
        var newLeft = pos[0] + deltaX;
        var newTop = pos[1] + deltaY;
        if (newLeft > 0 && newLeft < containerWidth - this.width) {
            this.style.left = newLeft + 'px';
        } else {
            hurt = true;
        }
        if (newTop > 0 && newTop < containerHeight - this.height) {
            this.style.top = newTop + 'px';
        } else {
            hurt = true;
        }
        if(!hurt) {
            // The collision is reset if no border has been collided with the element this frame
            hasBeenHurt = false;
        }
        // If the element has not collided since it is being dragged and if it is currently colliding
        if(hurt && !hasBeenHurt) {
            // Call to a notification
            getHurt();
            hasBeenHurt = true;
        }
        return false;
    }

    // Get the coordinates on screen of one touchable element
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

// ##########################################################################################################
// Functions and variables for the notification pushing when the character is hurt
// ##########################################################################################################

function getHurt() {
    persistentNotification();
}

function requestPermission() {
    if (!('Notification' in window)) {
        alert('Notification API not supported!');
        return;
    }
}

function persistentNotification() {
    if (!('Notification' in window) || !('ServiceWorkerRegistration' in window)) {
        alert('Persistent Notification API not supported!');
        return;
    }

    try {
        navigator.serviceWorker.getRegistration()
            .then((reg) => reg.showNotification("Aïe, tu me fais mal !"))
            .catch((err) => alert('Service Worker registration error: ' + err));
    } catch (err) {
        alert('Notification API error: ' + err);
    }
}

// ##########################################################################################################
// Functions and variables for the image tilting based on phone orientation
// ##########################################################################################################

// Get the event listener on the device orientation
if ('DeviceOrientationEvent' in window) {
    window.addEventListener('deviceorientation', deviceOrientationHandler, false);
} else {
    document.getElementsByClassName('container')[0].innerText = 'Device Orientation API not supported.';
}

// Get the image and apply orientation
function deviceOrientationHandler(eventData) {
    var tiltLR = eventData.gamma;
    var logo = document.getElementsByClassName("character");
    logo[0].style.transform = "rotate(" + tiltLR + "deg)";
}

// ##########################################################################################################
// Functions and variables for the camera capture
// ##########################################################################################################

// Ask the persmission to access camera and return the stream
function getUserMedia(options, successCallback, failureCallback) {
    var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (api) {
        return api.bind(navigator)(options, successCallback, failureCallback);
    }
}

// The variable which will hold the captured stream
var theStream;

function getStream() {
    if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
        !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
        alert('User Media API not supported.');
        return;
    }

    // The options of the stream
    var constraints = {
        video: true
    };

    // Use the previous function to get the stream
    getUserMedia(constraints, function(stream) {
        var mediaControl = document.querySelector('video');
        if ('srcObject' in mediaControl) {
            mediaControl.srcObject = stream;
        } else {
            mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
        }
        mediaControl.style.display = "block";
        containerWidth = window.screen.width - document.querySelector('.container').offsetLeft;
        containerHeight = window.screen.height - document.querySelector('.container').offsetTop;
        theStream = stream;
    }, function(err) {
        alert('Error: ' + err);
    });
}

function takePhoto() {
    // Get the video frame and hide it
    var mediaControl = document.querySelector('video');
        if ('srcObject' in mediaControl) {
            mediaControl.style.display = "none";
            containerWidth = window.screen.width - document.querySelector('.container').offsetLeft;
            containerHeight = window.screen.height - document.querySelector('.container').offsetTop;
        }

    // Check if the window has allowed the stream
    if (!('ImageCapture' in window)) {
        alert("La capture d'image n'est pas disponible !");
        return;
    }

    // Check if the stream has captured yet
    if (!theStream) {
        alert("Il faut d'abord lancer le stream vidéo !");
        return;
    }

    // Initialize the image cpature class with the running stream
    var imageCapturer = new ImageCapture(theStream.getVideoTracks()[0]);

    // Apply the capture to the image and resize it
    imageCapturer.takePhoto()
        .then(megablob => {
            var imageToReplace = document.getElementsByClassName("character")[0];
            imageToReplace.src = URL.createObjectURL(megablob);
            imageToReplace.style.height = "200px";
        })
        .catch(err => alert('Error: ' + err));
}