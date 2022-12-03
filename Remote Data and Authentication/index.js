init();
const list = document.getElementById('comments');
document.getElementById('post').addEventListener('click', onPost);
document.getElementById('get').addEventListener('click', onGet);
list.addEventListener('click', onCommentClick);


function init() {
    onGet();
}
function onCommentClick(event) {

    if (event.target.tagName !== 'BUTTON') {

        return;
    }
    const parentEl = event.target.parentElement;
    if (event.target.name == 'edit') {
        onEdit(parentEl);
    }
    else if (event.target.name == `delete`) {
        if (confirm('Are you sure you want to delete this comment?')) {
            onDelete(parentEl.id);
        }
    }
    if (event.target.name == 'sendEdit') {
        sendEdit(parentEl)
    }

}
async function sendEdit(parentEl) {
    const name = parentEl.firstChild.childNodes[1].value;
    const content = parentEl.childNodes[2].childNodes[1].value;
    const _id = parentEl.id;

    const response = await fetch(`http://localhost:3030/jsonstore/comments/` + _id, {
        method: 'put',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, content, _id })
    })
    const data = await response.json();
    onGet();
}
function onEdit(el) {
    const name = (el.firstChild.firstChild.textContent);
    el.firstChild.remove();
    const content = (el.childNodes[1].firstChild.textContent);

    el.innerHTML = `<label>Name: <input type="text" name="name" value = "${name}"></label>
    <label>Comment: <textarea name="content">${content}</textarea></label> <button name="sendEdit">Send</button> `;

}
async function onDelete(id) {
    await fetch(`http://localhost:3030/jsonstore/comments/${id}`, {
        method: 'delete'
    });
    document.getElementById(id).remove();
}
async function onPost() {
    const name = document.querySelector('[name = "name"]').value;
    document.querySelector('[name = "name"]').value = '';
    const content = document.querySelector("[name = 'content']").value;
    document.querySelector("[name = 'content']").value = '';
    const response = await fetch(`http://localhost:3030/jsonstore/comments`, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, content })
    });
    const data = await response.json();
    console.log(data);
    const comment = Object.values(data);
    list.prepend(createCommentCard(data));
}
async function onGet() {

    const response = await fetch(`http://localhost:3030/jsonstore/comments`);
    const data = await response.json();
    const comments = (Object.values(data).reverse());
    displayComments(comments);
}
function createCommentCard(comment) {
    const element = document.createElement('article');
    element.innerHTML = `<header><h3>${comment.name}</h3></header>
    <main><p>${comment.content}</p></main>
    <button name = "delete">Delete</button>
    <button name = "edit">Edit</button>`;
    element.id = comment._id;

    return element
}
function displayComments(comments) {

    list.replaceChildren(...comments.map(createCommentCard));
}