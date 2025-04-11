'''载荷参数：
i: hello
from: auto
to:
useTerm: false
dictResult: true
keyid: webfanyi


sign: 1b237b429b88d862e909148bf87a3a0c
client: fanyideskweb
product: webfanyi
appVersion: 1.0.0
vendor: web
pointParam: client,mysticTime,product
mysticTime: 1744331264237
keyfrom: fanyi.web
mid: 1
screen: 1
model: 1
network: wifi
abtest: 0
yduuid: abcdefg
'''

'''
i: world
from: auto
to: 
useTerm: false
domain: 0
dictResult: true
keyid: webfanyi
sign: cbd02c56944fc60d9b8d454131e21860
client: fanyideskweb
product: webfanyi
appVersion: 1.0.0
vendor: web
pointParam: client,mysticTime,product
mysticTime: 1744332244780
keyfrom: fanyi.web
mid: 1
screen: 1
model: 1
network: wifi
abtest: 0
yduuid: abcdefg
通过分析得到：sign  和  时间戳是会变得，得到的相应数据也是经过加密的
1.先分析sign值的加密方式
2.再分析响应数据的加密方式
'''
import requests
import execjs
with open('有道翻译.js', 'r', encoding='utf-8') as f:
    js_code = f.read()
js_code = execjs.compile(js_code)
data = js_code.call('get_sign','Vy4EQ1uwPkUoqvcP1nIu6WiAjxFeA3Y3')

data['i'] = 'world'
data['from'] = 'auto'
data['useTerm'] = 'false'
data['domain'] = '0'
data['dictResult'] = 'true'
data['keyid'] = 'webfanyi'
url = 'https://dict.youdao.com/webtranslate'

head = {
    'referer':'https://fanyi.youdao.com/',
    'cookie':'_ga=GA1.2.620368027.1697607707; OUTFOX_SEARCH_USER_ID=-1117413007@2408:8352:449:50e0:696a:a365:949c:be8a; OUTFOX_SEARCH_USER_ID_NCOO=1587511218.250679; DICT_DOCTRANS_SESSION_ID=ZTBmNDk2ODctZGE1Mi00OGYwLWJkZWQtNGI5ODVkZTBhNjU1; _uetsid=055cc2e015f811f0b4fcb5c31c307c1c; _uetvid=cfa163906b7711ef94bbe1b975012916',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36'
}

res = requests.post(url, headers=head, data=data)
# print(res.text)
with open('./解析数据.js','r',encoding='utf-8') as f:
    js_code1 = f.read()
js_code1 = execjs.compile(js_code1)
t = "ydsecret://query/key/B*RGygVywfNBwpmBaZg*WT7SIOUP2T0C9WHMZN39j^DAdaZhAnxvGcCY6VYFwnHl"
a = "ydsecret://query/iv/C@lZe2YzHtZ2CYgaXKSVfsb7Y4QWHjITPPZ0nQp87fBeJ!Iv6v^6fvi2WN@bYpJ4"
res_data = js_code1.call('get_response',res.text,t,a)
print(res_data)