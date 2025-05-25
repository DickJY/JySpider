const CryptoJS = require('crypto-js')
function _0x8eb92d(n) {
    return CryptoJS.MD5(n).toString();
}

function _0x3725f6(data1) {
    const key = CryptoJS.enc.Utf8.parse(data1['aesKey'])

    // 准备好了秘钥
    const cfg = {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,

    }
    const pwd1 = JSON.stringify(data1['data'])
    const pwd2 = CryptoJS.enc.Utf8.parse(pwd1)
    const res = CryptoJS.AES.encrypt(pwd2, key, cfg).toString()
    return res;
}

function _0x15b0d8(_0x218136) {
    for (var _0x4d841f = '', _0xdc4048 = 0x0; _0xdc4048 < _0x218136["length"]; _0xdc4048++) {
        var _0x5e6045 = _0x218136[_0xdc4048];
        _0x4d841f += _0x5e6045['x'] + '' + _0x5e6045['y'] + _0x5e6045['time'];
    }
    return _0x4d841f;
}



function get_data(clientIp, aesKey, checkId, uuid, list) {
    _0x1266f7 = clientIp + checkId + uuid + _0x15b0d8(list),
    _0x2f155e = _0x8eb92d(_0x1266f7),
    _0x104de9 = _0x3725f6({
        'data': {
            'sign': _0x2f155e,
            'track': list
        },
        'aesKey': aesKey
    })
    return _0x104de9
}