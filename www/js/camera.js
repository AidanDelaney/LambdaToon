// Taken from the Cordova API examples
function cameraApp(){}

cameraApp.prototype={
    _pictureSource: null,

    _destinationType: null,

    run: function(){
        var that=this;
        that._pictureSource = navigator.camera.PictureSourceType;
        that._destinationType = navigator.camera.DestinationType;
        id("capturePhotoButton").addEventListener("click", function(){
            that._capturePhoto.apply(that,arguments);
        });
    },

    _capturePhoto: function() {
        var that = this;

        // Take picture using device camera and retrieve image as base64-encoded string.
        navigator.camera.getPicture(function(){
            that._onPhotoDataSuccess.apply(that,arguments);
        },function(){
            that._onFail.apply(that,arguments);
        },{
            quality: 50,
            destinationType: that._destinationType.DATA_URL
        });
    },

    _onPhotoDataSuccess: function(imageData) {
        var results = id('results');
        var smallImage = document.createElement("img");
        smallImage.style.display = 'block';
        smallImage.style.width  = '120px';
        smallImage.style.height = '120px';

        // Show the captured photo.
        smallImage.src = "data:image/jpeg;base64," + imageData;
        results.appendChild(smallImage);
    },

    _onFail: function(message) {
        alert(message);
    }
}
