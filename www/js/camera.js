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
        var results = document.getElementById("thumbnails");
        var li  = document.createElement("li");
        var img = document.createElement("img");

        li.classList.add('thumbnail');
        img.src = "data:image/jpeg;base64," + imageData;

        li.appendChild(img);
        results.appendChild(li);
    },

    _onFail: function(message) {
        alert(message);
    }
}
