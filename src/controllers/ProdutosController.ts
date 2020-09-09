import db from "../database/connection"
import {Request, Response} from 'express'

interface pesquisa{
    temFiltro: boolean
    faixaPreco: Array<number>,
}

export default class ProdutosController {
    
    async index(req: Request, res: Response){
        const corpo = req.body
            
    }
    
    async create(req: Request, res: Response){
        const {
            nome,
            preco,
            descricao,
            imagem
        } = req.body
        const trx = await db.transaction()
    
        try {
            await trx("produtos").insert(
                {
                    nome, 
                    preco, 
                    descricao,
                    imagem 
                }
            )

            await trx.commit()

            res.status(201).send()
            
        } catch (error) {
            await trx.rollback()
            return res.status(400).json({
                error: "Erro inesperado ao criar Produto"
            })
        }
    }
}