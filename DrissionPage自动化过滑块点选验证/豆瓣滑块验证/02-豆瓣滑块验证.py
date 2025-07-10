# 1. 导包
import time
import re
from DrissionPage import Chromium
# urllib
from urllib import request
from chaojiying_Python.chaojiying import Chaojiying_Client

# 2. 连接浏览器
browser = Chromium()

# 3. 获取标签对象
tab = browser.latest_tab  # 没有括号

# 4. 打开网站
tab.get('https://www.douban.com/')

# 最大化窗口
tab.set.window.max()

# 定位到iframe标签
iframe = tab.get_frame('xpath://div[@class="login"]/iframe')

#  切换登录方式 //----不考虑位置，直接定位
iframe.ele('xpath://li[@class="account-tab-account"]').click()

# 定位输入框，去输入内容
iframe.ele('#username').input('15644565657')

iframe.ele('#password').input('2342424234')

# 点击登录按钮
iframe.ele('xpath://div[@class="account-form-field-submit "]/a').click()

# 定位第二个iframe标签 get_iframe()
iframe_2 = iframe.ele('#tcaptcha_iframe_dy')
time.sleep(2)
bg = iframe_2.ele('#slideBg').attr('style')

# 匹配一组数据，也不需要从头开始匹配  正则匹配，他的数据类型只能是str
bg_url = re.search(r'url\("(.*?)"\)', bg).group(1)
# 获取图片链接， 发请求
request.urlretrieve(bg_url, 'douban.png')
# 已经得到验证码图片，识别缺口
# 交给超级鹰做识别
chaojiying = Chaojiying_Client('logicqianan', 'qianan123456.', '954470')  # 用户中心>>软件ID 生成一个替换 96001
# 打开图片
im = open('douban.png', 'rb').read()  # 本地图片文件路径 来替换 a.jpg 有时WIN系统须要//
result = chaojiying.PostPic(im, 9900)['pic_str']  #
location = int(result.split(',')[0])  # 强制转换成整数

# 定位拖动按钮的位置
button = iframe_2.ele('xpath://div[@class="tc-fg-item tc-slider-normal"]')
# 进行拖动(x,y,时间)
button.drag((location / 2.41) - 20.6429, 0, 2)

'''
1. 滑块验证 容易出现问题
    电脑比例分辨率不是100%
'''
