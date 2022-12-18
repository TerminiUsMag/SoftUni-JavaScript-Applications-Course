import { get, post } from "./api.js";

export async function getAllProducts() {
    ///data/products?sortBy=_createdOn%20desc
    const result = await get('/data/products?sortBy=_createdOn%20desc');
    return result;
}

export async function getOneProductById(id) {
    // /Method: GET
    //URL: /data/products/:id

    const result = await get('/data/products/' + id);
    return result;

}

export async function createProduct(productData) {
    return post('/data/products', productData)
}