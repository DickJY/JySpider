// 选择要监控的目标节点
const targetNode = document.querySelector('.webcast-chatroom___list');

// 创建一个配置对象，指定要观察的变化类型
const config = { childList: true, subtree: true };

// 创建一个回调函数，当目标节点发生变化时执行
const callback = (mutationsList) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
                // 检查新增的节点是否是 div 元素
                if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'DIV') {
                    const currentTime = new Date().toLocaleTimeString(); // 获取当前时间
                    console.log(`[${currentTime}] ${node.innerText}`); // 打印当前时间和新增 div 的 innerText
                }
            });
        }
    }
};

// 创建一个 MutationObserver 实例
const observer = new MutationObserver(callback);

// 开始观察目标节点
observer.observe(targetNode, config);