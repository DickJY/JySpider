import requests
import execjs


url = 'https://music.163.com/weapi/comment/resource/comments/get?csrf_token='

head = {
    'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36'
}
# 翻页参数： pageNo
cursor = '-1'
for i in range(1, 11):
    # 修改了对应的翻页参数  下一页翻页参数在上一页响应
    page = {"rid":"R_SO_4_1406649619","threadId":"R_SO_4_1406649619","pageNo":str(i),"pageSize":"20","cursor":cursor,"offset":"0","orderType":"1","csrf_token":""}
    # 读取js文件
    with open('wyy.js', 'r', encoding='utf-8') as f:
        js_code = f.read()

    js_code = execjs.compile(js_code)
    data = js_code.call('get_data', str(page))  # 传递了1个参数
    # print(data)
    # post请求，需要携带载荷参数
    res = requests.post(url, headers=head, data=data)
    # 如果你获取到的响应数据不是一个标准json格式，
    result = res.json()  # 标准的json格式  正确的响应数据你有可能获取不到
    for com in result['data']['comments']:
        print(com['content'])
    cursor = result['data']['cursor']
    print('当页数据抓取完毕！！！！！！！！！！！！！！！！！！')