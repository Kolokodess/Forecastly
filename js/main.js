if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
		var lat = position.coords.latitude;
		var long = position.coords.longitude;
		var corsUrl = "https://cors-anywhere.herokuapp.com/"
		var apiKey = "b957b35d837a7435ccd78c535af289ed";
		var api = "https://api.darksky.net/forecast/";
		var url = corsUrl + api + apiKey + "/" + lat + "," + long  + "?daily";

		//make farenheit temperature default temperature upon page load

		var tempFahrenheit = true;

		//array to calculate each unit once and flip whenever user pleases
		var temperature = {
			fahrenheit: [],
			celsius:[]
		};

		function inputData(array){
			//assigns either F or C to temperature unit

			var tempUnit = tempFahrenheit ? "&deg;F" : "&deg;C";

			return $.each(array,function(index, value) {
				$('.temp' + index).html(value + tempUnit);
			});
		}

		$('.convertTemp').click(function() {
			tempFahrenheit =!tempFahrenheit;

			if (tempFahrenheit) {
				inputData(temperature.fahrenheit);
			} else {
				inputData(temperature.celsius);
			}
		});


		$.getJSON(url, function(json) {
			//shows the following weather info

			var fahrenheitTemp;
			var celsiusTemp;
			var tempData;
			var icon;
			var forecast;
			var day;
			var date;

			//loop through the array for the different days

			for (i = 0; i < json.daily.data.length; i++) {
				fahrenheitTemp = Math.round(json.daily.data[i].apparentTemperatureMax);
				celsiusTemp = Math.round((fahrenheitTemp - 32)/1.8);

				temperature.celsius.push(celsiusTemp);
				temperature.fahrenheit.push(fahrenheitTemp);

				//display appropriate icon upon load on page

				icon = json.daily.data[i].icon;
				$('.icon' + i).html("<i class='wi wi-forecast-io-" + icon + "'></i>");

				//display abrieved data and display on page

				forecast = json.daily.data[i].summary;
				$('.forecast' + i).html(forecast);

				//display day and date on page

				day = moment().add(i, "day").format("ddd");
				$('.day' + i).html(day);


				date = moment().add(i, "day").format("Do");
				$('.date' + i).html(date);
			} 

			//display temperature data on page
			inputData(temperature.fahrenheit);
	});

		//To get user's location using google maps API

		var googleMapsAPIKey = "AIzaSyCH2BPbBsLP25LfNlqo3C_Hp_QswPc1fsY";

		var googleMapsUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";

		var userAddress = googleMapsUrl + lat + "," + long + "&key=" + googleMapsAPIKey;

		/*var searchUrl = */
		var location;

		$.getJSON(userAddress, function(json) {
			for (i = 0; i <json.results.length; i++) {
				location = json.results[1].formatted_address;
				$('.location').html(location);
			}
		});


		//display current time, date, month , year

		var dateTimeString = moment().format("LT");
		$('.time').html(dateTimeString);

		var date = moment().format("Do");
		$('.date').html(date);

		var month = moment().format("MMMM");
		$('.month').html(month);

		var year = moment().format("YYYY");
		$('.year').html(year);

	});
}


	/*$.getJSON(fullURL, function(json) {
			// Display weather information

			var fahrenheitTemp;
			var celsiusTemp;
			var tempData;
			var icon;
			var desc;
			var dayName;
			var dayNum;

			// Set up the loop to go through the daily array
			for (i = 0; i < json.daily.data.length; i++) {
				// Format temp data
				fahrenheitTemp = Math.round(json.daily.data[i].apparentTemperatureMax);
				celsiusTemp = Math.round((fahrenheitTemp - 32) / 1.8);*/