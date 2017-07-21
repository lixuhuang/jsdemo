var fs = require('fs')
var request = require('request');
var rp = request.defaults({'proxy':'http://127.0.0.1:1080/'})
let dataOption = {
		url: 'http://t66y.com/',
		headers: {
			'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
			'Host': 't66y.com',
			'Referer': 'http://t66y.com/thread0806.php?fid=2'
		}
}

function get66y() {
	let options = { url: 'http://t66y.com/thread0806.php?fid=2', headers: dataOption.headers}
	rp.get(options, (err, res, body) => {
		res.body.match(/(htm_data[^"]+)/g).reduce((inc, item) => {
			inc.indexOf(item) == -1 ? inc.push(item) : undefined
			return inc
		}, []).forEach(item => {
			let op = {url: dataOption.url + item, headers: dataOption.headers}
			rp.get(op, (err, res, body) => {
				let rmRs = res.body.match(/\bhttp:\/\/www\.rmdown\.com\/link\.php\?hash\=\w+\b/)
				if (rmRs && rmRs.length>0) {
					rp.get(rmRs[0], (err, res, body) => {
						if (/name\="ref"\s+value\="(\w+)"/.test(body)) {
							let ref = RegExp.$1;
							if (/name\=["']reff["']\s+value\=["']([^"']+)["']/gi.test(body)) {
								downloadFile(`http://www.rmdown.com/download.php?ref=${ref}&reff=${encodeURI(RegExp.$1)}&submit=download`, `bt/${ref}.torrent`, () => console.log(`bt/${ref}.torrent`))
							}
						}
					})
				}
			})
		})
	})
}

function downloadFile(uri, filename, callback) {
	var stream = fs.createWriteStream(filename);
	request(uri).pipe(stream).on('close', callback);
}

exports.get66y = get66y

get66y()

