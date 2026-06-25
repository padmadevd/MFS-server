import { prisma } from '../db/db.js'

class ProductService{

    // returns list of products based on the filter as json.
    async getProducts(tx, filter)
    {
        filter = {
            tags : ["t-shirt", "blue", "vintage"],
            size : "",
            price : ["more", 100.29],
            stock : ["less", 100],
            sort : {
                price : "ascending",
                stock : "descending",
                arrival : "none"
            }
        }
    }

    // returns product's id, name, description, images(urls) as json.
    async getProductData(tx, productId)
    {

    }

    // returns product's variations, tags as json.
    async getProductDataInner(tx, productId)
    {

    }

    // create a new product, return its id.
    async addProduct(tx, name, description, tags)
    {

    }

    // add a new tag to product.
    async addProductTags(tx, productId, tags)
    {

    }

    // remove tags from product.
    async removeProductTags(tx, productId, tags)
    {

    }

    // add product images.
    async addProductImages(tx, productId, images)
    {

    }

    // remove product images.
    async removeProductImages(tx, productId, images)
    {

    }

    // return variation's id, name, size, price, stock.
    async getVariationData(tx, variationId)
    {

    }

    // return new variation's id.
    async addVariation(tx, productId, name, size, price)
    {

    }

    // update variation with new data.
    async updateVariation(tx, variationId, name, size, price)
    {

    }

    // remove variation.
    async removeVariation(tx, variationId)
    {

    }

    // add extra stocks to a variation.
    async addStocks(tx, variationId, stock)
    {

    }

    // reduce stock from a variation.
    async reduceStocks(tx, variationId, stock)
    {

    }

    async getAllTags(tx, search)
    {
        
    }

    async getAllSizes(tx)
    {

    }
}

const productService = new ProductService();
export {productService};