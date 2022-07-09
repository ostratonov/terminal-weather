#!/usr/bin/env node

const axios = require('axios')
const chalk = require('chalk')

const weatherApiUrl = 'http://api.weatherapi.com/v1/current.json'
const API_KEY = process.env.WEATHERAPI_KEY

const WEATHER_KEYS = ['temp_c','wind_kph', 'feelslike_c']
const WEATHER_KEYS_NORMALIZED = ['temperature (c)', 'wind speed (kph)', 'feels like (c)']

const transform = (response) => {
  const weatherInfo = response.data.current

  const result = {}

  WEATHER_KEYS.forEach( (key, idx) => {
    result[WEATHER_KEYS_NORMALIZED[idx]] = weatherInfo[key]
  })

  return result
}

const print = (weather) => {
  console.log(chalk.magentaBright('weather for now in kyiv: '))

  for ( const [attr, value] of Object.entries(weather)){
    console.log(chalk.magenta([attr, value].join(' : ')))
  }
}

;(async () => {
   await axios.get(weatherApiUrl,{
    params : {
      q : 'Kiev',
      key : API_KEY,
      aqicurrent : 'yes'
    }
  })
  .then(transform)
  .then(print)
  .catch(() => { 
    console.error('Oops, something went wrong...')
    process.exit(1)
  })
})()