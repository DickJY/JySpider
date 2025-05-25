import requests
import uuid#生成uuid
import execjs
import time
from urllib import request
import ddddocr
import random

headers = {
    'Accept': '*/*',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    # Already added when you pass json=
    # 'Content-Type': 'application/json',
    'Origin': 'https://www.fcbox.com',
    'Pragma': 'no-cache',
    'Referer': 'https://www.fcbox.com/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
    'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
}
uuid = str(uuid.uuid4())#生成第四代uuid
# print(uuid)
json_data = {}
response = requests.post(
    f'https://acs.fcbox.com/captcha/querySlideImage/{uuid}',
    headers=headers,
    json=json_data,
)
# print(response.json())
clientIp = response.json()['data']['clientIp']
aesKey = response.json()['data']['key']
checkId = response.json()['data']['checkId']
pointY = response.json()['data']['pointY']
# print(clientIp,aesKey,checkId,pointY)

request.urlretrieve(response.json()['data']['slideImageUrl'], 'slide.png')
request.urlretrieve(response.json()['data']['shadeImageUrl'], 'bj.png')

ddddocr  = ddddocr.DdddOcr(show_ad=False)
with open('bj.png', 'rb') as f:
    bj_bytes = f.read()
with open('slide.png', 'rb') as f:
    slide_bytes = f.read()
res = ddddocr.slide_match(bj_bytes, slide_bytes, simple_target=True)
location = res['target'][0]
list = []
for i in range(0,location+1,3):
    start_time = int(time.time() * 1000)
    offset = random.randint(10, 100)
    dic = {"x": i, "y": pointY, "time": start_time+offset}
    list.append(dic)
with open('丰巢.js', 'r', encoding='utf-8') as f:
    js_code = f.read()
result = execjs.compile(js_code).call('get_data', clientIp, aesKey, checkId, uuid, list)
response2 = requests.post(
    f'https://acs.fcbox.com/captcha/checkCode/{uuid}',
    headers=headers,
    data=result,
)
print(response2.json())