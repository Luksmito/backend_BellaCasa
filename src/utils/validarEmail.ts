export default function temArroubaValida(email: string) {
    const tamanho = email.length
    if(email[0] === "@"){
        return [false, "Email invalido"]
    }
    for(var i=0; i<tamanho; i++){
        if(i === tamanho - 1){
            return [false, "Email invalido"]
        }else if(email[i] === "@"){
            return true
        }
    }
    return [false, "Email invalido"]
}

