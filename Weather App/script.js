document.addEventListener('DOMContentLoaded', function() {
    async function getWeather(city) {
        const encodedCity = encodeURIComponent(city); 
        const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${encodedCity}`;
        
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '91862230c7msha13286d74f10ac0p164d7ejsn41e6c8472a88',
                'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();  

            if (result.error) {
                console.error(result.error.message);
                alert(`Error: ${result.error.message}`);
            } else {
                document.getElementById('cityname').textContent = result?.location?.name || "Unknown";
                document.getElementById('temperature2').textContent = result?.current?.temp_c || "N/A";
                document.getElementById('temperature').textContent = (result?.current?.temp_c || "N/A") + " °C";
                document.getElementById('max_temp').textContent = (result?.current?.temp_c || "N/A") + " °C"; 
                document.getElementById('min_temp').textContent = (result?.current?.temp_c || "N/A") + " °C"; 
                document.getElementById('humidity2').textContent = result?.current?.humidity || "N/A";
                document.getElementById('cloud_pct').textContent = result?.current?.cloud || "N/A";
                document.getElementById('feels_like').textContent = (result?.current?.feelslike_c || "N/A") + " °C";
                document.getElementById('humidity').textContent = (result?.current?.humidity || "N/A") + " %";
                document.getElementById('wind_speed2').textContent = result?.current?.wind_kph || "N/A";
                document.getElementById('wind_speed').textContent = (result?.current?.wind_kph || "N/A") + " Km/h";
                document.getElementById('wind_degree').textContent = result?.current?.wind_degree || "N/A";
                document.getElementById('sunrise').textContent = "N/A";  
                // document.getElementById('sunset').textContent = "N/A";  
            }

        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data');
        }
    }

    
    async function updateAnotherPlacesWeather() {
        const cities = ['Darjeeling', 'Goa', 'Hyderabad', 'Shimla', 'Bangalore', 'Manali'];
        const tbody = document.querySelector('tbody');  

      
        tbody.innerHTML = '';

        for (const city of cities) {
            const encodedCity = encodeURIComponent(city);
            const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${encodedCity}`;

            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '91862230c7msha13286d74f10ac0p164d7ejsn41e6c8472a88',
                    'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
                }
            };
             try {
                const response = await fetch(url, options);
                const result = await response.json();  

                if (!result.error) {
                    const row = `
                      <tr>
                        <th scope="row" class="text-start">${result?.location?.name || "Unknown"}</th>
                        <td>${result?.current?.cloud || "N/A"}</td>
                        <td>${result?.current?.feelslike_c || "N/A"} °C</td>
                        <td>${result?.current?.humidity || "N/A"} %</td>
                        <td>${result?.current?.temp_c || "N/A"} °C</td>
                        <td>${result?.current?.temp_c || "N/A"} °C</td>
                        <td>N/A</td>
                        <td>N/A</td>
                        <td>${result?.current?.temp_c || "N/A"} °C</td>
                        <td>${result?.current?.wind_degree || "N/A"}</td>
                        <td>${result?.current?.wind_kph || "N/A"} Km/h</td>
                      </tr>
                    `;
                    tbody.innerHTML += row;
                }
            } catch (error) {
                console.error(`Error fetching weather for ${city}:`, error);
            }
        }
    }  
    document.getElementById('submit').addEventListener('click', function(event) {
        event.preventDefault(); 
        const city = document.getElementById('city').value;  
        if (city) {
            getWeather(city); 
        } else {
            alert('Please enter a city name');
        }
    });
    updateAnotherPlacesWeather();
});


