# weather-journal-app
this application created using 
* node js 
* express js
* openWeatherMap api 
### client side code
there is an **asynchronous functions** first one interacts with [weather api](https://openweathermap.org/api) to get data from it like temperature,
second function is to post this data to server and the third function is to get back data from server and display it in the user interface.
this three functions calles only when the user enter values of *zip code* and *feelings* and then click enter.
### server side code
server recive data from app.js file, and insert this data in an *object* then return this data again to app.js file using get route
##### user enter zip code and his feelings then temperature, date and feelings display to him.
