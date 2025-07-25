// window 全局对象  访问全局变量，函数
window = this  // 模拟的就是window对象  指向的是global对象 （全局)
// 导入模块
const crypto = require('crypto')
// 导入des加密的模块
const CryptoJS = require('crypto-js')
const akb33 = "32223"
var akb34 = "N4EDAQpO2ejqgCoX";
var akb35 = "=qoKNLgdAjJbU8zx";
var akb36 = "mAkJqt8coXQ96zML";
var akb48 = "t4ABRmeN"

// 构造md5加密
function hex_md5(e) {
    return crypto.createHash('md5').update(e).digest('hex')
}
function Base64() {
	_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", this.encode = function(a) {
		var c, d, e, f, g, h, i, b = "",
			j = 0;
		for (a = _utf8_encode(a); j < a.length;) c = a.charCodeAt(j++), d = a.charCodeAt(j++), e = a.charCodeAt(j++), f = c >> 2, g = (3 & c) << 4 | d >> 4, h = (15 & d) << 2 | e >> 6, i = 63 & e, isNaN(d) ? h = i = 64 : isNaN(e) && (i = 64), b = b + _keyStr.charAt(f) + _keyStr.charAt(g) + _keyStr.charAt(h) + _keyStr.charAt(i);
		return b
	}, this.decode = function(a) {
		var c, d, e, f, g, h, i, b = "",
			j = 0;
		for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, ""); j < a.length;) f = _keyStr.indexOf(a.charAt(j++)), g = _keyStr.indexOf(a.charAt(j++)), h = _keyStr.indexOf(a.charAt(j++)), i = _keyStr.indexOf(a.charAt(j++)), c = f << 2 | g >> 4, d = (15 & g) << 4 | h >> 2, e = (3 & h) << 6 | i, b += String.fromCharCode(c), 64 != h && (b += String.fromCharCode(d)), 64 != i && (b += String.fromCharCode(e));
		return b = _utf8_decode(b)
	}, _utf8_encode = function(a) {
		var b, c, d;
		for (a = a.replace(/\r\n/g, "\n"), b = "", c = 0; c < a.length; c++) d = a.charCodeAt(c), 128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(192 | d >> 6), b += String.fromCharCode(128 | 63 & d)) : (b += String.fromCharCode(224 | d >> 12), b += String.fromCharCode(128 | 63 & d >> 6), b += String.fromCharCode(128 | 63 & d));
		return b
	}, _utf8_decode = function(a) {
		for (var b = "", c = 0, d = c1 = c2 = 0; c < a.length;) d = a.charCodeAt(c), 128 > d ? (b += String.fromCharCode(d), c++) : d > 191 && 224 > d ? (c2 = a.charCodeAt(c + 1), b += String.fromCharCode((31 & d) << 6 | 63 & c2), c += 2) : (c2 = a.charCodeAt(c + 1), c3 = a.charCodeAt(c + 2), b += String.fromCharCode((15 & d) << 12 | (63 & c2) << 6 | 63 & c3), c += 3);
		return b
	}
}
function ObjectSort(obj) {
    var newObject = {};
    Object.keys(obj).sort().map(function (key) {
        newObject[key] = obj[key]
    });
    return newObject
}

var getParam = (function() {
    var AES = {
        encrypt: function(text) {
            var secretkey = (CryptoJS.MD5(akb34).toString()).substr(16, 16);
            var secretiv = (CryptoJS.MD5(akb35).toString()).substr(0, 16);
            secretkey = CryptoJS.enc.Utf8.parse(secretkey);
            secretiv = CryptoJS.enc.Utf8.parse(secretiv);
            var result = CryptoJS.AES.encrypt(text, secretkey, {
                iv: secretiv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            return result.toString()
        },
    };
    var DES = {
        encrypt: function(text) {
            var secretkey = (CryptoJS.MD5(akb36).toString()).substr(0, 16);
            var secretiv = (CryptoJS.MD5(akb48).toString()).substr(24, 8);
            secretkey = CryptoJS.enc.Utf8.parse(secretkey);
            secretiv = CryptoJS.enc.Utf8.parse(secretiv);
            var result = CryptoJS.DES.encrypt(text, secretkey, {
                iv: secretiv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
            return result.toString()
        },
    };

    function ObjectSort(obj) {
        var newObject = {};
        Object.keys(obj).sort().map(function(key) {
            newObject[key] = obj[key]
        });
        return newObject
    }

    function MyEncode(str) {
        var arr = akb33.split('')
        var b = new Base64;
        arr.forEach(times => {
            switch (times) {
            case "1":
                str = AES.encrypt(str)
                break;
            case "2":
                str = DES.encrypt(str)
                break;
            case "3":
                str = b.encode(str)
                break;
            }
        }
        )
        return str;
    }
    // 利用window。
    window.MyEncode = MyEncode
}
)();
var method = "GETCITYAQIRANK"
var obj = {
    "order": "desc"
}

function get_params() {
    var appId = '4f0e3a273d547ce6b7147bfa7ceb4b6e';
    var timestamp = new Date().getTime();
    var need = {
        appId: appId,
        method: method,
        timestamp: timestamp,
        clienttype: 'WEB',
        object: obj,
        secret: hex_md5(appId + method + timestamp + 'WEB' + JSON.stringify(ObjectSort(obj)))
    };
    return window.MyEncode(JSON.stringify(need))
}


// console.log(get_params(p1, p2))  // 20:52上课
