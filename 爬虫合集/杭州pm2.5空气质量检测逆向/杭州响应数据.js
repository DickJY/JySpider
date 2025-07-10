window = this
var akb33 = "32223";
var akb34 = "N4EDAQpO2ejqgCoX";
var akb35 = "=qoKNLgdAjJbU8zx";
var akb36 = "mAkJqt8coXQ96zML";
var akb48 = "t4ABRmeN"
// 用了des解密
const CryptoJS = require('crypto-js')

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
var decryptData = (function () {
        var DES = {
            encrypt: function (text) {
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
            decrypt: function (text) {
                var secretkey = (CryptoJS.MD5(akb36).toString()).substr(0, 16);
                var secretiv = (CryptoJS.MD5(akb48).toString()).substr(24, 8);
                secretkey = CryptoJS.enc.Utf8.parse(secretkey);
                secretiv = CryptoJS.enc.Utf8.parse(secretiv);
                var result = CryptoJS.DES.decrypt(text, secretkey, {
                    iv: secretiv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
                return result.toString(CryptoJS.enc.Utf8)
            }
        };
        var AES = {
            encrypt: function (text) {
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
            decrypt: function (text) {
                var secretkey = (CryptoJS.MD5(akb34).toString()).substr(16, 16);
                var secretiv = (CryptoJS.MD5(akb35).toString()).substr(0, 16);
                secretkey = CryptoJS.enc.Utf8.parse(secretkey);
                secretiv = CryptoJS.enc.Utf8.parse(secretiv);
                var result = CryptoJS.AES.decrypt(text, secretkey, {
                    iv: secretiv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                });
                return result.toString(CryptoJS.enc.Utf8)
            },
        };

        function MyDecode(str, nopop) {
            var arr = akb33.split('').reverse()
            var b = new Base64;
            arr.forEach(times => {
                    switch (times) {
                        case "1":
                            str = AES.decrypt(str)
                            break;
                        case "2":
                            str = DES.decrypt(str)
                            break;
                        case "3":
                            str = b.decode(str)
                            break;
                    }
                }
            )
            if (!nopop) {
                str = b.encode(str)
            }
            return b.decode(str);  // 解密的内容
        }

        window.MyDecode = MyDecode
        return function (data) {
            return MyDecode(data)
        }
    }
)();

data = "aGd5QjloQWQxZlREdlBjam1RQmM4cS9wczZVMU1rcmVPVzYyQmt0bUdKdkdpamhXZXJBUmVYSjBVb0l1ak9lZTJYcTJUVmhNT3hjMWtFVnBJTHVvUFVYOTZ3WTB5b1pzeG9DSWRCZ1dPRjIzSndEUFFReUVYQVZNNDhnTk9nYU5DeVJhL0VhaFhhODNXVU9ycmpDcHFab09LMDJpdk9mN1RHWFNVRWJNdDd5dW1rQWxsUUFNaWRzVFJnM0pnTTFPK1hCQUthV1k4UXpGeVR2T2s3Szg2ckpiMXFQaXZXTmFteGRmSit0d1ZrcG8xSWhSaFN6OXZ1cTd1MXBnWnhzN1Y1TzhGTm1rbnVBQkNIaFc5WENWbUxwbDVQbWZVYm1INGs5K2dERTVzQUpKQmdrNGlXSklKMmJ5b3pKejREd0N1SnBvalJvSzdCbUNXamovaHJDUGk2YnUwUThPSVZDWi95elpWeWR4VEVtSnIvT2dWbmhlR2dmN1VHOHNvWituNVNhNGdLVWk0WHdZbUE4bDIvdnRFbThEcml5ZXhnY1FVMVM4bXFpcTJIL3V1aFRuQU1JSG1PM21OME92RG1HYW9HZ0ttNUUyWDlRV09pWGNuWHp2Nk1NUG9pOXdrSUIxaUQwT1QzMTRubGN3d1VOUE90NW0yMytsNkx6QUhoRjhiQnpJS3VGYVJkTmJsaHNldlVWVnpVVEE1aDhlUnA1R1lvYUpBSWZPTlNKS010dE5hcjhVcTNGZ1c4TTJKM0JRVjBCOE85Z0o1eXRZdWpOTWpZRGpWQnVNZVFVOGZlTWc1SlZqclRCTm5KSGkrc3ovd0VoQjcyQ1BqQ0dTODQvUi9wUHh3aExReTVlcjJoTnJETlh2SnVyT0txYklnV0lsRjB1REpmUnpDU1QyUVRDR1FIMDlRL2RNSUM1TTgvVmV2Z290Nk5FOGFxam9Gd08xQ1Y0QmVTUHFnTG5SNEJ5SVYydkF3Mk55SlZqZklYVXVBcnR6bUk5SGtHa0wzamhtSzdiUHk3cU1KL0JNeFZQT2xKWWljbXdsTTlHSGROMFZyNUJENDhHU0p3U3B0RERtMDRsQ3RtOU9HK3QxQ3ZGMWk1dnk3QTJzaXRrS1hleXN5M2lHMitQdnZkTGdHcVc3Y0lBeGNiZEUvNS9RdlBOOTdtVjNtbXFLYXZQSzN5ZDdDZS9LWDIyUXk5SkdFbUVoQkxSLzdUcW1VTmpYTzdtSDJMeURGZTdVWncyOGNHOUJpZmtEM0RzZG40VitKeWM5Y1M0RzRubHFuOUFEWWlVL2dkM0s5Z2I5MkdiUVpLR3lSRmdhOHkwa0k4a1VHajhVTXZtdHQwMWZuYU0xMUNVYmpsM1JCM043cWhscENwdUpJRTQ1Smd5Ny9QaG1iSDRyeDZsUUVQYW1ZZmYxUTBqeHNtZXVMa0RLUE12WGRsSGQ2UFM1RkFLTjlLUW1JVlpqbXFXdzEvWlU3d3cwb0srRGkyaGxhRUF2TnRQVmZZaDI5a3NBWm45N08vZDJrL0ttWUpIeWZPWllNT2gwS0ZNeHRkTklMWWZWcngxNkJZNysxTkdNRmtWWEdmUjZTUXVScDYvRzNhSGR2NGd1dGJna2FvMjhSSzJoWXdJd0cyUGRYeFZENG02SGFDVHNGck9WeDlwT09DQ2xjWGVsNU5zbFNqZTdERG1jOWdsZjBZaGZnRmgwWTZJbW9mMk82aG4rVDRoQ3J2Z3Vndkw3Q1JYMU5Oc214RVY5bUk5elZCdlFCSGNOZFEvb05FRmllUG9XaGFYaFRVNDdEa2c1bkh5MSs3SExNaFhPK24rd3VyYkV0VEVBRGVWeFZ4eHd0K09uVHJlTURlK3dGL2RVVitJK2phWlhHNk1hcmRNQjRjcXZEam5iQmlVNWswMzNXLzRmdkVqU1E0aHVKdnNvZStWZGxOTGVDOUEwS3V1VTFuVTlZYU9YRm5XclpzbnVSS2FlZ3lERFQreFVEanhsdkFjd1RwNk9SMkxibnZuY3NtRm9ZMTBISnNvRnpsc1gxdHo0UGpZUG1QVVo2VXRqUUg4SDVrQWFmNEdlOXdPR0h6OTZFNjBuUnZFcXpPUGIrRUNCTWZBNWh1bFd0KzRXOThxVUMzV1lQQjNtN2kyVlVyK1FkZitvVlluaFlYMHhkbldobDY2eTlZRnNQQy9ObTdTL0ZEaGJrVTNKTWk5ckR5OGpHUEE5RVU4bjA0dlg1SEF1bnEyc0dyVnlaZkJzVHNWbXJxSGtWZmxQZjQwRmEzRVpQc2dLdVpmcXBDWExXTSs0Y1VkREhOLy93eTNvdVNXWXdnUjhQRjUvZ2hNU25vaXZkdjJNMmgrQytJclpLd3pNc1hIbnpiek1MWlhHb2RBUkIzODdNdjNVRDFqOU1uTGI4ditxa0lKSVk2enlXUjk2dnA5UVl2S09MMHVMMUZ5bDgyNDZxQW5FQTdUS2ZsMmdsK2VOOFlwU1VtQzdZbUxqT0N4VVhWWkRacUZ5ME94SUtLQmxPQW5VZmFpRFV6NExVcUl5QXdieXA5WXJHL0x1UnlUalBFWEFOL0F4ZjJ5SVl5YUlxaXB3VE1rZ3hiVVY5U3BCR2g0WkpnZVk4dUg4eDIxQk1na1ZHU3I4ait4dDlCRlgyaU8wQitUa2wzeVl6K0FpK2RXSmlucEFsdkUxVUtraTF0U3ZkOUNHMmpxZG5qeStFWC93MXFzWkdoRjFveGJ4ZWpHWFQ0a2k1T1llanJvVnozRkdpOU5zNnFoMDByeUxMWWJwYk5obFNlelBxc0JkdXkyYkNvNUdpWStIeFRuRzBFT0VER0NoK1ZDZTJWa1l5K0VjMW9jeWVaYy81Z1dBem1IQmx3TFFKdXpxSmJmZmlFWXYwRVhTQU5LOHQ2dGVtNWJzMTcrY0tIc0syN3p2Wm1PR1lxcEh3ZnZOMmpSY1ZsNHphMWJKZFV6L1FJTzl4ekZ4citFZTBVUGl3QXJaeGMzNkY1V2wwaTZNNCtrNjgyTE5JaGJONlhZaFdTWnBCTmZVZDJDRHZPSjI5cVRPZ2ljaTJ5Z2FSVHQyTjZYMDV6UTZSZ1JxeklzTHYwYUd5M0xlVEsvd2RtT1YrZVRjSWZTVkRvK25BNDJMdlZQMlBodHFxaWVBSkpKa2lMR1FZZUxhUUpPMjVKYk9ySERMS0ExbGRrbmVoR3lpWUFzWkpzVjFDV0s4TkpnRXZ5K2hTSlB0VHprK0h5VkRzQnJLeExCQjdkbldiOVc0NzBoK1Q1YnFFVldzb1lLMFdYY3JZSVVJU1lGWjZndkM1RXlaTHIxa0dUOGJnRFVuUDRaa3lkaTA2Zkx5Z0p1citQOERaQjByOU5nTGcxZjZXM1NmSUNMUzN0ZTVaOFgyeXFMc2FBMENCejRzTXVPN1liOUVrMDhXZUlVMW9tM3RqZ1grTWVhd3lMR3ZKYU5EVEY3OVhBc1lOVjZPckRtaHN0WkdaNEhaRXlWeWxIbWNCdXBZcVVGNmpuZjEwQjFJOXFOOXNrekNzRnpocGRLQnhDd2ZPaWhpMTE0bjVMQUZ5aUFWTWNFUVpPK0txeFVnalBIVTNGbFhHM09SYzF4VUtOMUdPVG1kQXlUaVZFT0dOSTlTQ0FDQmtxc2E1S0pSdmJVZFdxNEh0YlpySmduVlZtVGdPNXFhRUJVSEhkZkdVZzBPSFpGSG1TQm9kK3Nab3lJMjliODBhcFZRTnJaZHZON3B5dUFVQnQ0MU5BVGNUN1BWdVVVdTE5d3RrY2M2UGNLTjd0MnFJOGJVL3dGYjk2N2M1S3h2Wk1yM1hXSnNtRHZNNERZaGsrd3hnMWZWSWpMeDJCZmVNZmhwOGd2TVdxUzJteXR1MXQvY015ZWwvdVhyMExTQjJOZW1icUpHdGdsaFM5Sks3YmhiNDZRYnNkbGpuTFpUMU5SR1ZidFhvd283dGNONXRRL045ZzdMM0s4M05TOFpnK0pTNVlEYm00REw1VTFKRnUzMjRrT0twb2JkMFBteHZkV1MzL01HcUNTTW5LRG1RVHYyOGdrTlVBczRRdzlFV2VyZXVFUGtFVVZNUUhuZ0tYUzZNemFzODNKUTN1QytoOWNUTTRjemJFL1FzSzJ5c0tnUkw1dVI4YTZ3S3NnK0RWcDdzcTVRYU1ITmxLU2YzanZnT1Qzd2pBb3krc3ZMbWlmWUw3eTRuVjlyckp0a2pFNFJ2eUdKWnRTV1FyYytTUWp6SGZldmtwTjJvV1NwSDFWL3JhQ2JKOHZMcnV0VFlsUVl4Q0U3SkRNS3JmYUVjdHRxdjBHTTRRa08zM1ZIVTVwTS9HNkNuNzlHL2pEckxGUE52UkthcFJyc214SXFzWCtKdEhxZitPQmhnam1MdlJ2cGhsaW5yOXQ4d3VTVzR3d3FnZGZ5LzhWQjNOdkNSSVFqajFwS3R5R3JXZlAzNGlnOHdaWm5BOEFmb3E3N2dUM0hneHVSV3NuUHc0KzRWem9GYjBadC9WT0pvUjgyRVZhdTFCYW8xOWVLMzk4Y2RqeVVVaCszRFhCbndYVXZnREI0eE51L05Sc2oveFVvZkQyUTVyV0pLOFJuM1Y3a0YvdFpteWpJdUxzSFl1L0dCSURTZEk2WTZkSFVaNDNBY2svZ2JhZnE5Zlp2Z00wMytFQUNlNFZ0UmV2OTluYjRtZHpNNGdld0RDaUNGUk8vSC9XUmVTVUZsN3JMeVpkL1hnVkV4bDNEK2oycHF1U1J4Vk1WL2YvSmVqQWpUeTZHM0xOL1dzRkY4YkgrRUFOUHNkL0dIZ0htSGk5OFNLTXY5U3AyVnhvdTlYbjJMYVVJUlFXVmV0SC9yTjFLaW9kZzkzcUxVcTRLQlhmRE1pM1FMRjljaTAvajlKOGlrMVcxWW8xWHh3d2NhMW5CSTVYRm0zRmEvbEVYWTBkdk1IdTFTMWZrMU5YejJweUVDNEo5T3phbUQ0ME9nZlpka0tXVjlHR3hJMVY2elR4bDJrb285ZUcydFpUZXI5YUlwWWc0L2xyUVVpOGhvanZIOXZlNDFYT1RXKzJZU2hKMDhpbzBFNGpSRHlZMmpLRWpWaDFrZEw3enNPam94RGIzMFJxWGN0cnk5Q1BSUWgxMm1qZXZvdVYzL20wb0VHL2JiWWhoNWxpNnRMZEdrNW1mWlFyK2E4Rm5qUUthaWREWDBmdUJoZ1duWHg2cVM0bGtrRklsUFROdWNjSzBmeWNUVm40QkNvTEtLUmlMUzh1U3pvTWZFU2hXc1ZEOGtrZy80eXBBYXR6RXVDMzY0T0ZTaGNCLzFRRzg0OUhrckp3KzNaNDE1RVlITGpZQnRGNW1RZWk4U2RSMlZ3V2lWbzRrcklIMnByVmplOW9abUVBTnlmOFpjZ0ZLN3VLY2VDdTR1cmpvbVFmbXppOHlkTUIzY25HZC9pa3M2NDBpNmJaMk1PMUc2UjhiSm42UEtiYmE3RDJDOTA4RnR3YXZ6eDR5UGhLb2hoN0lwcXVRTlhRTmMrQnF6TnJFVk1MRnNIUzR4WG56eEdicHc5V0tkVDNmOW15NTF5Ry9mczNoTnl0eEllRHppSmVhd3BXOS9KTWoyUk45Ym9VNmNDU2sxSHVrNG5BQ2pKcE1JdHJTa3NNUjhPTkIzVm9zMXVQUUxSNk1KSmU0bnFCVmpKMEtucUk4VW9HeVovUnpzMXVtM1BrVVBORUkrWUlQODJQWFFmYVlvMHVBaytpd213d3Irc204NlRyL2NTSm0xV0owaWphRGdvanVydUc2SjJHeE5OY3c5bmpxV0JONVg1cXRXTTdPYUpMek14RmpTN0RlNTdEQjhpYmprK0pMdFRTdE5jUUt4cG0vUzJrU3JWVVJDL2RtRGdFRUJJN1JZdjQ5REpsY3pGcGhKRTZESHNXd00weXFWa2tNRzluODdVbk9pVG9aRDQ1YWhRaStQRUNOZVFxSjU1UEw4c3hRMGRQMTlMb0kyRFhaVGF3ajhtWFhSekhWLzJldU1OeTcwUW5NeTFIdGhVYnZvMkYxbzVFdUZ1NGIzd3BNeEZMT2E0bFo3bG51ekRZc3cwdDNvUjNJYjdEWTJnaFhLdzBsUkY4NTNTWE9tckZRalhPbjFiWElvaE1YWGhXVXRJSU05bVA0QUxNc3Y4QWdpNVphTC96RDZ1YWZyOWEvWFJCaWFyRFhvcFBtSXdVVVJCalA0NjBKcVgyYXkzTi8vN3p3cVQwY0tPVWhXNHphNk9iKzJwMnpwdm1hZ2xBSHUvcWpUTTBHcHZjS2hJYkx1d0JSZ2l3MlJuN1EwTXgzTWZITEhKcVRlVFJhWWxCbURuZlBFVmt5VFhFQUt0cktmZ05UVzdFTW56RHF6dkNvL0c2bElsQVVKUUMrR0IzNzhFaFgvM05CUWNYbUdUZ2UycWx3NnN4NE5hWW5iRytkTUNMazBhRmswWDB5M3BWTVNUdDNmTTdrU3JFN0tGbmh0Q091aWdxM0pQUVp5OEh0L1IwRnlTNWxjMVhqdFkvK2RpaW53Q0xqM01aeUhyR3lGUkVCbm9lUXJ0RExva2ptNGVTellOTDJXMzZvYjlmL1BqR1Y5WXNkY1dBTXkyTXQ3Tmp6VFJRM2pFeng4NWNjOXhQWjJ0OFJkWWlveVFGVnR2UWRKRmY4bEt1OVcvdTNYRGJjMjNxNGdHZm9UbkRuWmtsOW9Dcm5yQTJBWXdsMlhxYWVqMmJ1a3lwWndVcHRIbGplZUFxZ3hqU2RFSUloekdZbW1zYVpNT21nWGloZTVLdUxUUzlQMlBOTXRMTVpHTk1JZUVqL2M4Y1lnT2g0S3BOODFIMFhuaUFTQXlZT2pRZFVDWi9LUThycWF0R2oxbjNudW4yRDFUVVNvOHRXMmNsQ2RiQkF1SXhiK0l4Q1dUcGtjSVRZRW8vTkJUTUtaVjh6cVA3ZERDQlB1L0FndGlINE1ZTnh4dklLOFpSVEZ5b3lteFlEV2UyMXlVamZuYVRwZFVMdGtObERUSkhoR3dDRkVPMGk4WmhQaUtwWjZWTFhTQ1BsT0l6Y2RrYkk0UUxZN01CRk1LWVN6Q1pCUm9pYUhPWmxUTUtXTndNUXNEZHFtQjFzRnJxZDU0L1JsVDh4Wk0wWkxwK1F5QWNkc3NRMkdYUWo2MHJaVnV3ZnZYUEN3WStWQmpTaXRhQkJZYWVtRm9YMG54WUlZU0FyNnBsVkVlTFlJVllZbHlnTDdlRmRNNDVaT0s3NWZDL2ttTWMrTFdMT24wQVNyc083ZEx5NzN4YlNWOG4yZjhRSDlJeU9ZTkxWUTJxZVlIT2ZPdzhrMy83UFJZVTlManUvYWRPVyszQmNvc29Sc3hSNnY5bVF1Y0gyRnhhUmYrdzVGNEtJUUdaVW1YdDh1cFBtZFZoQ09hRmwybFpKam13Skp3bGJPMmJNcjlpWHBWRjZMb21YOGsxMzhNYWFqWWtTUVZZY0htRnZtTEhiR0ZZdnI4K25qc1lQUE9Hek1QcUFrWlBRWXEvWk8xeHVaQ01XdnhVRktyeU5kdWs5VnZZVElEcGJ0TDZncC9XaTcxck5jNlo5UnowUkM4Q2MzUnNPOWREMUFpN3NrdEdRNERmd0x2ODhoeWUrdkpRMXBnPT0="
console.log(window.MyDecode(data))