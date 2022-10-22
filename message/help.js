const moment = require("moment-timezone");
const fs = require("fs");

moment.tz.setDefault("Asia/Jakarta").locale("id");
let setting = JSON.parse(fs.readFileSync('./config.json'))
const jam = moment.tz('asia/jakarta').format('HH:mm:ss')
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

function toCommas(x) {
	x = x.toString()
	var pattern = /(-?\d+)(\d{3})/;
     while (pattern.test(x))
	   x = x.replace(pattern, "$1,$2");
	return x;
}

exports.allmenu = (sender, prefix, pushname, ucapanWaktu, botName, seri, tanggal, loginnya) => {
	return `*── 「 ${botName} 」 ──*
	
*INFO*
*•* Library   : Baileys-MD
*•* Time      : ${jam} WIB
*•* Date      : ${tanggal}
*•* Terdaftar : ${loginnya.length}

*INFO USER*
Halo, {ucapanWaktu} 👋
*•* Nama : {pushname}

*MAIN MENU*
*•* ${prefix}menu
*•* ${prefix}owner
*•* ${prefix}speed
*•* ${prefix}runtime
*•* ${prefix}donasi

*CONVERTER/TOOLS*
*•* ${prefix}sticker
*•* ${prefix}toimg
*•* ${prefix}tovid

*DOWNLOAD MENU*
*•* ${prefix}ytmp4
*•* ${prefix}ytmp3
*•* ${prefix}tiktokvideo
*•* ${prefix}tiktokaudio
*•* ${prefix}mediafire

*OWNER MENU*
*•* ${prefix}broadcast
*•* ${prefix}exif
*•* ${prefix}sendsession
*•* ${prefix}setnamabot
*•* ${prefix}setfooter
*•* ${prefix}setthumb
*•* ${prefix}addowner
*•* ${prefix}delowner
`
}
