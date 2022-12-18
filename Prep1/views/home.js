import { html, render } from "../node_modules/lit-html/lit-html.js";

const homeTemplate = () => html`
<!--Welcome Page-->
<section class="welcome-content">
    <article class="welcome-content-text">
        <h1>We Care</h1>
        <h1 class="bold-welcome">Your Pets</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
    </article>
    <article class="welcome-content-image">
        <img src="./images/header-dog.png" alt="dog">
    </article>
</section>`;

export function showHome(ctx) {
    //console.log('hey');
    ctx.render(homeTemplate());
}
//const main = document.getElementById('content');
//render(homeTemplate(),main)