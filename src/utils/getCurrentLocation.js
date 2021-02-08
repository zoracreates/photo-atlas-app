function getCurrentLocation  (handleSuccess, handleError) {
    window.navigator.geolocation.getCurrentPosition(
        position => handleSuccess(position),
        err => handleError(err)
    );
}

export default getCurrentLocation;