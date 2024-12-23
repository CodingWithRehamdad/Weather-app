const request = require('request')


const geocode = (address, callback) => {

    const url = 'https://api.opencagedata.com/geocode/v1/json?q=' + encodeURIComponent(address) + '&key=f3c7f4e4b2d34f5b815855ab6b6c5cef'

    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location', undefined)
        } else if (response.body.results.length === 0) {
            callback('Unable to find the location', undefined)
        } else {
            callback(undefined, {
                Latitude: response.body.results[0].geometry.lat,
                Longitude: response.body.results[0].geometry.lng,
                Location: response.body.results[0].components.country
            })
        }
    })
}

module.exports = geocode;