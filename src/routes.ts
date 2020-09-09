import express, {response, Router} from "express"
import ProdutosController from "./controllers/ProdutosController"
import UsuariosController from "./controllers/UsuariosController"
import authMiddleware from "./middlewares/auth"


const routes = express.Router()
const produtosControllers = new ProdutosController()
const usuariosController = new UsuariosController()
routes.use(authMiddleware)

routes.post("/produtos", produtosControllers.create)
routes.post("/cadastrar-usuario", usuariosController.create)
routes.get("/", (req, res) => {
    res.send("Hello World")
})
routes.get("/login", usuariosController.index)

export default routes

