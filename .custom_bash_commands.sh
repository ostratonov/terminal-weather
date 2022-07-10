#!/bin/bash

#get current weather
function weather() { (
	set -e
	cd "set relative path here to weather.js here"
	./weather.js
) }

