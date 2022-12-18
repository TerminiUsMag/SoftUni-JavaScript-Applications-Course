import { del } from "../api/api.js";
import { getOneProductById } from "../api/data.js";
import { html } from "../node_modules/lit-html/lit-html.js";
import { default as page } from '../node_modules/page/page.mjs';

const detailsTemplate = (product, creator) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src="${product.imageUrl}" alt="example1" />
        <p id="details-title">${product.name}</p>
        <p id="details-category">
            Category: <span id="categories">${product.category}</span>
        </p>
        <p id="details-price">
            Price: <span id="price-number">${product.price}</span>$</p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Bought: <span id="buys">0</span> times.</h4>
                <span>${product.description}.</span>
            </div>
        </div>
        ${creator
        ? html`
        <div id="action-buttons">
            <a href="/edit/${product._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="#" class="${product._id}" id="delete-btn">Delete</a>` : ``}`;

export async function showDetails(ctx) {
    //console.log(ctx.params.id);
    const productId = ctx.params.id;
    const details = await getOneProductById(productId);
    const productOwner = details._ownerId;
    let creator = false;
    if (ctx.user) {
        const userId = ctx.user._id;
        if (userId == productOwner) {
            creator = true;
        }
    }
    ctx.render(detailsTemplate(details, creator));
}

async function onDelete(event) {
    event.preventDefault();
    const id = event.target.getAttribute('class');
    const uSure = confirm('Are you sure you want to delete this product?');
    if (uSure) {
        const result = del('/data/products/' + id);
        page.redirect('/catalog');
    }
}
