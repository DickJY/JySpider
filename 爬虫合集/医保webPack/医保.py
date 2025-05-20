import requests
import execjs
import time
time_temp = int(time.time() * 1000)
cookies = {
    'amap_local': '360400',
    'yb_header_active': '-1',
    'acw_tc': '1a0c65e617476441012786674e00634e67a2c88277abc73603aee129af93c7',
}
t_data = {
    "data": {
        "addr": "",
        "regnCode": "360400",
        "medinsName": "",
        "medinsLvCode": "",
        "medinsTypeCode": "",
        "outMedOpenFlag": "",
        "pageNum": 8,
        "pageSize": 10,
        "queryDataSource": "es"
    },
    "appCode": "T98HPCGN5ZVVQBS8LZQNOAEXVI9GYHKQ",
    "version": "1.0.0",
    "encType": "SM4",
    "signType": "SM2",
    "timestamp": time_temp
}
with open('./医保.js', 'r', encoding='utf-8') as f:
    js_code = f.read()
js_code = execjs.compile(js_code)
headers_Data = js_code.call('get_data',t_data)
print(headers_Data)
headers = {
    'Accept': 'application/json',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Type': 'application/json',
    'Origin': 'https://fuwu.nhsa.gov.cn',
    'Pragma': 'no-cache',
    'Referer': 'https://fuwu.nhsa.gov.cn/nationalHallSt/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
    'X-Tingyun': 'c=B|4Nl_NnGbjwY;x=f172a38d12f34ee2',
    'channel': 'web',
    'contentType': 'application/x-www-form-urlencoded',
    'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'x-tif-nonce': 'j4ydwvgR',
    'x-tif-paasid': 'undefined',
    'x-tif-signature': '9b4f934ad95595d178aa750ec9b60a57ad5ec6b7622360e7c2a2ba681db6df54',
    'x-tif-timestamp': str(time_temp),
    'Cookie': 'amap_local=360400; yb_header_active=-1; acw_tc=1a0c65e617476441012786674e00634e67a2c88277abc73603aee129af93c7',
}

json_data = {
    'data': {
        'data': {
            'encData': headers_Data['encData'],
        },
        'appCode': 'T98HPCGN5ZVVQBS8LZQNOAEXVI9GYHKQ',
        'version': '1.0.0',
        'encType': 'SM4',
        'signType': 'SM2',
        'timestamp': time_temp,
        'signData': headers_Data['signData'],
    },
}

response = requests.post(
    'https://fuwu.nhsa.gov.cn/ebus/fuwu/api/nthl/api/CommQuery/queryFixedHospital',
    cookies=cookies,
    headers=headers,
    json=json_data,
)
print(response.json())

# Note: json_data will not be serialized by requests
# exactly as it was in the original request.
#data = '{"data":{"data":{"encData":"3DFBCA4667B978F639BB23B95DCE4CC7FFE3F796C5E5591570F026F57F4A932ECCD20943B4DAE96380B41164D761DE9742C84A985FE3BABC31CB352556BB87C9C1495DB24A29AB6BC3A85AB7FCA00F33C56677481A67C67F739EE2C7D589054DC373615B5DDB33C24C5B31E61CB7643E00DDA865C3B75C85735F0744B0227B5CD0B4E7BB97C60BF8E5275CAFCAFD1E13E384C10195003FD638576645B5EF45EA"},"appCode":"T98HPCGN5ZVVQBS8LZQNOAEXVI9GYHKQ","version":"1.0.0","encType":"SM4","signType":"SM2","timestamp":1747644256,"signData":"OpYajIarz9P+Xaixd4Pm2M5dxt85Gg69hFKg5uSYhMcHVrGotj7Q808IXtLdPVFighZnlj1zW9NTcX7E0FbgJA=="}}'
#response = requests.post(
#    'https://fuwu.nhsa.gov.cn/ebus/fuwu/api/nthl/api/CommQuery/queryFixedHospital',
#    cookies=cookies,
#    headers=headers,
#    data=data,
#)
