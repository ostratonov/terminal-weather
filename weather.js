#!/usr/bin/env node

'use strict'

require('dotenv').config()
const axios = require('axios')
const chalk = require('chalk')

const weatherApiUrl = 'http://api.weatherapi.com/v1/current.json'
const API_KEY = process.env.WEATHERAPI_KEY

const WEATHER_KEYS = ['temp_c','wind_kph', 'feelslike_c']
const WEATHER_KEYS_NORMALIZED = ['temperature (c)', 'wind speed (kph)', 'feels like (c)']

const transform = (response) => {
  const weatherInfo = response.data.current

  const weather = {}
  const airCondition = {}

  WEATHER_KEYS.forEach( (key, idx) => {
    weather[WEATHER_KEYS_NORMALIZED[idx]] = weatherInfo[key]
  })

  airCondition.airQuality = weatherInfo.air_quality['us-epa-index']

  return {
    weather,
    airCondition,
  }
}

const getUsIpaIndexColor = airQuality => {
  const qualityMap = {
    'green' : [1,2],
    'yellow' : [3,4],
    'red' : [5,6],
  }

  const qualityIndex = Object.values(qualityMap).findIndex(level => level.includes(airQuality))

  return Object.keys(qualityMap)[qualityIndex] || 'grey'
}

const print = (result) => {
  console.log(chalk.magentaBright('weather for now in kyiv: '))

  for ( const [attr, value] of Object.entries(result.weather)){
    console.log(chalk.magenta([attr, value].join(' : ')))
  }

  for ( const [attr, value] of Object.entries(result.airCondition)){
    console.log(chalk[getUsIpaIndexColor(value)]([attr, value].join(' : ')))
  }
}

;(async () => {
   await axios.get(weatherApiUrl,{
    params : {
      q : 'Kiev',
      key : API_KEY,
      aqi : 'yes',
    }
  })
  .then(transform)
  .then(print)
  .catch((e) => { 
    console.error('Oops, something went wrong...', e.toString())
    process.exit(1)
  })
})()