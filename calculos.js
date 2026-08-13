function subtraia(a, b){
    return a - b;
}

function some(a, b){
    return a + b;
}

function multiplique(a, b){
    return a * b;
}

function divida(a, b){
    if(b == 0){
        throw new Error("Divisão por zero");
    }
    return a / b;
}

module.exports = {subtraia, multiplique, some, divida};