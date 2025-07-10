import requests
import pymongo


# 获取网页源码
def get_res():
    url = 'https://jc.zhcw.com/port/client_json.php?transactionType=10001001&lotteryId=1&issueCount=50&startIssue=&endIssue=&startDate=&endDate=&type=0&pageNum=1&pageSize=30&tt=0.7885983088846716&_=1747306165827'
    head = {
        'referer': 'https://www.zhcw.com/',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'
    }
    res = requests.get(url, headers=head)
    return res.json()  # 文本数据获取，是一个标准的json格式


# 解析数据
def parse_html(res_data):
    data = res_data['data']
    lst = []
    for item in data:
        dic = {}
        # 期号
        dic['issue'] = item['issue']
        # 红球
        frontWinningNum = item['frontWinningNum']
        # 篮球
        backWinningNum = item['backWinningNum']
        dic['result_code'] = (frontWinningNum + ',' + backWinningNum).replace(' ', ',')
        dic['openTime'] = item['openTime']
        lst.append(dic)
    return lst


# 连接mongo
def client_mongo(db, table):  # db ='demo1'  table='info'
    client = pymongo.MongoClient()
    db = client[db][table]  # 连接了对应的数据库以及对应的数据表
    return db


# 添加数据
def insert_data(value, database):
    database.insert_many(value)


# 查询
def find_data(database, num):
    num_lst = num.split(',')  # split 返回的数据类型？---列表
    '''
    '05,15,16,25,30,33,16'
    这一组号码 出现16同时包含30-------and
    16 同时30----- 模糊查询
    做的是一个多条件的模糊查询
    {"$and":[
        {"result_code":{"$regex":num}},
        {},
        {}
    ]}
    '''
    like_lst = []
    for num in num_lst:
        condition = {"result_code": {"$regex": num}}
        like_lst.append(condition)
    # print(like_lst)
    # 构造查询条件
    query = {"$and": like_lst}
    result = db.find(query)  # 查询，返回查询结果
    for i in result:  # 遍历查询结果
        print(i)
    # 概率---？ 100  10--- 10%    查询到的个数/总的个数
    all_count = (db.count_documents(query)/db.count_documents({}))*100
    print(f'查询到{db.count_documents(query)}条数据，中间概率是{all_count}%')

if __name__ == '__main__':
    # 存入数据库
    db = client_mongo('demo1', 'info')
    print('请输入你要选择的功能！！')
    print('1. 获取彩票数据添加到数据库当中')
    print('2. 模糊查询号码中奖的概率')
    choice = input('请输入选择(1/2):')  # 数据类型是字符串类型
    if choice == '1':
        # 获取网页源码
        res_data = get_res()
        result_data = parse_html(res_data)
        # print(result_data)
        # 添加数据 ---有数据
        insert_data(result_data, db)
    elif choice == '2':
        # 用户输入号码数字
        number = input('请输入号码数字，多个数字之间用逗号隔开')
        find_data(db, number)

'''
模糊匹配
'''
