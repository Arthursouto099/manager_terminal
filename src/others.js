
// teste

function calculator(target, n1, n2){
    let calc = 0;
    switch(target) {
        case  "+":  
            calc = n1 + n2
        break
        case  '-':
            calc = n1 - n2
        break
        case  '/':
            calc = n1 / n2;
            break
        case  '*':
            calc = n1 * n2
        break
    }

    return calc
}



console.log(calculator("*", 5, 5))