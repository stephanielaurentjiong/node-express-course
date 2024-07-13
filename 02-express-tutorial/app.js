const express = require('express')
const app = express()
const { products } = require('./data');

// const fetchProductsBtn = document.getElementById('fetchProductsBtn');
// const productListDiv = document.getElementById('productList');

app.use(express.static('./public'))

app.get('/api/v1/products', (req, res) => {
    res.json(products); // Assuming 'products' is your array of products
});

app.get('/api/v1/test', (req, res) => {
    res.json({message : "It worked!"}); //send JSON response to the client in a javascript object ({message : "It worked!"}) into JSON.
});

app.get('/api/v1/products/:productID', (req, res) => { //productID is a parameter. When server receives GET request for a URL "/api/v1/products/7", the req.params will have the hash { productID: 7 }

    //query params are always passed as strings, need to convers into integer  
    const idToFind = parseInt(req.params.productID);
    
    const product = products.find((p) => p.id === idToFind);

    if(!product) {
        return res.status(404).send('Product does not exist')
    }

    return res.json(product);

    // console.log(req.params)
    // res.json(req.params);
})

app.get('/api/v1/query', (req, res) => {
    // console.log(req.query) // return {}


    const { search, limit, price } = req.query;
    let sortedProducts = [...products]; //created a copy of products n new copy of array is assgined to so sortedProducts

    if(search) {
        sortedProducts = sortedProducts.filter((product)=>{
            return product.name.startsWith(search)
        })
    }

    if(limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit)) //get the sortedProduct's array, and slice the index start from index 0, until the limit number is requested
    }
    
    if(price) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.price <= Number(price);
        })
    }
    res.status(200).json(sortedProducts)
})

app.all('*', (req, res) => {
    res.status(404).send('<h1>Not found</h1>')
})

app.listen(3000, () => {
    console.log("server is listening on port 3000")
})


