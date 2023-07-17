class ProductManager{
    constructor(){
        this.products = []
        this.nextID = 1
    }


    addProduct(product){
        if(!this.isProductValid(product)){
            console.error("Error: El producto no es Valido.")
            return
        }

        if(this.isCodeDuplicate(product.code)){
            console.log("Error: El codigo del Producto ya existe")
            return
        }

        product.id= this.nextID++
        this.products.push(product)
    }

    getProducts(){
        return this.products
    }

    getProductById(id){
        const product = this.products.find((p)=> p.id === id)
        if(product){
            return product
        }else{
            console.log("Error: Producto no encontrado")
        }
    }

    isProductValid(product){
        return(
            product.title &&
            product.description &&
            product.price &&
            product.thumbnail &&
            product.code &&
            product.stock !== undefined
        )
    }

    isCodeDuplicate(code){
        return this.products.some((p) => p.code === code)
    }

}

const productManager = new ProductManager()

productManager.addProduct({
    title:"Producto 1",
    description: "Descripcion Default 1",
    price: 20,
    thumbnail: "/Product1Image.png",
    code: "PD01",
    stock: 15
})

productManager.addProduct({
    title:"Producto 2",
    description: "Descripcion Default 2",
    price: 40,
    thumbnail: "/Product1Image.png",
    code: "PD01",
    stock: 25

})


const noProduct = productManager.getProductById(9)