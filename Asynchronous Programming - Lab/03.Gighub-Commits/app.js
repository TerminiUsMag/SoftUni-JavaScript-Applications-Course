function loadCommits() {
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;

    fetch(`https://api.github.com/repos/${username}/${repo}/commits`)
        .then(handleResponse)
        .then(handleData)
        .catch(handleError);

    function handleResponse(response) {
        //console.log(response);
        if (response.ok == false) {
            throw new Error(response.status);
        }
        return response.json();
    }
    function handleData(data) {
        //console.log(data);

        const list = document.getElementById('commits');
        // list.replaceChildren();
        // for (let item of data) {
        //     const li = document.createElement('li');
        //     li.textContent = `${item.commit.author.name}: ${item.commit.message}`;
        //     list.appendChild(li);

        // }
        const items = data.map(item=>{
            const li = document.createElement('li');
            li.textContent = `${item.commit.author.name}: ${item.commit.message}`;
            return li;
        });
        //console.log(items);
        list.replaceChildren(...items);

    }
    function handleError(error) {
        const list = document.getElementById('commits');
        const li = document.createElement('li');
        li.textContent = `Error: ${error.message} (Not Found)`;

        list.replaceChildren(li);

    }
}