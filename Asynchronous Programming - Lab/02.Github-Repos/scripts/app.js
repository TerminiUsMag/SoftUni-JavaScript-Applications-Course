function loadRepos() {
	const username = document.getElementById('username').value;
	console.log(username);
	fetch(`https://api.github.com/users/${username}/repos`)
		.then(handleResponse)
		.then(handleData)
		.catch(handleError);

	function handleResponse(response) {
		console.log(response);
		if (response.ok === false) {
			throw new Error(response.status);
		}
		response.json();
	}

	function handleData(data) {

	}

	function handleError(error) {

	}
}