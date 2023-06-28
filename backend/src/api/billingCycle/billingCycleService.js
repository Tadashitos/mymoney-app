const BillingCycle = require('./billingCycle')
const errorHandler = require('./../common/errorHandler')

BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({ new: true, runValidators: true }) //Por padrão, as validações do billingCycle.js só são efetivadas pelo verbo "post". Este updateOptions, especificamente o atributo runValidators permite que essas mesmas validações também sejam válidas para o verbo "put"

//O atributo "new" devolve o objeto já atualizado, ao invés do objeto antigo, ou seja, antes do usuário ter atualizado

//Aplicando o middleware "errorHandler"
BillingCycle.after('post', errorHandler).after('put', errorHandler)

/*
BillingCycle.route('get', (req, res, next) => {
    BillingCycle.find({}, (err, docs) => {
        if(!err) {
            res.json(docs)
        } else {
            res.status(500).json({ errors: [error] })
        }
    })
})
*/

BillingCycle.route('count', (req, res, next) => {
    BillingCycle.count((error, value) => {
        if(error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json({ value })
        }
    })
})

BillingCycle.route('summary', (req, res, next) => {
    //Essas funções são relativas ao MongoDB (isso por causa do mongoose). O agrregate é um pipeline de agregações
    BillingCycle.aggregate({
        $project: {
            credit: {
                $sum: "$credits.value"
            },
            debt: {
                $sum: "$debts.value"
            }
        }
    }, {
        $group: {
            _id: null, //Não há critério de agrupamento, portanto, o id deve ser nulo
            credit: {
                $sum: "$credit"
            }, //Este "credit" é o resultado da soma do "credit" do "$project". O mesmo vale para o "debt"
            debt: {
                $sum: "$debt"
            }
        } //group by
    }, {
        $project: {
            _id: 0,
            credit: 1,
            debt: 1
        }
    }, (error, result) => {
        if(error) {
            res.status(500).json({ errors: [error] })
        } else {
            res.json(result[0] || { credit: 0, debit: 0 }) //Como deixamos o id null no agrupamento, então a gente sabe que ele trará um registro apenas no índice 0.
        }
    })
})

module.exports = BillingCycle