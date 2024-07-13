const express = require('express')
const app = express()
const { products } = require('./data');
const peopleRouter = require('./routes/people')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('./methods-public'))
app.use('/api/v1/people', peopleRouter)

// const fetchProductsBtn = document.getElementById('fetchProductsBtn');
// const productListDiv = document.getElementById('productList');

const logger = (req, res, next) => {
    const method = req.method
    const url = req.url
    const time = new Date().getFullYear()
    console.log(method, url, time)
    next()
  }

app.use(logger)

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
    
    if(minPrice) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.price <= Number(minPrice);
        })
    }
    res.status(200).json(sortedProducts)
})

// app.get('/api/v1/people', (req, res) => {
//     res.json(people)
// })

// app.post('/login', (req, res) => {
//     const {name} = req.body;
//     if(!name) {
//         return res.status(400).json({ success: false, message: "Please provide a name" });
//     }
//     people.push({ id: people.length + 1, name: req.body.name})
//     res.status(201).json({ success: true, name: req.body.name})
// })

// app.post('/api/v1/people', (req, res) => {
//     const {name} = req.body;
//     if(!name) {
//         return res.status(400).json({ success: false, message: "Please provide a name" });
//     }
//     people.push({ id: people.length + 1, name: req.body.name})
//     res.status(201).json({ success: true, name: req.body.name})
//     // The HTTP status code 201 means that an object was created on the server side.
// })


app.all('*', (req, res) => {
    res.status(404).send('<h1>Not found</h1>')
})

app.listen(3000, () => {
    console.log("server is listening on port 3000")
})


