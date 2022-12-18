
import { default as page } from './node_modules/page/page.mjs';
import { render, html, nothing } from './node_modules/lit-html/lit-html.js';
import { showHome } from './views/home.js';
import { showCatalog } from './views/catalog.js';
import { showDetails } from './views/details.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { logout } from './api/user.js';
import { updateNav } from './views/nav.js';
import { getUserData } from './api/util.js';
import { showCreate } from './views/create.js';

const main = document.getElementById('main');

//document.getElementById('logoutBtn').addEventListener('click',onLogout);

page(decorateContext);
page('/index.html', '/');
page('/', showHome);
page('/catalog', showCatalog);
page('/catalog/:id', showDetails);
page('/edit/:id', () => console.log('edit'));
page('/create', showCreate);
page('/login', showLogin);
page('/register', showRegister);
//page('/logout', () => console.log('logout'));

updateNav();
page.start();

function decorateContext(ctx, next) {
    //console.log('decorator');
    ctx.render = renderMain;
    //console.log(ctx.render);
    ctx.updateNav = updateNav;

    const user = getUserData();
    if (user) {
        ctx.user = user;
    }

    next();
}
function renderMain(content) {
    render(content, main);
}
//function onLogout(event){
//    event.preventDefault();
//    logout();
 //   page.redirect('/catalog');
//}