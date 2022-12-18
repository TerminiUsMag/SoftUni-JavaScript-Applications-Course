import * as api from './api/user.js';
import { default as page } from './node_modules/page/page.mjs';
import { render, html, nothing } from './node_modules/lit-html/lit-html.js';
import { showHome } from './views/home.js';

const main = document.getElementById('content');

page(decorateContext);
page('/index.html', '/');
page('/', showHome);
page('/catalog', () => console.log('catalog'));
page('/catalog/:id', () => console.log('details'));
page('/edit/:id', () => console.log('edit'));
page('/create', () => console.log('create'));
page('/login', () => console.log('login'));
page('/register', () => console.log('register'));
//page('/logout', () => console.log('logout'));

page.start();

function decorateContext(ctx, next) {
    //console.log('decorator');
    ctx.render = renderMain;
    //console.log(ctx.render);

    next();
}
function renderMain(content) {
    render(content, main);
}