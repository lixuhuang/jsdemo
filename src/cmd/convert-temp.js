var program = require('commander');

let reg = /^([-+]?\d+(\.\d*)?)\s*([CF])$/i
program
  .version('0.0.1')
  .option('-p --param [value]', 'param (e.g., 32F, 100.1C)', reg, 'error input')
  .parse(process.argv)

if (reg.test(program.param)) {
  let num = RegExp.$1
  let type = RegExp.$3
  if (/c/i.test(type)) {
    console.log(`${num} c is ${parseFloat(num)*9/5} f`)
  } else {
    console.log(`${num} f is ${parseFloat(num)*5/9} f`)
  }
} else {
  console.log(`${program.param}`)
}
