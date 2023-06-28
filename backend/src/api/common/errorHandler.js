const _ = require('lodash')

//Vamos personalizar as mensagens de erro pra terem uma forma personalizada. Isto aqui é um middleware
module.exports = (req, res, next) => {
    const bundle = res.locals.bundle //É no bundle que estará a lista de errors
    
    if(bundle.errors) {
        const errors = parseErrors(bundle.errors)
        res.status(500).json({ errors })
    } else {
        next()
    }
}

//O método parseErrors() irá converter os objetos de erro, que o Node Restful nos devolve de forma padrão para um array de strings
const parseErrors = (nodeRestfulErrors) => {
    const errors = [] //Conceito básico de programação: ao aplicar uma const para um array, não podemos, obviamente, mudar o seu value, mas podemos adicionar novos elementos para este array

    _.forIn(nodeRestfulErrors, error => errors.push(error.message)) //Extraindo as mensagens do objeto de erros e dando um push() no array "errors" que criamos

    return errors
}
