import {Request, Response, Router} from 'express' 
//para validar rutas tambien se importa NextFunction
import Post from '../models/Post'

class PostRoutes{
    router:Router
    constructor(){
        this.router=Router()
        this.routes()
    }
    public async getPosts(req:Request, res:Response):Promise<void> {
       // res.send('posts')
       const posts= await Post.find()
       res.json(posts)
    }
    public async getPost(req:Request,res:Response):Promise<void> {
        //console.log(req.params.url)
        const post= await Post.findOne({url : req.params.url})
        res.json(post)
        
    }
    public async createPost(req:Request,res:Response):Promise<void> {
        const {title, url, content, image}= req.body
        const post= new Post({title, url, content, image})
        console.log(post)
        await post.save()
        res.json({data: post})
    }
    public async updatePost(req: Request, res:Response):Promise<void> {
        const { url }= req.params
        const post= await Post.findOneAndUpdate({url}, req.body, {new: true})
        // new true es para q almacene el obj nuevo, no el antiguo
        res.json(post)
        
    }
    public async deletePost(req: Request, res:Response):Promise<void> {
        const { title }=req.params
        await Post.findOneAndDelete({title})
        res.json({response: 'Post deleted successfully'})
 
    }
    public async routes(){
        this.router.get('/', this.getPosts)
        this.router.get('/:url', this.getPost)
        this.router.post('/', this.createPost)
        this.router.put('/:url', this.updatePost)
        this.router.delete('/:title', this.deletePost)
    }
}
const postRoutes= new PostRoutes
export default postRoutes.router