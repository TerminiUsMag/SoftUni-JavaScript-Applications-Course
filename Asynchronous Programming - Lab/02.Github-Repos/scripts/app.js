function loadRepos() {
	const username = document.getElementById('username').value;
	console.log(username);
	fetch(`https://api.github.com/users/${username}/repos`)
		.then(handleResponse)
		.then(handleData)
		.catch(handleError);

	function handleResponse(response) {
		//console.log(response);
		if (response.ok == false) {
			throw new Error(response.status + ' '+ response.statusText);
		}
		return response.json();
	}

	function handleData(data) {
		//console.log(data);

		// <li>
		// 	<a href="{repo.html_url}">
		// 		{repo.full_name}
		// 	</a>
		// </li>
		const ul = document.getElementById('repos');
		const items = data.map(item => {
			const li = document.createElement('li');
			const a = document.createElement('a');
			a.setAttribute('href', item.html_url);
			a.textContent = `{${item.full_name}}`;
			li.appendChild(a);
			// ul.appendChild(li);
			return li;

		});

		ul.replaceChildren(...items);

	}

	function handleError(error) {
		const list = document.getElementById('repos');
		list.textContent = error.message;

	}
}