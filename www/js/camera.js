// Taken from the Cordova API examples
function cameraApp(){}

cameraApp.prototype={
    _pictureSource: null,

    _destinationType: null,

    gallery: function(gallery){
        this._gallery = gallery;
    },

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
        var li  = document.createElement("li");
        var a   = document.createElement("a");
        var img = document.createElement("img");
        var uuid = generateUUID();

        //a.href = '#' + uuid;
        // complete and total hack
        a.href = "data:image/jpeg;base64," + imageData;
        a.classList.add('thumb');

        // Show the captured photo.
        img.id  = uuid;
        img.src = "data:image/jpeg;base64," + imageData;

        a.appendChild(img);
        li.appendChild(a);
        this._gallery.insertImage(li.outerHTML, this._gallery.data.length);
    },

    _onFail: function(message) {
        alert(message);
    }
}
