const crypto = require('crypto')

var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    , _p = "W5D80NFZHAYB8EUI2T649RT2MNRMVE2O";

function u_c(e) {
    if (null == e)
        return null;
    for (var t, n, r, o, i, a, u, c = "", l = 0; l < e.length;)
        o = (t = e.charCodeAt(l++)) >> 2,
            i = (3 & t) << 4 | (n = e.charCodeAt(l++)) >> 4,
            a = (15 & n) << 2 | (r = e.charCodeAt(l++)) >> 6,
            u = 63 & r,
            isNaN(n) ? a = u = 64 : isNaN(r) && (u = 64),
            c = c + _keyStr.charAt(o) + _keyStr.charAt(i) + _keyStr.charAt(a) + _keyStr.charAt(u);
    return c
}

function _u_e(e) {
    if (null == e)
        return null;
    e = e.replace(/\r\n/g, "\n");
    for (var t = "", n = 0; n < e.length; n++) {
        var r = e.charCodeAt(n);
        r < 128 ? t += String.fromCharCode(r) : r > 127 && r < 2048 ? (t += String.fromCharCode(r >> 6 | 192),
            t += String.fromCharCode(63 & r | 128)) : (t += String.fromCharCode(r >> 12 | 224),
            t += String.fromCharCode(r >> 6 & 63 | 128),
            t += String.fromCharCode(63 & r | 128))
    }
    return t
}

function u_d(e) {
    if (null == (e = _u_e(e)))
        return null;
    for (var t = "", n = 0; n < e.length; n++) {
        var r = _p.charCodeAt(n % _p.length);
        t += String.fromCharCode(e.charCodeAt(n) ^ r)
    }
    return t
}

// 载荷当中 参数是payload js构造一定跟载荷的参数名是一样
//

function u_e(e) {
    return crypto.createHash('md5').update(e+_p).digest('hex').toUpperCase()
}

function get_data(page) {
    var payload = u_c(u_d(JSON.stringify(page)))
        , sig = u_e(payload);
    // 将函数内部的值返回到函数外部
    // 如果返回的是多个值，返回的是一个对象形象
    return {"payload":payload, "sig":sig}

}

// 什么情况下用到传参，就是你用的的参数会发生变化， 翻页  20:53上课
// result = get_data({
//     "sort": 1,
//     "start": 40,
//     "limit": 20
// })
//
// console.log(result)
