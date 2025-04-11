
const crypto = require('crypto');
const d = "fanyideskweb", u = "webfanyi"

function _(e) {
                return crypto.createHash("md5").update(e.toString()).digest("hex")
            }
function S(e, t) {
                return _(`client=${d}&mysticTime=${e}&product=${u}&key=${t}`)
            }
function get_sign(e, t) {
    const a = (new Date).getTime();
    return {
        sign: S(a, e),
        client: "fanyideskweb",
        product: "webfanyi",
        appVersion: "1.0.0",
        vendor: "web",
        pointParam: "client,mysticTime,product",
        mysticTime: a,
        keyfrom: "fanyi.web",
        mid: "1",
        screen: "1",
        model: "1",
        network: "wifi",
        abtest: "0",
        yduuid: t || "abcdefg"
    }
}

console.log(get_sign('asdjnjfenknafdfsdfsd'))