import express from 'express'
import routes from './routes';
import cors from "cors"
const app = express();


app.use(cors())
app.use(express.json())
app.use(routes)

// Get:  Buscar ou listar uma informação
// Post: Criar alguma nova informação
// Put: Atualizar uma informação existente
// Delete: Deletar uma informação existente

//Corpo (Request Body): Dados para criação ou atualização de um registro
//Route Params: Identificar qual recurso eu quero atualizar ou deletar
//Query Params: Paginação, filtros, ordenação



app.listen(3333)

