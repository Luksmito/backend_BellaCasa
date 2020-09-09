export default function validarSenha(senha: string, confirmarSenha: string){
    if(senha.length < 8){
        return [false, "Senha muito pequena"]
    }
    if(senha !== confirmarSenha){
        return [false, "Senha e confirmação diferentes"]
    }
    return true
}