import * as rl from 'readline-sync'
import boxen from 'boxen'
import chalk from 'chalk';


const init = async ()  => {
    console.log(boxen(chalk.bold("INSERIR CLIENTE"), { padding: 1, borderColor: 'greenBright', borderStyle: 'round', width: 100, textAlignment: 'center', margin: 1, title: 'TELA DE COMPRA'}));
    const options = ["Sair", "Continuar"]
    const clients = []

    while(true) {
        try {
            const client = {
                name: rl.question(chalk.bold.green("Digite o nome do cliente: ")),
                email: rl.question(chalk.bold.yellow("Digite o email do cliente: "))
            }
            const cep = rl.question(chalk.bold.blue("Digite o cep do cliente: "))
            const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            const response = await request.json()
        
            client["logradouro"] = response.logradouro
            client["localidade"] = response.localidade
            client["cep"] = response.cep
            client["estado"] = response.estado
            client["bairro"] = response.bairro
            clients.push(client)
    
            const option = rl.keyInSelect(options, chalk.greenBright("Escolha uma das opcoes: "))
            
            if(option === 0) {
                console.log(boxen("Receita finalizada...", {margin: 1, padding: 1, borderColor: 'blue', borderStyle: 'round'}))
                break
            }
        }

        catch(e) {
            console.log(chalk.red(e.message))
            console.log('\n')
        }
      
    }

    console.clear()

    orderRecipe({ingredients: clients})


    

    
    
}



export const orderRecipe = ({ingredients}) => {
    console.log(boxen(chalk.bold('ORDENAR CLIENTES'), { padding: 1, borderColor: 'greenBright', borderStyle: 'round', width: 200, textAlignment: 'center', margin: 1, title: 'TELA DE ORDENAÇÃO'}));
    let list = chalk.greenBright("CLIENTES DADA A LISTA\n \n")
    ingredients.forEach((i) => {
            list += `NAME: ${chalk.yellow(i.name)}, EMAIL: ${chalk.yellow(i.email)}, CEP: ${chalk.yellow(i.cep)}, BAIRRO: ${chalk.yellow(i.bairro)}, ESTADO: ${chalk.yellow(i.estado)} LOGRADOURO: ${chalk.yellow(i.logradouro)} LOCALIDADE: ${chalk.yellow(i.localidade)} \n `
    })

    console.log(boxen(list, {padding: 1, borderColor: "green", borderStyle: 'round', width: 200, textAlignment: 'center', align: 'center', margin: 1, title: "LISTA DE USUARIOS"}))
    console.log()
    const steps = {}
    const recipe = orderIngredients(ingredients, steps) 

    let title = chalk.bold.greenBright("CLIENTES ORDENADOS: \n \n")

    for(let i in recipe) {
        title += `CLIENTE ${i.split(" ")[1]}: ${recipe[i].name} ${recipe[i].email} ${recipe[i].cep} ${recipe[i].bairro} ${recipe[i].logradouro} ${recipe[i].localidade}\n`
    }


   

    console.log(boxen(title, {padding: 1, borderColor: "green", borderStyle: 'round', width: 100, textAlignment: 'center', align: 'center', margin: 1, title: ""}))
}


const orderIngredients = (ingredients, object) => {
    let i = 0;
    const options = ["Sair", "Continuar"]


    while(true) {
        
        i++

        try  {  
            let indexForReference = -1;
            let name = rl.question(chalk.bold.green(`Digite o nome do cliente numero ${i}: `))
            ingredients.map((ingredient, i) => {
                if(ingredient.name === name) {
                    indexForReference = i
                    console.log(boxen(`${chalk.bold.green('CLIENTE ADICIONADO COM SUCESSO')} \n \nINFORMAÇÃO DO INGREDINTE: NOME: ${chalk.yellow(ingredient.name)} EMAIL: ${chalk.yellow(ingredient.email)} CEP: ${chalk.yellow(ingredient.cep)} BAIRRO: ${chalk.yellow(ingredient.bairro)} ESTADO: ${chalk.yellow(ingredient.estado)} `, {padding: 1, borderColor: 'blue', borderStyle: 'round'}))
                }
            })
               

            

            if(indexForReference === -1) throw new Error("O Cliente não se encontra na lista: ")
            object[`CLIENTE ${i} : `] = ingredients[indexForReference]
            const option = rl.keyInSelect(options, chalk.greenBright("Escolha uma das opcoes: "))
        
            if(option === 0) {
                console.log(boxen("Listagem completa...", {margin: 1, padding: 1, borderColor: 'blue', borderStyle: 'round'}))
                break
            }
        }

        catch(e) {
            i -= 1
            console.log(chalk.red(e.message))
            console.log('\n')
        }
       
    }

    return object

}


init()