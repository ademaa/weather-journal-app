/* Global Variables */
//unit equals metric to convert temp to celsius
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric';
const apiKey = '&appid=e0b55e9b8dac9f16083905d7b6b48661&zip=';
// Create a new date instance dynamically with JS
let d = new Date();
//add one to getMonth() to make it count from 1-12, not from 0-11
let newDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();

/* performeAction function get values of feelings,zip text that user enter, and
concatenate zip text to api url, then call addPost function to return data to server,
 then call updateUi function to insert data from server to user interface*/
const performeAction = () => {
  const content = document.getElementById('feelings').value;
  let zip = document.getElementById('zip').value;
  weatherAsync(`${apiUrl}${apiKey}${zip}`)
    .then(function(data) {
      addPost('/weatherData', {
        temp: data.main.temp,
        content: content,
        date: newDate
      })
      updateUi();
    });
}

// when click on buttom with id generate call performeAction function
document.getElementById('generate').addEventListener('click', performeAction);

/*asynchronous function get openweathermap API and wait until fetch it,
if API is ready try using it's data in json , if not print in console the error that acquires
*/
const weatherAsync = async (url) => {
  const res = await fetch(url);
  //if ready recive date from API or print error that acquires
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
//take date from API and return it to the server-side by typing the route in url paramter
const addPost = async (url = '', data = {}) => {
  //wait to fetch the route of server
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
//if ready return data to server or print error that acquires
  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log(error);
  }
}
//this function is to recive date from server and update user interface by this data
const updateUi = async () => {
  //wait to get data from server
  const req = await fetch('/weatherData');
  //get elements by it's id and display data recived from server on it
  try {
    const recivedData = await req.json();
    document.getElementById('temp').innerHTML = `<i class="fas fa-thermometer-half"></i> ${recivedData.temp}`;
    document.getElementById('content').innerHTML = `<i class="far fa-smile"></i> ${recivedData.content}`;
    document.getElementById('date').innerHTML = `<i class="fas fa-calendar-alt"></i> ${recivedData.date}`;
  } catch (error) {
    console.log(error);
  }
}
