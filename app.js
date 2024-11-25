// app.js

// Function to fetch weather data based on the entered city
function getWeather() {
	const city = document.getElementById('city').value; // Get the city from the input field
	const errorElement = document.getElementById('error'); // Element to display errors
	const weatherCard = document.getElementById('weather-card'); // Weather card element
	const apiKey = 'ptNheDbj1KDxZGTY8dHBOQbAarULKCur'; // Replace with your OpenWeatherMap API key
  
	// If the city field is empty, show an error message
	if (city === '') {
	  errorElement.textContent = 'Please enter a city name';
	  return;
	}
  
	// OpenWeatherMap API URL with query parameters for city, units (metric for Celsius), and the API key
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
	// Fetch data from the OpenWeatherMap API
	fetch(url)
	  .then(response => {
		// Check if the response is OK (status 200)
		if (!response.ok) {
		  throw new Error('City not found');
		}
		return response.json(); // Parse the JSON response
	  })
	  .then(data => {
		// If successful, display the weather data
		errorElement.textContent = ''; // Clear any previous error message
		weatherCard.style.display = 'block'; // Show the weather card
  
		// Update the weather data in the weather card
		document.getElementById('city-name').textContent = data.name; // City name
		document.getElementById('description').textContent = data.weather[0].description; // Weather description
		document.getElementById('temperature').textContent = `${data.main.temp}°C`; // Temperature
		document.getElementById('humidity').textContent = data.main.humidity; // Humidity
		document.getElementById('wind-speed').textContent = data.wind.speed; // Wind speed
	  })
	  .catch(error => {
		// Handle errors (e.g., city not found, network issues)
		console.error('Error fetching the weather data:', error);
		errorElement.textContent = error.message; // Display the error message
		weatherCard.style.display = 'none'; // Hide the weather card if there was an error
	  });
  }
  