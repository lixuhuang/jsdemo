/**
 * duplicate search
 */
let dup = /([a-z]+) +\1 \1/
console.log('1.duplicate search')
console.log(dup.exec('dup dup dup cxa lk')[0])
console.log('')

/**
 * replace text
 */
let replace = /(?:http:)(\w+): *(\d+)/g
console.log('2.replace text')
console.log('http:word: 1234 - http:word2: 5678'.replace(replace, '$1 is text; $2 is number; '))
console.log('Jeffs'.replace(/(?=\w+)(?=s)/, '\''))
console.log('')


/**
 * lookahead 
 */
let lookahead = /(?=Jeffrey)Jeff/g
console.log('3.lookahead')
console.log(lookahead.exec('Jeffrey')[0])
console.log(lookahead.test('Jefft'))
console.log('')

/**
 * 否定环视 
 */
console.log('4.否定环视')
let test = /\<(\w+)\>\w+(?!\<\/\1>)/g
console.log(test.test('<aa>aa</aaa>'))
console.log(test.test('<aa>aa</aa>'))
console.log('')

/**
 * 元字符
 */
let chars = /\bword\b/
let chars2 = /\Bword\B/
let chars3 = /word/
console.log('5.元字符')
// 单词分界符号，
console.log(chars.test('start word'))
console.log(chars.test('word'))
console.log(chars.test('startwords'))

console.log(chars2.test('start word'))
console.log(chars2.test('word'))
console.log(chars2.test('startwords'))

console.log(chars3.test('start word'))
console.log(chars3.test('word'))
console.log(chars3.test('startwords'))
console.log('')


/**
 * 中文匹配 [\u4e00-\u9fa5]
 */


/**
 * 常用正则表达式
 */
logMessage('4.常用正则表达式')
let number = /^[0-9]+\.?[0-9]{0,2}$/
logMessage(`100 是数字 ->${number.test('100s')}`)

let number2 = /\b[0-9]+\.{0,1}[0-9]{0,2}\b/
logMessage(`扣数字: "test 1.02 test"->${number2.exec('test 1.02 test 22 p')[0]}`)

let chinese = /^[\u4e00-\u9fa5]+$/
logMessage(`中国话->${chinese.test('中国话')}`)

let email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
logMessage(`email: "a.a@q.com"->${email.test('a.a@q.com')}`)
logMessage(`email: "a.a-@q.com"->${email.test('a.a-@q.com')}`)

let url = /^http(s?):\/\/([^\/:]+)(:(\d+))?(\/.*)?$/
logMessage(`url: "://www.baidu.com"->${url.test('https://www.baidu.com')}`)

let ip = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/
logMessage(`偷懒的ip匹配: "225.226.0.1"->${ip.test('225.226.0.1')}`)

let htmltag = /<("[^"]*"|'[^']'|[^'">])*>/
logMessage(`复杂的html tag匹配：'<tag attr=">">' -> ${htmltag.test('<tag attr=">">')}`)

let quote = /^"(\\.|[^\\"])*"$/
logMessage(`带转义的引号内容匹配： -> ${quote.test('"\\a\"\\\a"')}`)

function logMessage(msg, nl = false) {
  console.log(msg)
  nl ? console.log("") : undefined
}