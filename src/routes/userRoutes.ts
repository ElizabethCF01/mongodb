import {Request, Response, Router} from 'express' 
//para validar rutas tambien se importa NextFunction
import User from '../models/User'

class UserRoutes{
    router:Router
    constructor(){
        this.router=Router()
        this.routes()
    }
    public async getUsers(req:Request, res:Response):Promise<void> {
       // res.send('posts')
       const users= await User.find()
       res.json(users)
    }
    public async getUser(req:Request,res:Response):Promise<void> {
        //console.log(req.params.url)
        const user= await User.findOne({username : req.params.username}).populate('posts','title url -_id')
        res.json(user)
        
    }
    public async createUser(req:Request,res:Response):Promise<void> {
        //const {name, email, password, username }= req.body
        const user= new User(req.body)
        console.log(user)
        await user.save()
        res.json({data: user})
    }
    public async updateUser(req: Request, res:Response):Promise<void> {
        const { username }= req.params
        const user= await User.findOneAndUpdate({username}, req.body, {new: true})
        // new true es para q almacene el obj nuevo, no el antiguo
        res.json(user)  
        
    }
    public async deleteUser(req: Request, res:Response):Promise<void> {
        const { name }=req.params
        await User.findOneAndDelete({name})
        res.json({response: 'User deleted successfully'})
 
    }
    public async routes(): Promise<void>{
        this.router.get('/', this.getUsers)
        this.router.get('/:username', this.getUser)
        this.router.post('/', this.createUser)
        this.router.put('/:username', this.updateUser)
        this.router.delete('/:username', this.deleteUser)
    }
}
const userRoutes= new UserRoutes
export default userRoutes.router