import { createProduct } from "../api/data.js";
import { html } from "../node_modules/lit-html/lit-html.js";

const createTemplate = (onCreate) => html`
<section id="create">
    <div class="form">
        <h2>Add Product</h2>
        <form @submit=${onCreate} class="create-form">
            <input type="text" name="name" id="name" placeholder="Product Name" />
            <input type="text" name="imageUrl" id="product-image" placeholder="Product Image" />
            <input type="text" name="category" id="product-category" placeholder="Category" />
            <textarea id="product-description" name="description" placeholder="Description" rows="5"
                cols="50"></textarea>

            <input type="text" name="price" id="product-price" placeholder="Price" />

            <button type="submit">Add</button>
        </form>
    </div>
</section>`;

export function showCreate(ctx) {
    ctx.render(createTemplate(createSubmitHandler(onCreate)))

    async function onCreate({ name, imageUrl, category, description }) {
        if (name == '' || imageUrl == '' || category == '' | description == '') {
            return alert('All fields are required!');
        }

        await createProduct({ name, imageUrl, category, description });
        ctx.page.redirect('/catalog');
    }
}
function createSubmitHandler(callback) {
    return function (event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        callback(data);
    }
}