
import {Request, Response, Router} from 'express' 
// req y res son tipos para las mismas, router para definir rutas

class IndexRoutes{

    public router:Router

    constructor(){
        this.router=Router() //Router devuelve un obj q nos permitira def las rutas
        this.routes()
    }
    routes(){
        this.router.get('/', (req,res)=> res.send('/api/posts'))
    }
}

const indexRoutes = new IndexRoutes()
indexRoutes.routes()
export default indexRoutes.router