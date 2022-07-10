# terminal-weather

## bash terminal command, which shows you current weather in kyiv 🇺🇦

### usage :

1. register and get your api-key from https://www.weatherapi.com, it's free, don't worry
2. run in project directory
```sh
npm i
```
3. run 
```sh
chmod u+x weather.js
``` 
4. create `.env` file and set api key, like in `.env.example`
5. edit `custom_bash_commands.sh`, set directory to your `weather.js` file 
6. add to your ~/.bashsrc next command: 
```sh
source ~/.custom_bash_commands.sh
```

### you're set!
now simply type `weather` in your terminal, and you'll get information!
