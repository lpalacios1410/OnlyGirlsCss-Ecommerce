import products from "../data.json" with {type: 'json'};

export class ProductModel {
    static async getAll({limit = 10, offset = 0, tipo, nombre}) {
        let filteredProducts = products

        if (nombre) {
        const nombreTerm = nombre.toLowerCase();
        filteredProducts = filteredProducts.filter(product => product.nombre.toLowerCase().includes(nombreTerm))
        }
        if (tipo) {
        filteredProducts = filteredProducts.filter(product => product.tipo.includes(tipo))
        }

        const total = filteredProducts.length
        const limitNumber = Number(limit)
        const offsetNumber = Number(offset)

        const paginatedProducts = filteredProducts.slice(offsetNumber, offsetNumber + limitNumber)
        
        return {paginatedProducts, total}
    }
    static  async getById(id) {
        const productGet = products.find(product => product.id === Number(id))
        return productGet
    }

    static async create({ nombre, tipo, precio, descripcion }) {
        if (!nombre || !tipo || !precio || !descripcion) {
            return ({ error: "Faltan campos requeridos" });
          }
        
          const newProduct ={
            id: crypto.randomUUID(),
            // id: products.length + 1,
            nombre,
            tipo,
            precio,
            descripcion,
          }
        
          products.push(newProduct)

          return newProduct
    }
    static async update({id, nombre, tipo, precio, descripcion}) {
        const getProduct = products.findIndex(p => p.id === (id))

        if(getProduct === -1){
        return ({ error: "Producto no encontrado" })
        }

        products[getProduct] ={
        ...products[getProduct],
        nombre: nombre || products[getProduct].nombre,
        tipo: tipo || products[getProduct].tipo,
        precio: precio || products[getProduct].precio,
        descripcion: descripcion || products[getProduct].descripcion
        }
        return products[getProduct]
    }
    static async delete(id) {
        const getProduct = products.findIndex(p => p.id === (id))

        if(getProduct === -1){
            return ({ error: "Producto no encontrado" })
        }

        products.splice(getProduct, 1)
    }
}