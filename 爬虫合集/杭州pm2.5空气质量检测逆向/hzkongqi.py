import requests
import execjs
import json

url = "https://www.zq12369.com/api/newzhenqiapi.php"
# 获取载荷参数
with open('hangzhou.js', 'r', encoding='utf-8') as f:
    js_code = f.read()

js_code = execjs.compile(js_code)
param = js_code.call('get_params')

payload = {
    "param": param
}
headers = {
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://www.zq12369.com",
    "Pragma": "no-cache",
    "Referer": "https://www.zq12369.com/environment.php?order=desc&tab=rank",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
}

response = requests.request("POST", url, data=payload, headers=headers)
# print(response.text)

# 将响应密文做解密操作
with open('杭州响应数据.js', 'r', encoding='utf-8') as f:
    js_code = f.read()

js_code = execjs.compile(js_code)
result = js_code.call('window.MyDecode', response.text)
print(json.loads(result))
