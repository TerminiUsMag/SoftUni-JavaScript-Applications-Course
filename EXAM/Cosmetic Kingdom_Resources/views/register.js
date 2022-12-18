import { register } from "../api/user.js";
import { html } from "../node_modules/lit-html/lit-html.js";

const registerTemplate = (onSubmit) => html`
<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form @submit=${onSubmit} class="register-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="#">Login</a></p>
        </form>
    </div>
</section>
`;

export function showRegister(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onSubmit)));

    async function onSubmit(data) {
        if (data.email == '' || data.password == '') {
            return alert('All fields are required!');
        }
        if (data.password != data['re-password']) {
            return alert('Passwords don\'t match');
         }
        await register(data.email, data.password);
        ctx.updateNav();
        ctx.page.redirect('/catalog');
    }
}
function createSubmitHandler(callback) {
    return function (event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        console.log(data);

        callback(data);
    }
}
