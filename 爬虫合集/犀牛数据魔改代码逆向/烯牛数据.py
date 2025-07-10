import requests
import execjs

url = 'https://www.xiniudata.com/api2/service/x_service/person_industry_list/list_industries_by_sort'
head = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36'
}
page = {
    "sort": 1,
    "start": 40,
    "limit": 20
}
# 获取data数据
with open('xiniu.js', 'r', encoding='utf-8') as f:
    js_code = f.read()

js_code = execjs.compile(js_code)
# 调用js里面的函数
data = js_code.call('get_data', page)
# 往字典里面添加一组数据
data['v'] = 1
print(data)
'''
请求头参数反爬？
post 请求：携带载荷数据的方式有几种？
1. data = 字典数据类型
2. json = json格式
'''
res = requests.post(url, headers=head, json=data)  # 指定携带的是json格式数据
content = res.json()['d']  # 响应文本是json格式，.text

# 将获取到的响应密文解密
# 将获取的响应密文交给响应数据.js 这个文件处理，得到解密
# 获取data数据
with open('响应数据.js', 'r', encoding='utf-8') as f:
    js_code = f.read()

js_code = execjs.compile(js_code)
# 调用js里面的函数
data = js_code.call('get_result', content)
print(data['list'])   # 时间是以时间戳的形式呈现

