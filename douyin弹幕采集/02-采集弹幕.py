import time

from DrissionPage import Chromium

# 连接浏览器
browser = Chromium()

# 获取标签页对象
tab = browser.latest_tab
tab.set.window.max()
# 加载网页
tab.get('https://live.douyin.com/691907217286')

# tab.console.start: 启动当前标签页的控制台监听功能
tab.console.start()

tab.wait.eles_loaded('.webcast-chatroom___items')


# 需要执行的js代码  20:40上课
js_code = '''
// window document
const targetNode = document.querySelector('.webcast-chatroom___items')

// 定义观察器的配置对象
// attributes: true 表示观察目标节点及其子节点的属性变化
// childList: true 表示观察目标节点的子节点的添加或移除
// subtree: true 表示观察目标节点及其所有后代节点的变化
const config = {attributes: true, childList: true, subtree: true}

const callback=(mutationsList)=>{
    for (let mutation of mutationsList){
        if (mutation.type==='childList'){
            mutation.addedNodes.forEach((node)=>{
                if (node.tagName==='DIV' && node.nodeType===1){
                    console.log(node.innerText)
                }
            })
        }
    }
}

// 创建一个 MutationObserver 实例，传入回调函数
// MutationObserver 用于监听 DOM 树的变化
const observer = new MutationObserver(callback);

// 调用 observe 方法开始观察目标节点，传入目标节点和配置对象
observer.observe(targetNode, config);
'''

# 执行js代码
tab.run_js(js_code)

while True:
    print(tab.console.wait().text)