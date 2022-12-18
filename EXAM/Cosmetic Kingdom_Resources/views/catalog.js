import { getAllProducts } from "../api/data.js";
import { html } from "../node_modules/lit-html/lit-html.js";

const catalogTemplate = (products) => html`
<h2>Products</h2>
<section id="dashboard">

    ${products.length == 0
        ? `<h2>No products yet.</h2>`
        : products.map(productTemplate)}
    
`;

const productTemplate = (product) => html`
<div class="product">
    <img src=${product.imageUrl} alt="example1" />
    <p class="title">${product.name}</p>
    <p><strong>Price:</strong><span class="price">${product.price}</span>$</p>
    <a class="details-btn" href="/catalog/${product._id}">Details</a>
</div>`;

export async function showCatalog(ctx) {
    const products = await getAllProducts();
    ctx.render(catalogTemplate(products));

}