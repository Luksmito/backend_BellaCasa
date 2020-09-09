interface dadosUsuario{
    email: boolean,
    senha: boolean
}

export default function verficarErros(objeto: dadosUsuario){
    return objeto.email && objeto.senha
}