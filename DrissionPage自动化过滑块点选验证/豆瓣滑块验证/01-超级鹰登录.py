'''
1. 加载网站
2. 输入账号和密码
3. 获取验证码图片
4. 识别
5. 输入验证码
6. 点击登录按钮
'''
from DrissionPage import Chromium
from chaojiying_Python.chaojiying import Chaojiying_Client

# 连接浏览器
browser = Chromium()
# 获取标签页对象
tab = browser.latest_tab
tab.set.window.max()
# 访问网页
tab.get('https://www.chaojiying.com/user/login/')
# 定位账号
tab.ele('xpath://div[@class="login_form"]/form/p[1]/input').input('logicqianan')
# 定位密码
tab.ele('xpath://div[@class="login_form"]/form/p[2]/input').input('qianan123456.')
# 截图, 对哪一个元素进行截图，通过对应的元素调用
# 先定位到图片元素
img = tab.ele('xpath://div[@class="login_form"]/form/div[1]/img')
img.get_screenshot('测试.png')

# 交给超级鹰做识别
chaojiying = Chaojiying_Client('logicqianan', 'qianan123456.', '954470')	#用户中心>>软件ID 生成一个替换 96001
# 打开图片
im = open('测试.png', 'rb').read()  # 本地图片文件路径 来替换 a.jpg 有时WIN系统须要//
result = chaojiying.PostPic(im, 1902)['pic_str']  #

# 定位验证码框
tab.ele('xpath://div[@class="login_form"]/form/p[3]/input').input(result)

# 定位登录按钮
tab.ele('xpath://div[@class="login_form"]/form/p[4]/input').click()