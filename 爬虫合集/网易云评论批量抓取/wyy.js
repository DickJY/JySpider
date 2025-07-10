// 直接导入模块
const CryptoJS = require('crypto-js')
const bigInt = require('big-integer')
const e = '010001'
const f = '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7'
const g = '0CoJUm6Qyw8W8jud'
function a(a) {
    var d, e, b = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", c = "";
    for (d = 0; a > d; d += 1)
        e = Math.random() * b.length,
            e = Math.floor(e),
            c += b.charAt(e);
    return c
}

function b(a, b) {  // AES加密---crypto-js
    var c = CryptoJS.enc.Utf8.parse(b)
        , d = CryptoJS.enc.Utf8.parse("0102030405060708")
        , e = CryptoJS.enc.Utf8.parse(a)
        , f = CryptoJS.AES.encrypt(e, c, {
        iv: d,
        mode: CryptoJS.mode.CBC
    });
    return f.toString()
}

function c(a, b, c) {
        console.log(a)
        // 小端序排序  变成小端序  明文数据翻转
        var _text = a.split('').reverse().join('')
        // 将文本转为16进制的数据
        var text = bigInt(new Buffer(_text).toString('hex'), 16)
        // 公钥指数
        var biex = bigInt(b, 16)
        // 模
        var biMod = bigInt(c, 16)
        result = text.modPow(biex, biMod)
        return result.toString(16)  // 长度不够的情况下，在字符串前面补0
}
//  4形参---d  efg，未定义（没有值)
function get_data(d) {
    var h = {}
        , i = a(16);  // 随机得到一个16位字符
    return h.params = b(d, g), // b函数   d：翻页参数  g：固定值
        h.params = b(h.params, i),
        h.encSecKey = c(i, e, f), // 3个  随机的16(秘钥)  e: 固定值  f:固定值
        h
}

//  while (str.length < 256)  str = '0'+str
// const d = '{"rid":"R_SO_4_1406649619","threadId":"R_SO_4_1406649619","pageNo":"6","pageSize":"20","cursor":"1744871185982","offset":"0","orderType":"1","csrf_token":""}'

// console.log(get_data(d, e, f, g))  // 20:40上课