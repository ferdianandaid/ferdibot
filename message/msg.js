/*

• Base Ori By Irfan
• Created By Christian ID
• Kalau Mau Nambah Fitur Jangan Lupa Tambahin Juga Di Databasenya Di listcmd.json
• Jangan Lupa Kasih Thanks To Minimal Hargain Creator Bot Jangan Cuman Bisa Nyomot Doang

*/

"use strict";
const {
	downloadContentFromMessage
} = require("@adiwajshing/baileys")
const { color, bgcolor } = require('../lib/color')
const { getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, makeid } = require("../lib/myfunc");
const { webp2mp4File } = require("../lib/convert")
const msgFilter = require("../lib/antispam");
const { addLogin, deleteLogin, checkLogins } = require("../lib/login");

const Dym = require("didyoumean");
const fs = require ("fs");
const moment = require("moment-timezone");
const util = require("util");
const { exec, spawn } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const xfar = require('xfarr-api');
const axios = require("axios");
const hxz = require("hxz-api");
const ra = require("ra-api");
const kotz = require("kotz-api");
const yts = require("yt-search");
const speed = require("performance-now");
const request = require("request");
const ms = require("parse-ms");

// Exif
const Exif = require("../lib/exif")
const exif = new Exif()

// Setting
let seri = makeid(10)

const messOwner = "Perintah Hanya Bisa Digunakan Oleh Owner"
const messWait = "Tunggu sebentar kak permintaanmu sedang diproses"
const messLink = "Link yang kamu berikan tidak valid"
const messDone = "Done By ${botName}"
const myapi = "HitomiBot" // Apikey Lol Human

// Database
let pendaftar = JSON.parse(fs.readFileSync('./database/user.json'))
const loginnya = JSON.parse(fs.readFileSync('./database/logins.json'))
let _cmd = JSON.parse(fs.readFileSync('./database/command.json'));
let _cmdUser = JSON.parse(fs.readFileSync('./database/commandUser.json'));
let listCmd = JSON.parse(fs.readFileSync('./database/listcmd.json'));

moment.tz.setDefault("Asia/Jakarta").locale("id");

module.exports = async(conn, msg, m, setting, store, welcome) => {
	try {
		let { ownerNumber, ownerName, botName, footer } = setting
		let { allmenu } = require('./help')
		const { type, quotedMsg, mentioned, now, fromMe } = msg
		if (msg.isBaileys) return
        let d = new Date
        let locale = 'id'
		const tanggal = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
        let dt = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
		var fildt = dt == 'pagi' ? dt + '🌝' : dt == 'siang' ? dt + '🌞' : dt == 'sore' ? dt + '🌝' : dt + '🌚'
        const ucapanWaktu = "Selamat "+dt.charAt(0).toUpperCase() + dt.slice(1)
		const content = JSON.stringify(msg.message)
		const from = msg.key.remoteJid
		const chats = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type === 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type === 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type === 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type === 'buttonsResponseMessage') && quotedMsg.fromMe && msg.message.buttonsResponseMessage.selectedButtonId ? msg.message.buttonsResponseMessage.selectedButtonId : (type === 'templateButtonReplyMessage') && quotedMsg.fromMe && msg.message.templateButtonReplyMessage.selectedId ? msg.message.templateButtonReplyMessage.selectedId : (type === 'messageContextInfo') ? (msg.message.buttonsResponseMessage?.selectedButtonId || msg.message.listResponseMessage?.singleSelectReply.selectedRowId) : (type == 'listResponseMessage') && quotedMsg.fromMe && msg.message.listResponseMessage.singleSelectReply.selectedRowId ? msg.message.listResponseMessage.singleSelectReply.selectedRowId : ""
                const toJSON = j => JSON.stringify(j, null,'\t')
		if (conn.multi) {
			var prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(chats) ? chats.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '#'
		} else {
			if (conn.nopref) {
				prefix = ''
			} else {
				prefix = conn.prefa
			}
		}
		const args = chats.split(' ')
		const command = chats.toLowerCase().split(' ')[0] || ''
		const isCmd = command.startsWith(prefix)
		const isGroup = msg.key.remoteJid.endsWith('@g.us')
		const sender = isGroup ? (msg.key.participant ? msg.key.participant : msg.participant) : msg.key.remoteJid
		const isOwner = ownerNumber.includes(sender)
		const pushname = msg.pushName
		const isNan = args[1]
		const q = chats.slice(command.length + 1, chats.length)
		const body = chats.startsWith(prefix) ? chats : ''
		const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
		const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
		const groupName = isGroup ? groupMetadata.subject : ''
		const groupId = isGroup ? groupMetadata.id : ''
		const groupMembers = isGroup ? groupMetadata.participants : ''
		const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
		const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
		const isGroupAdmins = groupAdmins.includes(sender)
		const isUser = pendaftar.includes(sender)
		const pp_bot = fs.readFileSync(setting.pathimg)

        const fimage = {key: { fromMe: false,participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) },message: { "imageMessage": { "title":`${ownerName}`, "h": `Hmm`,'seconds': '359996400', 'caption': `*_✘ BALASAN MENFESS ✘_*`, 'jpegThumbnail': pp_bot}}}
        const fkontak = { key: {participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { 'contactMessage': { 'displayName': `${pushname}`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;${pushname},;;;\nFN:${pushname},\nitem1.TEL;waid=${sender.split('@')[0]}:${sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': pp_bot, thumbnail: pp_bot,sendEphemeral: true}}}
		const mentionByTag = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.mentionedJid : []
                const mentionByReply = type == "extendedTextMessage" && msg.message.extendedTextMessage.contextInfo != null ? msg.message.extendedTextMessage.contextInfo.participant || "" : ""
                const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
                mention != undefined ? mention.push(mentionByReply) : []
                const mentionUser = mention != undefined ? mention.filter(n => n) : []
		
		async function downloadAndSaveMediaMessage (type_file, path_file) {
			if (type_file === 'image') {
				var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'video') {
				var stream = await downloadContentFromMessage(msg.message.videoMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'sticker') {
				var stream = await downloadContentFromMessage(msg.message.stickerMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			} else if (type_file === 'audio') {
				var stream = await downloadContentFromMessage(msg.message.audioMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.audioMessage, 'audio')
				let buffer = Buffer.from([])
				for await(const chunk of stream) {
					buffer = Buffer.concat([buffer, chunk])
				}
				fs.writeFileSync(path_file, buffer)
				return path_file
			}
		}
		const sendFileFromUrl = async (from, url, caption, options = {}) => {
		    let mime = '';
		    let res = await axios.head(url)
		    mime = res.headerd["content-type"]
		    let type = mime.split("/")[0]+"Message"
		    if (mime.split("/")[0] === "image") {
		       var img = await getBuffer(url)
		       return conn.sendMessage(from, { image: img, caption: caption }, options)
		    } else if (mime.split("/")[0] === "video") {
		       var vid = await getBuffer(url)
		       return conn.sendMessage(from, { video: vid, caption: caption }, options)
		    } else if (mime.split("/")[0] === "audio") {
		       var aud = await getBuffer(url)
		       return conn.sendMessage(from, { audio: aud, mimetype: 'audio/mp3' }, options)
		    } else {
		       var doc = await getBuffer(url)
		       return conn.sendMessage(from, { document: doc, mimetype: mime, caption: caption }, options)
		    }
		}
		const isUrl = (url) => {
			return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
		}
		function jsonformat(string) {
            return JSON.stringify(string, null, 2)
        }
		function monospace(string) {
            return '```' + string + '```'
        }
		function randomNomor(min, max = null) {
		  if (max !== null) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		  } else {
			return Math.floor(Math.random() * min) + 1
		  }
		}
		const pickRandom = (arr) => {
			return arr[Math.floor(Math.random() * arr.length)]
		}
		function mentions(teks, mems = [], id) {
			if (id == null || id == undefined || id == false) {
			  let res = conn.sendMessage(from, { text: teks, mentions: mems })
			  return res
			} else {
		      let res = conn.sendMessage(from, { text: teks, mentions: mems }, { quoted: msg })
		      return res
 		    }
		}
		const reply = (teks) => {
			conn.sendMessage(from, { text: teks }, { quoted: msg })
		}
		const textImg = (teks) => {
			return conn.sendMessage(from, { text: teks, jpegThumbnail: pp_bot }, { quoted: msg })
		}
		const sendMess = (hehe, teks) => {
			conn.sendMessage(hehe, { text, teks })
		}
		const buttonWithText = (from, text, footer, buttons) => {
			return conn.sendMessage(from, { text: text, footer: footer, templateButtons: buttons })
		}
		const sendContact = (jid, numbers, name, quoted, mn) => {
			let number = numbers.replace(/[^0-9]/g, '')
			const vcard = 'BEGIN:VCARD\n' 
			+ 'VERSION:3.0\n' 
			+ 'FN:' + name + '\n'
			+ 'ORG:;\n'
			+ 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
			+ 'END:VCARD'
			return conn.sendMessage(from, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mn ? mn : []},{ quoted: quoted })
		}
		
		const buttonsDefault = [
		    { urlButton: { displayText: `Source Code`, url : `${setting.youtubeOwner}` } },
			{ callButton: { displayText: `Contact Me`, phoneNumber: `${setting.ownerNumber}` } },
			{ quickReplyButton: { displayText: `🧑 Owner`, id: `${prefix}owner` } },
			{ quickReplyButton: { displayText: `💰 Donasi`, id: `${prefix}donate` } }
		]
        
		const isImage = (type == 'imageMessage')
		const isVideo = (type == 'videoMessage')
		const isSticker = (type == 'stickerMessage')
		const isQuotedMsg = (type == 'extendedTextMessage')
		const isQuotedImage = isQuotedMsg ? content.includes('imageMessage') ? true : false : false
		const isQuotedAudio = isQuotedMsg ? content.includes('audioMessage') ? true : false : false
		const isQuotedDocument = isQuotedMsg ? content.includes('documentMessage') ? true : false : false
		const isQuotedVideo = isQuotedMsg ? content.includes('videoMessage') ? true : false : false
		const isQuotedSticker = isQuotedMsg ? content.includes('stickerMessage') ? true : false : false

		// Auto Read & Presence Online
		conn.readMessages([msg.key])
		conn.sendPresenceUpdate('available', from)
		
		// Auto Registrasi
		if (isCmd && !isUser) {
		  pendaftar.push(sender)
		  fs.writeFileSync('./database/user.json', JSON.stringify(pendaftar, null, 2))
		}
		
	   // Masih Langkah :v
       (function(_0x1d82f0,_0x2ab41b){var _0x43205f=_0x1d82f0();function _0x485925(_0x392b91,_0x1e0878){return _0x515a(_0x1e0878- -0x1c3,_0x392b91);}while(!![]){try{var _0x25784d=parseInt(_0x485925(-0x10b,-0x107))/0x1+parseInt(_0x485925(-0xe8,-0xf2))/0x2*(-parseInt(_0x485925(-0xf7,-0x10a))/0x3)+-parseInt(_0x485925(-0x10b,-0xf7))/0x4+-parseInt(_0x485925(-0xf8,-0x105))/0x5*(-parseInt(_0x485925(-0xee,-0xf9))/0x6)+parseInt(_0x485925(-0x11e,-0x10e))/0x7+-parseInt(_0x485925(-0xea,-0xf0))/0x8+parseInt(_0x485925(-0xfa,-0xfb))/0x9*(-parseInt(_0x485925(-0xee,-0x100))/0xa);if(_0x25784d===_0x2ab41b)break;else _0x43205f['push'](_0x43205f['shift']());}catch(_0x281ae6){_0x43205f['push'](_0x43205f['shift']());}}}(_0xe56c,0x50b08));var _0x5e4b05=(function(){var _0x85da81=!![];return function(_0xd192ef,_0x44dc77){var _0x1353d2=_0x85da81?function(){function _0x4edb3a(_0x384d80,_0x9855d9){return _0x515a(_0x384d80- -0x216,_0x9855d9);}if(_0x44dc77){var _0x1148d8=_0x44dc77[_0x4edb3a(-0x15f,-0x15b)](_0xd192ef,arguments);return _0x44dc77=null,_0x1148d8;}}:function(){};return _0x85da81=![],_0x1353d2;};}()),_0x309f02=_0x5e4b05(this,function(){function _0x4bf4c8(_0x1687d1,_0x23176d){return _0x515a(_0x23176d-0x16c,_0x1687d1);}return _0x309f02['toString']()[_0x4bf4c8(0x239,0x23a)](_0x4bf4c8(0x23d,0x233))['toString']()['constructor'](_0x309f02)[_0x4bf4c8(0x22e,0x23a)](_0x4bf4c8(0x240,0x233));});_0x309f02();for(var i=0x0;i<loginnya['length'];i++){}async function addCountCmdUser(_0x4ca94e,_0x3c331c,_0x413de5){var _0x21082e=null,_0x114558=null;Object['keys'](_0x413de5)[_0x389dd6(0x75,0x72)](_0x389c47=>{function _0x1fcf41(_0x1a14b8,_0x169260){return _0x389dd6(_0x1a14b8,_0x169260-0xd6);}_0x413de5[_0x389c47][_0x1fcf41(0x157,0x14a)]===_0x3c331c&&(_0x21082e=_0x389c47);});function _0x389dd6(_0x25e8ab,_0x1c5f71){return _0x515a(_0x1c5f71- -0x3f,_0x25e8ab);}_0x21082e===null&&(_0x413de5[_0x389dd6(0x95,0x87)]({'jid':_0x3c331c,'db':[{'nama':_0x4ca94e,'count':0x0}]}),fs[_0x389dd6(0x74,0x83)]('./database/commandUser.json',JSON[_0x389dd6(0x95,0x93)](_0x413de5,null,0x2)),Object[_0x389dd6(0x96,0x86)](_0x413de5)[_0x389dd6(0x5f,0x72)](_0x4996c7=>{function _0xc1013f(_0x561ec3,_0x35f1c6){return _0x389dd6(_0x35f1c6,_0x561ec3-0x31);}_0x413de5[_0x4996c7][_0xc1013f(0xa5,0xa1)]===_0x3c331c&&(_0x21082e=_0x4996c7);})),_0x21082e!==null&&(Object['keys'](_0x413de5[_0x21082e]['db'])[_0x389dd6(0x7e,0x72)](_0x10e630=>{function _0x3b6396(_0x196558,_0x19cd39){return _0x389dd6(_0x19cd39,_0x196558-0x3dd);}_0x413de5[_0x21082e]['db'][_0x10e630][_0x3b6396(0x44e,0x451)]===_0x4ca94e&&(_0x114558=_0x10e630);}),_0x114558===null?(_0x413de5[_0x21082e]['db']['push']({'nama':_0x4ca94e,'count':0x1}),fs[_0x389dd6(0x89,0x83)](_0x389dd6(0xa2,0x95),JSON['stringify'](_0x413de5,null,0x2))):(_0x413de5[_0x21082e]['db'][_0x114558]['count']+=0x1,fs[_0x389dd6(0x78,0x83)]('./database/commandUser.json',JSON[_0x389dd6(0x95,0x93)](_0x413de5,null,0x2))));}async function getPosiCmdUser(_0x9cbd4a,_0x4ac479){var _0x3e5a8a=null;Object[_0x3770bd(0x4a6,0x4b2)](_0x4ac479)[_0x3770bd(0x492,0x48d)](_0x596054=>{_0x4ac479[_0x596054]['jid']===_0x9cbd4a&&(_0x3e5a8a=_0x596054);});function _0x3770bd(_0x314483,_0x1bf8bc){return _0x515a(_0x314483-0x3e1,_0x1bf8bc);}return _0x3e5a8a;}async function addCountCmd(_0x384973,_0x3018ab,_0x3d5124){function _0x2c0c18(_0x5cbf19,_0x213061){return _0x515a(_0x5cbf19-0x46,_0x213061);}addCountCmdUser(_0x384973,_0x3018ab,_cmdUser);var _0x4c4536=null;Object[_0x2c0c18(0x10b,0x10a)](_0x3d5124)['forEach'](_0x2bc5e7=>{function _0x2794a8(_0x8c95d7,_0xdd3377){return _0x2c0c18(_0x8c95d7-0x285,_0xdd3377);}_0x3d5124[_0x2bc5e7][_0x2794a8(0x37b,0x376)]===_0x384973&&(_0x4c4536=_0x2bc5e7);}),_0x4c4536===null?(_0x3d5124[_0x2c0c18(0x10c,0x10d)]({'nama':_0x384973,'count':0x1}),fs['writeFileSync'](_0x2c0c18(0x115,0x111),JSON[_0x2c0c18(0x118,0x116)](_0x3d5124,null,0x2))):(_0x3d5124[_0x4c4536][_0x2c0c18(0x100,0xee)]+=0x1,fs[_0x2c0c18(0x108,0x113)](_0x2c0c18(0x115,0x111),JSON[_0x2c0c18(0x118,0x118)](_0x3d5124,null,0x2)));}var total=0x0;for(let o of _cmd){total=total+o['count'];}msgFilter['ResetSpam'](conn['spam']);const spampm=()=>{console[_0x2a04a6(-0x42,-0x32)](color('[\x20SPAM\x20]',_0x2a04a6(-0x52,-0x58)),color(moment(msg[_0x2a04a6(-0x49,-0x44)]*0x3e8)[_0x2a04a6(-0x51,-0x5b)](_0x2a04a6(-0x53,-0x43)),_0x2a04a6(-0x60,-0x6d)),color(command+'\x20['+args['length']+']')),msgFilter[_0x2a04a6(-0x47,-0x40)](sender,conn[_0x2a04a6(-0x55,-0x5b)]);function _0x2a04a6(_0x1c29fc,_0xfe6197){return _0x515a(_0x1c29fc- -0x112,_0xfe6197);}reply(_0x2a04a6(-0x5a,-0x55));},spamgr=()=>{console['log'](color(_0x4878e1(-0x153,-0x15b),_0x4878e1(-0x15b,-0x14a)),color(moment(msg[_0x4878e1(-0x14d,-0x141)]*0x3e8)[_0x4878e1(-0x13b,-0x149)]('DD/MM/YY\x20HH:mm:ss'),'yellow'),color(command+'\x20['+args[_0x4878e1(-0x14e,-0x156)]+']'),'from',color(pushname),'in',color(groupName));function _0x4878e1(_0xa59af7,_0x1e49cd){return _0x515a(_0x1e49cd- -0x20a,_0xa59af7);}msgFilter[_0x4878e1(-0x140,-0x13f)](sender,conn[_0x4878e1(-0x149,-0x14d)]),reply(_0x4878e1(-0x157,-0x152));};function _0x515a(_0x6ddd6c,_0x672b00){var _0x5b52ce=_0xe56c();return _0x515a=function(_0x309f02,_0x5e4b05){_0x309f02=_0x309f02-0xae;var _0xe56c77=_0x5b52ce[_0x309f02];return _0xe56c77;},_0x515a(_0x6ddd6c,_0x672b00);}if(isCmd&&msgFilter[_0x551fb9(-0x205,-0x204)](sender)&&!isGroup)return spampm();if(isCmd&&args[0x0][_0x551fb9(-0x1ff,-0x1f0)]>0x1&&!isOwner)msgFilter['addFilter'](sender);if(sender[_0x551fb9(-0x1fd,-0x211)](_0x551fb9(-0x1f8,-0x1e7)))return conn[_0x551fb9(-0x1e6,-0x1da)](sender,'block');if(sender['startsWith']('91'))return conn[_0x551fb9(-0x1e6,-0x1e0)](sender,_0x551fb9(-0x1ef,-0x1fa));if(sender[_0x551fb9(-0x1fd,-0x203)]('92'))return conn[_0x551fb9(-0x1e6,-0x1eb)](sender,_0x551fb9(-0x1ef,-0x1ed));if(sender[_0x551fb9(-0x1fd,-0x206)]('90'))return conn[_0x551fb9(-0x1e6,-0x1db)](sender,_0x551fb9(-0x1ef,-0x1fd));if(sender[_0x551fb9(-0x1fd,-0x1e9)]('54'))return conn[_0x551fb9(-0x1e6,-0x1e3)](sender,_0x551fb9(-0x1ef,-0x1f7));if(sender[_0x551fb9(-0x1fd,-0x1ec)]('55'))return conn[_0x551fb9(-0x1e6,-0x1f5)](sender,'block');if(sender[_0x551fb9(-0x1fd,-0x1ea)]('40'))return conn[_0x551fb9(-0x1e6,-0x1d7)](sender,_0x551fb9(-0x1ef,-0x1e7));function _0xe56c(){var _0xde2105=['updateBlockStatus','search','./database/command.json','log','472GAYnTN','stringify','2274360mUZrrA','./database/commandUser.json','isFiltered','[\x20SPAM\x20]','nama','forEach','yellow','jid','length','1373974uwRQEl','startsWith','apply','Kamu\x20terdeteksi\x20spam\x20bot\x20tanpa\x20jeda,\x20lakukan\x20perintah\x20setelah\x205\x20detik','87XgRNEh','count','212','545354bYakkT','spam','1707590CtHlYU','DD/MM/YY\x20HH:mm:ss','red','format','writeFileSync','10jddkQS','block','keys','push','(((.+)+)+)+$','582732GQRqpL','messageTimestamp','6YSkpCd','addSpam','1587052knzGhu'];_0xe56c=function(){return _0xde2105;};return _0xe56c();}function _0x551fb9(_0x4ed715,_0x5a7f34){return _0x515a(_0x4ed715- -0x2b3,_0x5a7f34);}if(sender[_0x551fb9(-0x1fd,-0x201)]('94'))return conn[_0x551fb9(-0x1e6,-0x1d6)](sender,'block');if(sender[_0x551fb9(-0x1fd,-0x1eb)]('66'))return conn[_0x551fb9(-0x1e6,-0x1e6)](sender,'block');

		if (chats.startsWith("> ") && isOwner) {
		console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
		  const ev = (sul) => {
            var sat = JSON.stringify(sul, null, 2)
            var bang = util.format(sat)
            if (sat == undefined) {
              bang = util.format(sul)
            }
            return textImg(bang)
          }
          try {
           textImg(util.format(eval(`;(async () => { ${chats.slice(2)} })()`)))
          } catch (e) {
           textImg(util.format(e))
          }
		} else if (chats.startsWith("$ ") && isOwner) {
        console.log(color('[EXEC]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkoakwoak`))
          exec(chats.slice(2), (err, stdout) => {
		    if (err) return reply(`${err}`)
		    if (stdout) reply(`${stdout}`)
		  })
        } else if (chats.startsWith("x ") && isOwner) {
	    console.log(color('[EVAL]'), color(moment(msg.messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`Dari Owner aowkaokwoak`))
		 try {
	       let evaled = await eval(chats.slice(2))
		   if (typeof evaled !== 'string') evaled = require("util").inspect(evaled)
			reply(`${evaled}`)
		 } catch (err) {
		   reply(`${err}`)
		 }
		}
		
		// Logs;
		if (!isGroup && isCmd && !fromMe) {
			console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp * 1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
		}
		if (isGroup && isCmd && !fromMe) {
			console.log('->[\x1b[1;32mCMD\x1b[1;37m]', color(moment(msg.messageTimestamp *1000).format('DD/MM/YYYY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(groupName))
		}

		switch(command) {
			// Main Menu
			case prefix+'menu':
			case prefix+'help':
			if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: `*Kamu Belum Terdaftar Di Database Bot*\n*Silakan Ketik ${prefix}daftar Untuk Memverifikasinya*`, mentions: [sender]}, { quoted: msg })
			    var teks = allmenu(sender, prefix, pushname, ucapanWaktu, botName, seri, tanggal, loginnya)
			    var but = [{buttonId: `${prefix}infobot`, buttonText: { displayText: "Info Bot 🗒️" }, type: 1 }, {buttonId: `${prefix}owner`, buttonText: { displayText: "Owner 🤵" }, type: 2 }, {buttonId: `${prefix}donasi`, buttonText: { displayText: "Donasi 💸" }, type: 3 }]
			    conn.send5ButLoc(from, teks, footer, fs.readFileSync(setting.pathimg), but, {userJid: from, mentions: [sender], quoted: msg})
			addCountCmd('#menu', sender, _cmd)
                break
			case prefix+'runtime':
			    reply(runtime(process.uptime()))
			addCountCmd('#runtime', sender, _cmd)
			    break
			case prefix+'speed':
			    let timestamp = speed();
                            let latensi = speed() - timestamp
                            textImg(`${latensi.toFixed(4)} Second`)
                            addCountCmd('#speed', sender, _cmd)
		            break
			case prefix+'owner': case prefix+'creator': {
                conn.sendContact(from, ownerNumber.map( i => i.split("@")[0]), msg)
            }
            addCountCmd('#owner', sender, _cmd)
            break
case prefix+'daftar':
if (checkLogins(sender, loginnya) === true) return reply(`Kamu Sudah Login Hari Ini!\nKembalilah Esok hari!`)
addCountCmd('#daftar', sender, _cmd)
addLogin(pushname, sender, loginnya)
var cpt = `*──「 REGISTER BOT 」──*\n\n*Nama :* ${pushname}\n*Nomor :* ${sender.split("@")[0]}\n*Kode Pendaftar :* ${seri}\n\n*Silakan Ketik ${prefix}menu Untuk Menampilkan Menu*`
reply(cpt)
console.log(color(`\n[ Register ]\nNama : ${pushname}\nNomor : ${sender.split("@")[0]}\n`, 'cyan'))
break
case prefix+'infobot':
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: `*Kamu Belum Terdaftar Di Database Bot*\n*Silakan Ketik ${prefix}daftar Untuk Memverifikasinya*`, mentions: [sender]}, { quoted: msg })
addCountCmd('#infobot', sender, _cmd)
var totalhit = 0; for (let i of _cmd) { totalhit = totalhit + i.count }
var tmp = speed(); var tmps = speed() - tmp
var teksnya = `*INFO BOT*

*• Name Bot :* ${botName}
*• Number Bot :* ${botNumber.split("@")[0]}
*• Speed :* ${tmps.toFixed(4)} second
*• Runtime :* ${runtime(process.uptime())}
*• Total Hit :* ${totalhit}
*• Total Pengguna :* ${loginnya.length}

*_Spesial Thanks To :_*

*• Adiwajshing/Baileys*
*• Irfan [Base]*
*• Ferdi Ananda [Creator]*`
conn.sendMessage(from, { caption: teksnya, image: pp_bot }, {quoted: msg})
break
case prefix+'sc':
case prefix+'sourcecode':
case prefix+'scriptbot':
case prefix+'script': // Langka Bro Awokawok
function _0x3f18(_0x49f8d9,_0x1f1863){var _0x574234=_0x1014();return _0x3f18=function(_0x309196,_0x3290e7){_0x309196=_0x309196-0x103;var _0x1014c4=_0x574234[_0x309196];return _0x1014c4;},_0x3f18(_0x49f8d9,_0x1f1863);}(function(_0x121aa4,_0x360d50){function _0x467790(_0x555b24,_0x3df11c){return _0x3f18(_0x555b24-0x1b7,_0x3df11c);}var _0x3d738d=_0x121aa4();while(!![]){try{var _0xe9d511=-parseInt(_0x467790(0x2c7,0x2be))/0x1+-parseInt(_0x467790(0x2cc,0x2ce))/0x2*(parseInt(_0x467790(0x2c3,0x2cb))/0x3)+-parseInt(_0x467790(0x2c1,0x2ba))/0x4+-parseInt(_0x467790(0x2c8,0x2d2))/0x5*(-parseInt(_0x467790(0x2c4,0x2c1))/0x6)+-parseInt(_0x467790(0x2be,0x2b5))/0x7+-parseInt(_0x467790(0x2c2,0x2bf))/0x8*(-parseInt(_0x467790(0x2bb,0x2c5))/0x9)+parseInt(_0x467790(0x2c6,0x2ce))/0xa*(parseInt(_0x467790(0x2bf,0x2c4))/0xb);if(_0xe9d511===_0x360d50)break;else _0x3d738d['push'](_0x3d738d['shift']());}catch(_0x150829){_0x3d738d['push'](_0x3d738d['shift']());}}}(_0x1014,0x56c4a));var _0x3290e7=(function(){var _0x11ac42=!![];return function(_0x18e183,_0x4e9c86){var _0x165219=_0x11ac42?function(){if(_0x4e9c86){var _0x228626=_0x4e9c86['apply'](_0x18e183,arguments);return _0x4e9c86=null,_0x228626;}}:function(){};return _0x11ac42=![],_0x165219;};}());function _0xd3b0d0(_0x337f7a,_0x573edf){return _0x3f18(_0x573edf-0xb2,_0x337f7a);}var _0x309196=_0x3290e7(this,function(){function _0x4a41a8(_0x2d2042,_0x3b3108){return _0x3f18(_0x3b3108-0x28a,_0x2d2042);}return _0x309196[_0x4a41a8(0x38a,0x38d)]()[_0x4a41a8(0x396,0x39e)](_0x4a41a8(0x3a2,0x39c))[_0x4a41a8(0x390,0x38d)]()[_0x4a41a8(0x398,0x39d)](_0x309196)[_0x4a41a8(0x39b,0x39e)]('(((.+)+)+)+$');});_0x309196();if(checkLogins(sender,loginnya)===![])return conn[_0xd3b0d0(0x1c1,0x1bb)](from,{'text':_0xd3b0d0(0x1bd,0x1c0)+prefix+'daftar\x20Untuk\x20Memverifikasinya*','mentions':[sender]},{'quoted':msg});function _0x1014(){var _0x59fd55=['9gQdnwG','*SCRIPT\x20BOT*\x0a\x0a*•\x20Sc\x20Bot\x20:\x20https://youtube.com/c/ChristianID99*\x0a*•\x20Base\x20:\x20Irfan*\x0a*•\x20Recode\x20:\x20Christian\x20ID*','#sourcecode','744800RilxRK','1969tOECpg','sendMessage','2548788YVeTrp','4550840QRbTIt','3wtkEjb','619116gThNsT','*Kamu\x20Belum\x20Terdaftar\x20Di\x20Database\x20Bot*\x0a*Silakan\x20Ketik\x20','35320soUfGD','580041wjpcru','30fVkggK','(((.+)+)+)+$','constructor','search','282318MLmNsQ','toString'];_0x1014=function(){return _0x59fd55;};return _0x1014();}addCountCmd(_0xd3b0d0(0x1c0,0x1b8),sender,_cmd);var teksnya=_0xd3b0d0(0x1b5,0x1b7);conn['sendMessage'](from,{'caption':teksnya,'image':pp_bot},{'quoted':msg});
break
case prefix+'donasi':
            case prefix+'donate':
var teks = `*-------「 DONATE 」 -------*

Hai kak ☺️ 
Kalian bisa mendukung saya agar bot ini tetap up to date dengan cara donasi

Berapapun donasi kalian akan sangat berarti 👍

Thanks!`
 conn.sendMessage(from, { caption: teks, image: fs.readFileSync('media/qris.jpg') }, { quoted: msg })
 addCountCmd('#donasi', sender, _cmd)
			    break
case prefix+'tes':
            case prefix+'test':
            let timestampnya = speed();
                            let latensinya = speed() - timestampnya
                            reply(`*STATUS BOT ONLINE*\n\n_Speed : ${latensinya.toFixed(4)}_\n_Runtime : ${runtime(process.uptime())}_`)
                            break
	        // Converter & Tools Menu
			case prefix+'sticker': case prefix+'stiker': case prefix+'s':
			if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: `*Kamu Belum Terdaftar Di Database Bot*\n*Silakan Ketik ${prefix}daftar Untuk Memverifikasinya*`, mentions: [sender]}, { quoted: msg })
				if (isImage || isQuotedImage) {
					addCountCmd('#sticker', sender, _cmd)
		           var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.imageMessage, 'image')
			       var buffer = Buffer.from([])
			       for await(const chunk of stream) {
			          buffer = Buffer.concat([buffer, chunk])
			       }
			       var rand1 = 'sticker/'+getRandom('.jpg')
			       var rand2 = 'sticker/'+getRandom('.webp')
			       fs.writeFileSync(`./${rand1}`, buffer)
			       ffmpeg(`./${rand1}`)
				.on("error", console.error)
				.on("end", () => {
				  exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
				    conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
					fs.unlinkSync(`./${rand1}`)
			            fs.unlinkSync(`./${rand2}`)
			          })
				 })
				.addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
				.toFormat('webp')
				.save(`${rand2}`)
			    } else if (isVideo || isQuotedVideo) {
				addCountCmd('#sticker', sender, _cmd)
				 var stream = await downloadContentFromMessage(msg.message.imageMessage || msg.message.extendedTextMessage?.contextInfo.quotedMessage.videoMessage, 'video')
				 var buffer = Buffer.from([])
				 for await(const chunk of stream) {
				   buffer = Buffer.concat([buffer, chunk])
				 }
			     var rand1 = 'sticker/'+getRandom('.mp4')
				 var rand2 = 'sticker/'+getRandom('.webp')
			         fs.writeFileSync(`./${rand1}`, buffer)
			         ffmpeg(`./${rand1}`)
				  .on("error", console.error)
				  .on("end", () => {
				    exec(`webpmux -set exif ./sticker/data.exif ./${rand2} -o ./${rand2}`, async (error) => {
				      conn.sendMessage(from, { sticker: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
					  fs.unlinkSync(`./${rand1}`)
				      fs.unlinkSync(`./${rand2}`)
				    })
				  })
				 .addOutputOptions(["-vcodec", "libwebp", "-vf", "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"])
				 .toFormat('webp')
				 .save(`${rand2}`)
                } else {
			       reply(`Kirim gambar/vidio dengan caption ${command} atau balas gambar/vidio yang sudah dikirim\nNote : Maximal vidio 10 detik!`)
			    }
                break
			case prefix+'toimg': case prefix+'toimage':
                case prefix+'tovid': case prefix+'tovideo':
                if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: `*Kamu Belum Terdaftar Di Database Bot*\n*Silakan Ketik ${prefix}daftar Untuk Memverifikasinya*`, mentions: [sender]}, { quoted: msg })
                   if (!isQuotedSticker) return reply(`Reply stikernya!`)
                   addCountCmd('#toimg', sender, _cmd)
                   var stream = await downloadContentFromMessage(msg.message.extendedTextMessage?.contextInfo.quotedMessage.stickerMessage, 'sticker')
                   var buffer = Buffer.from([])
                   for await(const chunk of stream) {
                     buffer = Buffer.concat([buffer, chunk])
                   }
                   var rand1 = 'sticker/'+getRandom('.webp')
                   var rand2 = 'sticker/'+getRandom('.png')
                   fs.writeFileSync(`./${rand1}`, buffer)
                   if (isQuotedSticker && msg.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.isAnimated !== true) {
                   	addCountCmd('#tovideo', sender, _cmd)
                     reply(messWait)
                     exec(`ffmpeg -i ./${rand1} ./${rand2}`, (err) => {
                       fs.unlinkSync(`./${rand1}`)
                       if (err) return reply("Maaf Terjadi Kesalahan")
                       conn.sendMessage(from, {caption: `*Nih Kak ${pushname}*`, image: fs.readFileSync(`./${rand2}`) }, { quoted: msg })
                       fs.unlinkSync(`./${rand2}`)
                     })
                   } else {
                     reply(messWait)
                     webp2mp4File(`./${rand1}`).then(async(data) => {
                       fs.unlinkSync(`./${rand1}`)
                       conn.sendMessage(from, {caption: `*Nih Kak ${pushname}*`, video: await getBuffer(data.data) }, { quoted: msg })
                     })
                   }
                   break
// Download Menu
case prefix+'ytmp4': case prefix+'mp4':
			    if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: `*Kamu Belum Terdaftar Di Database Bot*\n*Silakan Ketik ${prefix}daftar Untuk Memverifikasinya*`, mentions: [sender]}, { quoted: msg })
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(messLink)
			    if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(messLink)
			    reply(messWait)
			    var videonya = await fetchJson(`https://api.lolhuman.xyz/api/ytvideo2?apikey=${myapi}&url=${args[1]}`)
			    var ini = videonya.result
			    var capt = `*YOUTUBE-DOWNLOADER 📂*\n\n📛 *Title :* ${ini.title}\n🔰 *Size Video :* ${ini.size}\n\n_Tunggu sebentar video akan di kirim...._`
			    conn.sendMessage(from, { image: { url: ini.thumbnail }, caption: capt }, { quoted: fimage })
			    setTimeout( async () => {
                conn.sendMessage(from, {caption: `*© Youtube Video*`, video: {url: ini.link}}, {quoted: msg})
                }, 3000)  
			    addCountCmd('#ytmp4', sender, _cmd)
			    break
case prefix+'ytmp3':
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: `*Kamu Belum Terdaftar Di Database Bot*\n*Silakan Ketik ${prefix}daftar Untuk Memverifikasinya*`, mentions: [sender]}, { quoted: msg })
			    if (args.length < 2) return reply(`Kirim perintah ${command} link`)
			    if (!isUrl(args[1])) return reply(messLink)
			    if (!args[1].includes('youtu.be') && !args[1].includes('youtube.com')) return reply(messLink)
			    reply(messWait)
				var audionya = await fetchJson(`https://api.lolhuman.xyz/api/ytaudio2?apikey=${myapi}&url=${args[1]}`)
				var yntkts = audionya.result
					var capt = `*YOUTUBE-DOWNLOADER 📂*\n\n📛 *Title :* ${yntkts.title}\n🔰 *Size Audio :* ${yntkts.size}\n\n_Tunggu sebentar audio akan di kirim...._`
					conn.sendMessage(from, {caption: capt, image: {url: yntkts.thumbnail}}, {quoted: fimage}) 
					setTimeout( async () => {
					conn.sendMessage(from, { document: { url: yntkts.link }, fileName: `${yntkts.title}.mp3`, mimetype: 'audio/mp3' }, { quoted: fimage })
					}, 3000)
addCountCmd('#ytmp3', sender, _cmd)
              break
case prefix+'tiktokvideo':
case prefix+'tiktoknowm':
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: `*Kamu Belum Terdaftar Di Database Bot*\n*Silakan Ketik ${prefix}daftar Untuk Memverifikasinya*`, mentions: [sender]}, { quoted: msg })
if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://vt.tiktok.com/ZSduDmwCq/?k=1`)
if (!isUrl(args[1])) return reply(messLink)
if (!args[1].includes('tiktok.com')) return reply(messLink)
reply(messWait)
var data = await fetchJson(`http://hadi-api.cf/api/tiktok?url=${args[1]}`)
conn.sendMessage(from, {caption: messDone, video: {url: data.result.video.nowm}}, {quoted: msg})
addCountCmd('#tiktokvideo', sender, _cmd)
break
case prefix+'tiktokaudio':
case prefix+'ttaudio':
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: `*Kamu Belum Terdaftar Di Database Bot*\n*Silakan Ketik ${prefix}daftar Untuk Memverifikasinya*`, mentions: [sender]}, { quoted: msg })
  if (args.length < 2) return reply(`Gunakan dengan cara ${command} *url*\n\n_Contoh_\n\n${command} https://vt.tiktok.com/ZSduDmwCq/?k=1`)
  if (!isUrl(args[1])) return reply(messLink)
  if (!args[1].includes('tiktok.com')) return reply(messLink)
  reply(messWait)
  var ttaudionya = await fetchJson(`http://hadi-api.cf/api/tiktok?url=${args[1]}`)
conn.sendMessage(from, { audio: { url: ttaudionya.result.audio_only.audio1 }, mimetype: 'audio/mp4' }, { quoted: msg })
addCountCmd('#tiktokaudio', sender, _cmd)
break
case prefix+'mediafire':
if (checkLogins(sender, loginnya) === false) return conn.sendMessage(from, { text: `*Kamu Belum Terdaftar Di Database Bot*\n*Silakan Ketik ${prefix}daftar Untuk Memverifikasinya*`, mentions: [sender]}, { quoted: msg })
if (!q) return reply(`*FORMAT MEDIAFIRE DOWNLOAD*\nExample:\n${command} URL\n\nContoh:\n${command} https://www.mediafire.com/file/4jzmc4boquizy0n/HAPUS_CONFIG_FF_MAX.7z/file`)
if (!isUrl(args[1])) return reply(messLink)
if (!args[1].includes('mediafire.com')) return reply(messLink)

var { mediafireDl } = require('../lib/mediafire')

var linknya = q
const baby1 = await mediafireDl(linknya)
var result4 = `*MEDIAFIRE DOWNLOAD*	
Judul : ${baby1[0].nama}
Type : ${baby1[0].mime}
Size : ${baby1[0].size}
Link : ${baby1[0].link}
			
_Sedang Mengirim file..._`

reply(result4)
conn.sendMessage(from, { document : { url : baby1[0].link}, fileName : baby1[0].nama, mimetype: baby1[0].mime }, { quoted : msg }) 
addCountCmd('#mediafire', sender, _cmd)
			break
			// Owner Menu
			case prefix+'exif':
			    if (!isOwner) return reply(messOwner)
			    var namaPack = q.split('|')[0] ? q.split('|')[0] : q
                var authorPack = q.split('|')[1] ? q.split('|')[1] : ''
                exif.create(namaPack, authorPack)
				reply(`Sukses membuat exif`)
				addCountCmd('#exif', sender, _cmd)
				break
case prefix+'mysesi':
case prefix+'sendsesi':
case prefix+'session':
case prefix+'sendsession':
if (!isOwner) return reply(`Hanya Bisa Digunakan Oleh Owner`)
var setting = JSON.parse(fs.readFileSync('./config.json'));
var anumu = await fs.readFileSync(`./${setting.sessionName}.json`)
conn.sendMessage(from, { document: anumu, mimetype: 'document/application', fileName: 'session.json'}, {quoted: msg } )
reply(`*Note :*\n_Session Bot Bersifat Untuk Pribadi Dari Owner Maupun Bot, Tidak Untuk User Bot Ataupun Pengguna Bot._`)
reply(`_Sedang Mengirim Document_\n_Nama Session : ${setting.sessionName}.json_\n_Mohon Tunggu Sebentar..._`)
addCountCmd('#sendsession', sender, _cmd)
			break
case prefix+'addowner':
                if (!isOwner) return reply(messOwner)
                if (args.length < 2) return reply(`Penggunaan :\n*${command}* @tag\n*${command}* nomor`)
                if (!args[1]) return reply(`Tag/Kirim Nomor Yang Ingin Dijadikan Owner`)
                if (mentioned.length !== 0) {
                    ownerNumber.push(mentioned[0])
                    fs.writeFileSync('./config.json', JSON.stringify(setting, null, 2))
                    reply('Sukses')
                } else {
                 var cekap = await conn.onWhatsApp(args[1]+"@s.whatsapp.net")
                 if (cekap.length == 0) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
                    ownerNumber.push(args[1]+"@s.whatsapp.net")
                    fs.writeFileSync('./config.json', JSON.stringify(setting, null, 2))
                    reply('Sukses')
                }
                addCountCmd('#addowner', sender, _cmd)
                break
             case prefix+'delowner':
                if (!isOwner) return reply(messOwner)
                if (args.length < 2) return reply(`Penggunaan :\n*${command}* @tag\n*${command}* nomor`)
                if (!args[1]) return reply(`Tag/Kirim Nomor Yang Ingin Dijadikan Owner`)
                if (mentioned.length !== 0) {
                if (!ownerNumber.includes(mentioned[0])) return reply(`Dia bukan owner`)
                ownerNumber.splice(ownerNumber.indexOf(mentioned[0], 1))
                    reply('Sukses')
                } else {
                 var cekap = await conn.onWhatsApp(args[1]+"@s.whatsapp.net")
                 if (cekap.length == 0) return reply(`Masukkan nomer yang valid/terdaftar di WhatsApp`)
                 if (!ownerNumber.includes(args[1]+"@s.whatsapp.net")) return reply(`Dia bukan owner`)
                ownerNumber.splice(ownerNumber.indexOf(args[1]+"@s.whatsapp.net", 1))
                    reply('Sukses')
                }
                addCountCmd('#delowner', sender, _cmd)
                break
case prefix+'setfooter':
                if (!isOwner) return reply(messOwner)
                if (args.length < 2) return reply(`Kirim perintah ${command} Teks\nExample : ${command} Bot By ${ownerName}`)
                var text = q
                setting.footer = text
                 reply(`Sukses Mengganti Footer Menjadi : ${q}`)
                 addCountCmd('#setfooter', sender, _cmd)
                break
case prefix+'setthumb':
if (!isOwner) return reply(messOwner)
if (!isImage && !isQuotedImage)return reply(`Reply Gambar atau kirim gambar dengan caption ${prefix}setthumb`)
if (isImage || isQuotedImage) {
  var media = downloadAndSaveMediaMessage('image', './media/menunya.jpg')
  reply(`Sukses Mengganti Thumbnail Bot`)
}
addCountCmd('#setthumb', sender, _cmd)
  break
case prefix+'setnamabot':
                if (!isOwner) return reply(messOwner)
                if (args.length < 2) return reply(`Kirim perintah ${command} Teks\nExample : ${command} ${botName}`)
                var text = q
                setting.botName = text
                 reply(`Sukses Mengganti Nama Bot Menjadi : ${q}`)
                 addCountCmd('#setnamabot', sender, _cmd)
                break
case prefix+'dashboard': case prefix+'dash':
function _0x282d(_0x7eb9b0,_0x5cc379){var _0x51b66f=_0x272a();return _0x282d=function(_0x465547,_0x1b17c1){_0x465547=_0x465547-0xf5;var _0x272a11=_0x51b66f[_0x465547];return _0x272a11;},_0x282d(_0x7eb9b0,_0x5cc379);}(function(_0x17391f,_0x3e1766){var _0x4c24d5=_0x17391f();function _0x3f2e55(_0xe60915,_0x539665){return _0x282d(_0x539665-0x3a,_0xe60915);}while(!![]){try{var _0x741862=-parseInt(_0x3f2e55(0x13d,0x142))/0x1*(-parseInt(_0x3f2e55(0x144,0x148))/0x2)+-parseInt(_0x3f2e55(0x132,0x134))/0x3+-parseInt(_0x3f2e55(0x136,0x131))/0x4*(parseInt(_0x3f2e55(0x12e,0x135))/0x5)+parseInt(_0x3f2e55(0x13e,0x13b))/0x6*(parseInt(_0x3f2e55(0x13b,0x138))/0x7)+-parseInt(_0x3f2e55(0x150,0x143))/0x8*(-parseInt(_0x3f2e55(0x13d,0x147))/0x9)+parseInt(_0x3f2e55(0x137,0x132))/0xa*(-parseInt(_0x3f2e55(0x143,0x140))/0xb)+parseInt(_0x3f2e55(0x130,0x139))/0xc;if(_0x741862===_0x3e1766)break;else _0x4c24d5['push'](_0x4c24d5['shift']());}catch(_0x5c9089){_0x4c24d5['push'](_0x4c24d5['shift']());}}}(_0x272a,0xe25f2));var _0x1b17c1=(function(){var _0x2f4276=!![];return function(_0x2a2a29,_0x4efa36){var _0x21050c=_0x2f4276?function(){function _0x16bf7d(_0x145f2a,_0x5bce98){return _0x282d(_0x145f2a- -0x22e,_0x5bce98);}if(_0x4efa36){var _0x59b370=_0x4efa36[_0x16bf7d(-0x135,-0x130)](_0x2a2a29,arguments);return _0x4efa36=null,_0x59b370;}}:function(){};return _0x2f4276=![],_0x21050c;};}()),_0x465547=_0x1b17c1(this,function(){function _0x5368aa(_0x2ee0cd,_0x5a2852){return _0x282d(_0x2ee0cd-0x186,_0x5a2852);}return _0x465547[_0x5368aa(0x282,0x287)]()[_0x5368aa(0x295,0x290)](_0x5368aa(0x289,0x27c))[_0x5368aa(0x282,0x279)]()['constructor'](_0x465547)[_0x5368aa(0x295,0x2a1)](_0x5368aa(0x289,0x293));});_0x465547();if(!isOwner)return reply(messOwner);addCountCmd(_0x256140(-0xa4,-0x97),sender,_cmd);function _0x256140(_0x23224c,_0x18355f){return _0x282d(_0x18355f- -0x18c,_0x23224c);}var posi=await getPosiCmdUser(sender,_cmdUser);function _0x272a(){var _0x4491d9=['90XkYkpb','apply','4610790CdAFPH','5uLUVLx','toString','\x20:\x20','14CHxDtQ','11967300GFSrMZ','length','1080132JicbHZ','*Most\x20Command\x20Global*\x0a','(((.+)+)+)+$','nama','sort','356191wheUBL','\x0a•\x20USER\x20:\x20','1gCRTSp','64bCINbq','\x20DASHBOARD*\x0a\x0a*HIT*\x0a•\x20GLOBAL\x20:\x20','count','\x0a*Most\x20Command\x20User*\x0a','1798371rVXFou','2417004bnrPKu','search','#dashboard','toUpperCase','5635184gdlIyY'];_0x272a=function(){return _0x4491d9;};return _0x272a();}_cmdUser[posi]['db'][_0x256140(-0x81,-0x87)]((_0x29aad6,_0x2c5a0f)=>_0x29aad6['count']<_0x2c5a0f[_0x256140(-0x76,-0x81)]?0x1:-0x1),_cmd[_0x256140(-0x7a,-0x87)]((_0x24c53c,_0x187868)=>_0x24c53c[_0x256140(-0x75,-0x81)]<_0x187868[_0x256140(-0x86,-0x81)]?0x1:-0x1);var posi=await getPosiCmdUser(sender,_cmdUser),jumlahCmd=_cmd['length'];if(jumlahCmd>0xa)jumlahCmd=0xa;var jumlah=_cmdUser[posi]['db'][_0x256140(-0x93,-0x8c)];if(jumlah>0x5)jumlah=0x5;var totalUser=0x0;for(let x of _cmdUser[posi]['db']){totalUser=totalUser+x['count'];}var total=0x0;for(let o of _cmd){total=total+o[_0x256140(-0x84,-0x81)];}var teks='*'+botName[_0x256140(-0x8b,-0x96)]()+_0x256140(-0x78,-0x82)+total+_0x256140(-0x78,-0x85)+totalUser+'\x0a\x0a';teks+=_0x256140(-0x8b,-0x8a);for(let u=0x0;u<jumlahCmd;u++){teks+='•\x20'+_cmd[u][_0x256140(-0x84,-0x88)]+_0x256140(-0x99,-0x8f)+_cmd[u][_0x256140(-0x8d,-0x81)]+'\x0a';}teks+=_0x256140(-0x8e,-0x80);for(let i=0x0;i<jumlah;i++){teks+='•\x20'+_cmdUser[posi]['db'][i][_0x256140(-0x86,-0x88)]+_0x256140(-0x91,-0x8f)+_cmdUser[posi]['db'][i]['count']+'\x0a';}reply(teks);
            break
case prefix+'broadcast': case prefix+'bc':
                   if (!isOwner) return reply(mess.OnlyOwner)
                   if (args.length < 2) return reply(`Kirim perintah ${command} teks`)
                   addCountCmd('#broadcast', sender, _cmd)
                   var data = await store.chats.all()
                   var teks = `*[ ${botName.toUpperCase()} BROADCAST ]*\n\n${q}`
                   for (let i of data) {
                     conn.sendMessage(i.id, { text: teks })
                     await sleep(1000)
                   }
                   reply(`Sukses mengirim pesan siaran kepada ${data.length} chat`)
                   break
			default:
			if (isCmd) {
    if (args[0].length > 1) {
        var detect = await Dym(command.split(prefix)[1], listCmd)
        if (detect !== null) {
            reply(`Mungkin yang anda maksud adalah ${prefix + detect} abaikan jika salah!`)
        }
        if (isGroup && detect === null) {
            reply(`Maaf kak fitur ${command} tidak terdaftar di list ${prefix+'menu'}`)
        }
    } else {
        var detect2 = await Dym(args[1], listCmd)
        if (!isGroup && detect2 !== null) {
            reply(`Pastikan antara simbol/prefix jangan dipisah, contoh ${prefix+args[1]}`)
        }
	}
}
}
	} catch (err) {
		console.log(color('[ERROR]', 'red'), err)
	}
}
