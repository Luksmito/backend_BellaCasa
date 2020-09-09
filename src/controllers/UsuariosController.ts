import db from "../database/connection"
import { Request, Response, json } from 'express'
import validarEmail from "../utils/validarEmail"
import validarSenha from "../utils/validarSenha"
import jwt from "jsonwebtoken"
const authConfig = require("../config/auth")
import encryptarSenha from "../config/criptografia"



function gerarToken(id: string, config: string) {
    return jwt.sign({ id: id }, config, { expiresIn: 86400 })
}


export default class UsuarioController {
    async index(req: Request, res: Response) {
        const {
            email,
            senha
        } = req.body


        const usuario = await db.select(["email", "senha", "nome"])
            .where({ email: email })
            .table("usuarios")

        if (usuario[0] == null) {
            res.send({
                status: false,
                mensagem: "Usuário não encontrado"
            })
        } else {
            const senhaEncryptada = encryptarSenha(senha)
            if (usuario[0].senha === senhaEncryptada) {

                const token = gerarToken(usuario[0].id, authConfig.secret)

                usuario[0].senha = undefined

                res.send({
                    status: true,
                    mensagem: "Usuário validado",
                    usuario: usuario[0],
                    token: token
                })
            } else {
                res.send({
                    status: false,
                    mensagem: "Senha incorreta"
                })
            }
        }

    }

    async create(req: Request, res: Response) {
        var erros = []
        const {
            nome,
            email,
            senhaRecebida,
            confirmacaoSenha
        } = req.body

        const senhaValida = validarSenha(senhaRecebida, confirmacaoSenha)
        const emailValido = validarEmail(email)

        const trx = await db.transaction()


        if (senhaValida && emailValido) {
            try {

                const senha = encryptarSenha(senhaRecebida)

                await trx("usuarios").insert({
                    nome,
                    email,
                    senha
                })

                await trx.commit()

                const usuario = await db.select("*").where({ email: email }).table("usuarios")

                const token = gerarToken(usuario[0].id, authConfig.secret)
                
                res.status(201).send({ usuario: usuario, token: token })

            } catch (err) {
                await trx.rollback()
                return res.status(400).json({
                    error: "Erro inesperado ao criar Usuario" + err
                })
            }
        } else {
            console.log("ERROOO")
            if (!senhaValida) {
                erros.push(senhaValida[1])
            }
            if (!emailValido) {
                erros.push(emailValido[1])
            }
        }
    }



}