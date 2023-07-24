const fs = require('fs');


class Contenedor{
    constructor(file){
        this.file = file
    }

    async save(obj){
        try{
            const objects = await this.getAllObjects()
            const lastId = objects.length > 0 ? objects[objects.length - 1].id : 0
            const newId = lastId + 1
            const newObj = {id: newId, ...obj}
            objects.push(newObj)
            await this.saveObjects(objects)
            return newId
        } catch(error) {
            throw new Error('Error al guardar el Objeto')
        }
    }

    async getById(id){
        try{
            const objects = await this.getAllObjects()
            const obj = objects.find((o) => o.id === id)
            return obj || null
        } catch(error){
            throw new Error('Error al obtener el ID')
        }
    }

    async getAll(){
        try{
            const objects = await this.getAllObjects()
            return objects
        } catch(error){
            throw new Error('Error al obtener los objectos')
        }
    }

    async deleteById(id){
        try{
            let objects = await this.getAllObjects()
            objects = objects.filter((o) => o.id !== id)
            await this.saveObjects(objects)
        }catch (error){
            throw new Error('Error al eliminar los objectos')
        }
    }

    async deleteAll(){
        try{
            await this.saveObjects([])
        } catch(error){
            throw new Error('Error al eliminar los Objetos')
        }
    }
    async getAllObjects(){
        try{
            const data = await fs.promises.readFile(this.file,'utf-8')
            return data ? JSON.parse(data) : []
        }catch (error){
            return []
        }
    }

    async saveObjects(objects){
        try{
            await fs.promises.writeFile(this.file, JSON.stringify(objects, null, 2))
        }catch (error){
            throw new Error("Error al guardar Objetos")
        }
    }
}

const main = async () => {
    const productos = new Contenedor("productos.txt")

    //Agregar Producto al archivo
    /* const id = await productos.save(
        {title: 'Producto Random 3', price: 800,thumbnail: 'urlrandom3'}
    )
    console.log('Objecto Guardado con ID:', id) */
    
    //Obtener Producto por ID
     /* const obj = await productos.getById(2)
     console.log("Objecto Obtenido", obj) */

     //Eliminar Producto
     /* await productos.deleteById(1)
     console.log("Producto Eliminado") */

     //Obtener Todos los productos
     const allObjects = await productos.getAll()
     console.log('Objetos Guardados', allObjects)

}

main().catch((error) => console.error(error))