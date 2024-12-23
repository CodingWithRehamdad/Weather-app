const request = require('request')

const forecast = (Latitude, Longitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=6c1ec74e21eee139d519d53b8b860a7c&query='+ Latitude +','+ Longitude +'&units=f'

    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (response.body.error) {
            callback('Unable to find Location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ' .It is currently '+ response.body.current.temperature, 'degrees. But it Feels Like '+ response.body.current.feelslike + ' Degree')
        }
    })
}

module.exports = forecast;