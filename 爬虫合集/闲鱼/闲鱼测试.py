import csv

import requests
import execjs
import time
import jsonpath
sum_h = ['名称','价格','url']
sum_list = []
timestamp_ms = int(time.time() * 1000)
cookies = {
    'cna': 'H3J9IEZrCx4CAXUtkozrHxJ2',
    'xlly_s': '1',
    'mtop_partitioned_detect': '1',
    '_m_h5_tk': 'ebd01840c941df8a184f1ec7be973ffd_1744269769647',
    '_m_h5_tk_enc': 'ffa775a0dcf4f6fbee44ee760337fe41',
    'cookie2': '13b959e8441e47eb3e3abaef49b1663e',
    'tfstk': 'g_SIMyMli_Ia6qhGKWewhY6hi5KWV_ZqVY9RnTnEeHKKwbBv_6ReY8qWw6ANYBWevvbGgtnFYyxrVHxk2SP40okhK3xRzki9lBXOILewpBe7lDKk2SPZ70L3c3fm_34NwOe6ULJ-y_LpXhpH6LdJJ_d9WKpq93KRwRO9UKvJwLdKWOpX6QKJJ_KtXCvS1EkXFyOhdJ0Z7uzqZHWp10nRvuYpGrA9IdjstedApMiij2vBRIBpsSbSAI85OesaAjvCWt1Md_qmxHL5JZKdVSZBXtbN9d18G4OOlMjWuMNjoBIHZstd55nB2HpfFE7aeqONyOj65MaqEdjFeMY2DocpaNWfVLsuZl1fp6_vkMhC40o2GHPoPATmVdO4CRgorAGXfu3nUBWJJdvB7Rws9aYpId9gCRgo6epMQYe_CXIV.',
}

headers = {
    'accept': 'application/json',
    'accept-language': 'zh-CN,zh;q=0.9',
    'cache-control': 'no-cache',
    'origin': 'https://www.goofish.com',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://www.goofish.com/',
    'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
    # Requests sorts cookies= alphabetically
    # 'cookie': 'cna=H3J9IEZrCx4CAXUtkozrHxJ2; xlly_s=1; mtop_partitioned_detect=1; _m_h5_tk=ebd01840c941df8a184f1ec7be973ffd_1744269769647; _m_h5_tk_enc=ffa775a0dcf4f6fbee44ee760337fe41; cookie2=13b959e8441e47eb3e3abaef49b1663e; tfstk=g_SIMyMli_Ia6qhGKWewhY6hi5KWV_ZqVY9RnTnEeHKKwbBv_6ReY8qWw6ANYBWevvbGgtnFYyxrVHxk2SP40okhK3xRzki9lBXOILewpBe7lDKk2SPZ70L3c3fm_34NwOe6ULJ-y_LpXhpH6LdJJ_d9WKpq93KRwRO9UKvJwLdKWOpX6QKJJ_KtXCvS1EkXFyOhdJ0Z7uzqZHWp10nRvuYpGrA9IdjstedApMiij2vBRIBpsSbSAI85OesaAjvCWt1Md_qmxHL5JZKdVSZBXtbN9d18G4OOlMjWuMNjoBIHZstd55nB2HpfFE7aeqONyOj65MaqEdjFeMY2DocpaNWfVLsuZl1fp6_vkMhC40o2GHPoPATmVdO4CRgorAGXfu3nUBWJJdvB7Rws9aYpId9gCRgo6epMQYe_CXIV.',
}
for x in range(1, 6):
    data = {
        'data': f'{{"itemId":"","pageSize":30,"pageNumber":{x},"machId":""}}',
    }

    with open('./闲鱼测试.js','r',encoding='utf-8') as f:
        js_code = f.read()
    js_code = execjs.compile(js_code)
    sign = js_code.call('get_sign',data['data'],str(timestamp_ms))
    params = {
        'jsv': '2.7.2',
        'appKey': '34839810',
        't': str(timestamp_ms),
        'sign': sign,
        'v': '1.0',
        'type': 'originaljson',
        'accountSite': 'xianyu',
        'dataType': 'json',
        'timeout': '20000',
        'api': 'mtop.taobao.idlehome.home.webpc.feed',
        'sessionOption': 'AutoLoginOnly',
        'spm_cnt': 'a21ybx.home.0.0',
    }
    response = requests.post('https://h5api.m.goofish.com/h5/mtop.taobao.idlehome.home.webpc.feed/1.0/', params=params, cookies=cookies, headers=headers, data=data)
    json_data = response.json()
    title = jsonpath.jsonpath(json_data,'$..title')
    soldPrice = jsonpath.jsonpath(json_data,'$..soldPrice')
    picUrl = jsonpath.jsonpath(json_data, '$..picUrl')
    # print(response.json())
    # print(soldPrice)
    print(picUrl)
    for i in zip(title,soldPrice,picUrl):
        print(i)
        list = [i[0],i[1],i[2]]
        sum_list.append(list)
with open('闲鱼数据.csv','w',encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(sum_h)
    writer.writerows(sum_list)
    print(f'第{x}页完成==============')