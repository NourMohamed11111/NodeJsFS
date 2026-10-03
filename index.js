const fs = require("fs")

let products = [{
    id:1,
    name:'product1',
    desc:'product1 desc',
    price:10
}]

products = JSON.stringify(products)

fs.access('./dataFile.json',fs.constants.F_OK,(err)=>{
    if(err){
        fs.writeFileSync('./dataFile.json',products);
    }
})

function addProduct(product){
    let content = fs.readFileSync('./dataFile.json',{encoding:'utf-8'})
    products = JSON.parse(content)
    products.push(product)
    products = JSON.stringify(products)
    fs.writeFileSync('./dataFile.json',products)
}

function getProducts(){
    let content = fs.readFileSync('./dataFile.json',{encoding:'utf-8'})
    return JSON.parse(content)
}

function getById(id){
    let content = fs.readFileSync('./dataFile.json',{encoding:'utf-8'})
    products = JSON.parse(content)
    let product = products.find((ele) => ele.id === id)
    if (product) {
        return product
    } else {
        return "Product Doesn't exist"
    }
}

function updateById(id,updatedProduct){
    let content = fs.readFileSync('./dataFile.json',{encoding:'utf-8'})
    products = JSON.parse(content)
    let index = products.findIndex((ele) => ele.id === id)
    if(index !== -1){
        products[index] = updatedProduct
        products = JSON.stringify(products)
        fs.writeFileSync('./dataFile.json',products)
        return "Updated succfully!"
    }else{
        return "Product Not Found!"
    }
}

function deleteById(id){
    let content = fs.readFileSync('./dataFile.json',{encoding:'utf-8'})
    products = JSON.parse(content)
    let index = products.findIndex((ele) => ele.id === id)
    if(index !== -1){
        let updatedProducts = products.filter((ele)=> ele.id !== id)
        updatedProducts = JSON.stringify(updatedProducts)
        fs.writeFileSync('./dataFile.json',updatedProducts)
        return "Deleted succfully!"
    }else{
        return "Product Not Found!"
    }
}

