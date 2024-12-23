const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./Utils/geocode')
const forecast = require('./Utils/forecast')
const port = 4000

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebar engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setep a static directory for templating
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Raheem'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Raheem'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        content: 'This the help page content, challenged by Andrew Mead',
        name: 'Raheem'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide the address'
        })
    }
    
    geocode(req.query.address, (error, {Latitude, Longitude, Location} = {}) => {
        if (error) {
            return res.send({ error })  // Return here to stop further execution
        }

        // const { Latitude, Longitude, Location } = data  // Destructure data object

        forecast(Latitude, Longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })  // Return here to stop further execution
            }

            res.send({
                forecast: forecastData,
                Location,
                address: req.query.address
            })
        })
    })
})

      
    //       res.send({
    //         forecast: 'It is snowing',
    //         location: 'lahore',
    //         address: req.query.address
    //   });
// })

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide the right Search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Raheem',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: ' Raheem',
        errorMessage: 'Page not found.'
    })
})


app.listen(port, (req, res) => {
    console.log(`App is listening at Port ${port}`)
})