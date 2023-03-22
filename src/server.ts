import express from 'express'
import morgan from 'morgan'// para ver x consola las peticiones
import helmet from 'helmet' //para seguridad, evitar ataques y cracks
import mongoose from 'mongoose'
import compression from 'compression'// para reducir el peso de las respuestas del back al front
import cors from 'cors'

import indexRoutes from './routes/indexRoutes'
import postRoutes from './routes/postRoutes'
import userRoutes from './routes/userRoutes'

class Server{
    public app:express.Application // aplicacion de express (tipo de dato)
    constructor(){
        this.app=express()
        this.config()// cuando se cree el servidor necesitara la config
        this.routes()
    }
    config(){
        const MONGO_URI='mongodb://localhost/restapits'
        /*const options:any={ useNewUrlParser: true , useCerateIndex: true}
        const op:any='useFindAndModify'
        mongoose.set(op,true)  -----dont work!
        */
        mongoose.connect(MONGO_URI||process.env.MONGO_URI).then(db=>console.log('DB is conected'))
        
        //configuracion
        this.app.set('port', process.env.PORT||4000)    
        //esto es si existe un puerto tomalo sino usa el p 4000
         
        //midlewares
        this.app.use(express.json())//para poder interpretar json
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(morgan('dev'))
        this.app.use(helmet()) 
        this.app.use(compression())//para reducir el peso de las respuestas
        this.app.use(cors())//para poder conectar nuestro backend con diferentes app cliente


    }
    routes(){//para crear las rutas
        this.app.use(indexRoutes)
        this.app.use('/api/posts',postRoutes)
        this.app.use('/api/users', userRoutes)
    }
    start(){// para iniciar el servidor
        this.app.listen(this.app.get('port'),// escucha en este puerto q iniciado antes
        ()=>console.log('Server on port', this.app.get('port'))
    )}

}
const server= new Server()
server.start()