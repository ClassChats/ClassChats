
/**
 * Set up the Geolocation API. Show appropriate error messages to the user.
 */
function setUpGeolocation() {
    if ('geolocation' in navigator) {
        console.log('Geolocation available.');
    }
}


/**
 * Get a high-accuracy reading of the user's location.
 * 
 * @param successCallback A function called if getting the geolocation succeeds
 */
function getGeolocation(successCallback) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            currentLatitude = position.coords.latitude;
            currentLongitude = position.coords.longitude;
            successCallback(position);
        },
        (err) => {
            console.error('Error getting location. Error code: ' + err.code + '. Error message:\n' + err.message);
            
            // Let the user know what happened
            if (err.code === err.PERMISSION_DENIED) {
                console.log('You must allow access to your location.');
                return;
            }
            if (err.code === err.POSITION_UNAVAILABLE) {
                console.log('Could not get your position, please try again.');
            }
        },
        {
            enableHighAccuracy: true,
        },
    );
}
