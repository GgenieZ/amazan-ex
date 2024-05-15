import { formatCurrency } from "../scripts/utils/money.js";

console.log('test suite for formatcurrensy')
function moneyTest(input,expectedOutput){
    console.log(`convert ${input} cents to ${expectedOutput} dollars `)
if(formatCurrency(input)===expectedOutput){
    console.log('passed')
}else{console.log('failed')}
}
moneyTest(0,'0.00')
moneyTest(2000.4,'20.00')

