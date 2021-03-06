# 代码实现
## 原生 dom api 的安全操作
1. innerHMTL, 赋值要转义
2. setAttribute, 白名单限定允许操作的属性范围
操作a.href、ifame.src、form.action、embed.src、object.data、link.href、area.href、input.formaction、button.formaction属性时，如第二个参数值value外部可控，应参考JavaScript页面类规范1.3.1部分，限定页面重定向或引入资源的目标地址

## 流行框架/库的安全操作
v-html: 需进行富文本过滤
v-bind: 操作style时，只允许外部控制特定、可控的css属性

## json解析/动态执行
应使用 json.parse()解析字符串，低版本浏览器，需使用安全的 polyfill 封装

## 跨域通讯
前端跨域通讯，使用 postmessage 替代
在 message 事件监听糊掉，先使用event.origin 校验来源，再执行具体操作。
校验来源时， 应使用 === 判断，禁止使用 indexof()

## 【必须】外部输入拼接到响应页面前，进行编码处理
1. html 标签之间
需要对以下6个特殊字符进行HTML实体编码(&, <, >, ", ',/)。
示例：
& --> &amp;
< --> &lt;
>--> &gt;
" --> &quot;
' --> &#x27;
/ --> &#x2F;

2. 普通属性内，要对数据进行 html 编码（（如href、src、style等，on事件除外））
要对数据进行HTML属性编码。
编码规则：除了阿拉伯数字和字母，对其他所有的字符进行编码，只要该字符的ASCII码小于256。编码后输出的格式为&#xHH;(以&#x开头，HH则是指该字符对应的十六进制数字，分号作为结束符)

3. 输出点在JS内的数据中

除了阿拉伯数字和字母，对其他所有的字符进行编码，只要该字符的ASCII码小于256。编码后输出的格式为 \xHH （以 \x 开头，HH则是指该字符对应的十六进制数字）
Tips：这种场景仅限于外部数据拼接在js里被引号括起来的变量值中。除此之外禁止直接将代码拼接在js代码中。

4. 输出点在CSS中（Style属性）
需要进行CSS编码
编码规则：
除了阿拉伯数字和字母，对其他所有的字符进行编码，只要该字符的ASCII码小于256。编码后输出的格式为 \HH （以 \ 开头，HH则是指该字符对应的十六进制数字）

5. 输出点在URL属性中
对这些数据进行URL编码
Tips：除此之外，所有链接类属性应该校验其协议。禁止JavaScript、data和Vb伪协议。

## 【必须】响应禁止展示物理资源、程序内部代码逻辑等敏感信息
包括但不限于：物理路径、程序内部源代码、调试日志、内部账号名、内网ip地址等。


## 【必须】使用安全的依赖库

使用自动工具，检查依赖库是否存在后门/漏洞，保持最新版本
