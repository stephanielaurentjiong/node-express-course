const Product = require('../models/product')

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({ price:{ $gt:30 } })
    .sort('price') //sort name alphabetically ascending
    .select('name price') //select the name and price only
    // .limit(10)//limit to 10 objects
    // .skip(1) //skip the first item 
    // limit and skip = paging


    res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query //if user does not set featured the logic if block below won't be applied...; objects in query can be anything u decie 
    const queryObject = {} //... and this is just empty object

    // filter
    if(featured) {
        // set up new property in the queryObject by the name 'featured'
        queryObject.featured = featured === 'true'? true : false
    }
    

    if(company) {     
        queryObject.company = company
    }

    if(name) {
        queryObject.name = { $regex: name, $options: 'i' } //instead of hard coding, use regex to find the pattern
    }
    if(numericFilters) {
        const operatorMap = {
            ">" : '$gt',
            ">=" : '$gte',
            "=" : '$eq',
            "<" : '$lt', //right side is mongo's understood xpressions 
            "<=" : '$lte',
        }
        // below is convert from human understood to mongo's understoof expressions
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        // console.log(filters) //it will log price-$gt-40,rating-$gte-4

        // now make price-$gt-40,rating-$gte-4 become an object 
        const options = ['price', 'rating'] 
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if(options.includes(field)) {  //checks if `field from forEach item is included in options array. If the field contains `price or rating`, good~
                queryObject[field] = { [operator] : Number(value)}
            }
        })
    }

    console.log(queryObject)
    let result = Product.find(queryObject)

    // sort
    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createAt')
    }
    // select
    if (fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1 ) * limit;

    result = result.skip(skip).limit(limit)
    // 23 products, if limit to 7 items, so 4 pages ( each 7items 7items 7items 2items)

    const products = await result
    res.status(200).json({ products, nbHits: products.length })
}

module.exports = {
    getAllProducts,
    getAllProductsStatic,
}