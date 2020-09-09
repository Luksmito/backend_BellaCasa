
var crypto = require("crypto")

const DADOS_CRIPTOGRAFAR = {
    algoritmo : "aes256",
    segredo : "b3llacasa",
    tipo : "hex"
};

function encryptarSenha(senha: string) {
    const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
    cipher.update(senha);
    return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
}

function decryptarSenha(senha: string) {
    const decipher = crypto.createDecipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
    decipher.update(senha, DADOS_CRIPTOGRAFAR.tipo);
    return decipher.final();
}

export default encryptarSenha; decryptarSenha




