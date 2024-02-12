// main.js

document.addEventListener('DOMContentLoaded', function () {
	// Get the button element
	const button = document.getElementById('myButton');

	// Add a click event listener to the button
	button.addEventListener('click', async function () {
		try {
			// Fetch the API route
			//const apiUrl = window.location.origin + '/api';
			const response = await fetch('/test/api');

			// Check if the response is successful
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			// Parse the JSON response
			const data = await response.json();

			// Clear any previous error message
			clearErrorMessage();

			// Create a table and display the data
			displayData(data);
		} catch (error) {
			// Display the error message
			displayErrorMessage(error.message);
		}
	});

	function displayData(data) {
		// Create a table element
		const table = document.createElement('table');

		// Create a table header row
		const headerRow = document.createElement('tr');

		// Add table headers for keys
		for (const key in data) {
			const th = document.createElement('th');
			th.textContent = key;
			headerRow.appendChild(th);
		}
		table.appendChild(headerRow);

		// Create a table row for values
		const valueRow = document.createElement('tr');

		// Add table data cells for values
		for (const key in data) {
			const td = document.createElement('td');
			td.textContent = data[key];
			valueRow.appendChild(td);
		}
		table.appendChild(valueRow);

		// Append the table to the document body
		document.body.appendChild(table);
	}

	function displayErrorMessage(message) {
		// Clear any previous error message
		clearErrorMessage();

		// Create a paragraph element to display the error message
		const errorMessage = document.createElement('p');
		errorMessage.textContent = `Error: ${message}`;

		// Append the error message to the document body
		document.body.appendChild(errorMessage);
	}

	function clearErrorMessage() {
		// Remove any existing error message from the document
		const errorMessage = document.querySelector('p');
		if (errorMessage) {
			errorMessage.remove();
		}
	}
});
