import time

from DrissionPage import Chromium
# 导入超级鹰
from chaojiying_Python.chaojiying import Chaojiying_Client

# 连接浏览器
browse = Chromium()
# 获取标签页对象
tab = browse.latest_tab
# 加载网页
tab.get('https://www.bilibili.com/')
# 最大化
tab.set.window.max()

# 定位登录按钮
tab.ele('.header-login-entry').click()

# 定位账号  通过xpath的位置去定位
tab.ele('xpath://div[@class="login-pwd-wp"]/form[@class="tab__form"]/div[1]/input').input('123213123')

# 密码
tab.ele('xpath://div[@class="login-pwd-wp"]/form[@class="tab__form"]/div[3]/input').input('123213123')

# 点击登录按钮 要输入账号和密码后再去找元素定位，因为他的class属性会改变
tab.ele('xpath://div[@class="btn_primary "]').click()
# 等待验证码刷新 不能太快，可能没加载出来只截图了一半
time.sleep(2)
# 定位验证码位置. 文字点击 1. 对验证码图片做点击，2. 验证码元素做点击
back_img = tab.ele('.geetest_widget')
back_img.get_screenshot('yzm.png')

# 验证码交给超级鹰识别
chaojiying = Chaojiying_Client('logicqianan', 'qianan123456.', '954470')  # 用户中心>>软件ID 生成一个替换 96001
# 打开图片
im = open('yzm.png', 'rb').read()  # 本地图片文件路径 来替换 a.jpg 有时WIN系统须要//
dic = chaojiying.PostPic(im, 9004)  # 1902 验证码类型  官方网站>>价格体系 3.4+版 print 后要加()
'''
按照顺序识别出图片的文字就行了
找位置----找坐标 主要目的就是找坐标 由于b站不是固定的几个字，所以选择返回多个坐标的
'''
# pic_str: 字符串类型的数据
pic_str = dic['pic_str']
zuo_b = pic_str.split('|')
lst = []
for i in zuo_b:
    x = int(i.split(',')[0])  # x y 单独取出x y
    y = int(i.split(',')[1])
    lst.append((x, y))  # 只能添加一个数据
print(lst)

# 用列表推导式去写循环
# loc_dic = [(int(i.split(',')[0]), int(i.split(',')[1])) for i in zuo_b]
# 鼠标行为链
for i in lst:
    print(i)  # 每一组的坐标  元组
    tab.actions.move_to(back_img, i[0], i[1]).click()
    time.sleep(1)  # 等待
# 也不是每次都能成功，因为超级鹰识别可能出现错误
tab.ele('.geetest_commit_tip').click()
