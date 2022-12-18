import { logout } from "../api/user.js";
import { getUserData } from "../api/util.js";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { default as page } from '../node_modules/page/page.mjs';

const naviParent = document.querySelector('header');
const navTemplate = (user) => html`
<!-- Navigation -->
<a id="logo" href="/"
          ><img id="logo-img" src="./images/logo.png" alt=""
        /></a>

        <nav>
          <div>
            <a href="/catalog">Products</a>
          </div>

          ${!user
            ?html`<div class="guest">
            <a class="guest" href="/login">Login</a>
            <a class="guest" href="/register">Register</a>
          </div>`
          :html`<div class="user">
            <a href="/create">Add Product</a>
            <a @click = ${onLogout} href="#">Logout</a>
          </div>`}
        </nav>`;

        export function updateNav(){
            const user = getUserData();
            render(navTemplate(user),naviParent);
        }
        function onLogout(event){
            event.preventDefault();
            logout();
            updateNav();
            page.redirect('/catalog');
        }
        