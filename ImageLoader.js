/******************************************************************************
 *                           ImageLoader.js
 * 
 * Repeatedly attempts to load an image and place it in the specified <div>.
 * (actually works on any tag) If unsuccessful, it will give-up after a while
 * and will instead show an error message in the <div>.
 *
 * Usage:
 *     loadImage("main_image", "http://example.com/images/examplePicture.png");
 * 
 *****************************************************************************/

// map to keep track of which tagNames have been loaded successfully
if (typeof successfullyLoaded == 'undefined') {
    var successfullyLoaded = new Array();
}

// starts the timers that attempt to periodically load the image
function loadImage(tagName, imageUrl) {
    
    // make sure tagName starts with a #
    var regex = /^#/;
    if (!regex.test(tagName)) {
        tagName = "#" + tagName;
    }
    
    // now that we have our proper tagName, we can initialize successfullyLoaded
    successfullyLoaded[tagName] = false;
    
    // try loading image every 200 ms
    imageLoader = setInterval(function() {
        loadImage_helper(tagName, imageUrl);
    }, 100);
    
    // if it hasn't loaded after 4 seconds, it's not going to.
    setTimeout(function() {
        clearInterval(imageLoader);
        if (successfullyLoaded[tagName] == false) {
            $(tagName).empty().html("Image failed to load.");
        }
    }, 4000);
};

// loads an image and puts it in the specified container
function loadImage_helper(tagName, imageUrl) {
    image = new Image();
    image.src = imageUrl;
    image.onload = function() {
        successfullyLoaded[tagName] = true;
        clearInterval(imageLoader);
        $(tagName).empty().append(image);
    };
};
