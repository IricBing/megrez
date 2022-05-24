# Speech Synthesis API

`HTML5` 中和 `Web Speech` 相关的 `API` 实际上有两类，一类是“**语音识别**( `Speech Recognition` )”，另外一个就是“**语音合成**( `Speech Synthesis` )”，这两个名词听上去很高大上，实际上指的分别是“**语音转文字**”，和“**文字变语音**”。这里主要说的是后者，实现“**文字转语音**”。

## 语音合成

语音合成的核心是 `SpeechSynthesisUtterance` 和 `speechSynthesis` 。

`SpeechSynthesisUtterance` 用以构建一个语音合成实例，接收一个字符串参数。

```js
const msg = new window.SpeechSynthesisUtterance('hello,world');
```

## 对象属性

实例化后的对象可以通过**修改其属性**来控制语音播报，属性如下所示：

|属性|描述|
|-----|-----|
| `text` | 要转换的文本|
| `lang` |使用的语言，如 `"zh-cn"` ，默认为空，即只播放英文|
| `voiceURI` |指定使用的声音|
| `volume` |音量|
| `rate` |语速，默认值是 `1` ，范围是[0.1, 10]，表示语速的倍数，例如 `1` 是正常， `2` 是正常语速的两倍|
| `pitch` |音高|

> [!tip|label:提示]
> 通常实例化 `SpeechSynthesisUtterance` 后需要设置 `lang` 为 `zh-cn` 。


## 回调方法

`SpeechSynthesisUtterance` 对象支持的回调方法如下所示:

|方法|描述|
|-----|-----|
| `onstart` | 语音合成**开始**时候的回调|
| `onpause` |语音合成**暂停**时候的回调|
| `onresume` |语音合成**重新开始**时候的回调|
| `onend` |语音合成**结束**时候的回调|

## 行为控制

行为控制通过 `speechSynthesis` 对象来实现，主要用来控制语音播报的各种行为控制，例如开始，暂停，停止，继续播放等

|行为|描述|
|-----|-----|
| `speak()` |只能接收 `SpeechSynthesisUtterance` 实例作为唯一的参数，加入语音播放的队列，开始播放语音|
| `stop()` |停止|
| `resume()` |继续播放|
| `getVoices()` |返回浏览器支持的语音包列表，数组|

## Demo

::: details Demo源码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>语音测试</title>
    <script src="https://cdn.9xing.cn/jquery/2.1.1/jquery.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            //开始播放
            $("#begin_speak").click(function() {
                let content = $("#content").text();
                let msg = new SpeechSynthesisUtterance(content);
                msg.lang = 'zh-cn'
                window.speechSynthesis.speak(msg);
                $("#pause_speak").show();
                $("#cancel_speak").show();
            });
            //停止播放
            $("#cancel_speak").click(function() {
                window.speechSynthesis.cancel();
                $("#pause_speak").hide();
                $("#resume_speak").hide();
                $(this).hide();
            });
            //暂停播放
            $("#pause_speak").click(function() {
                window.speechSynthesis.pause();
                $("#resume_speak").show();
            });
            //继续播放
            $("#resume_speak").click(function() {
                window.speechSynthesis.resume();
                $(this).hide();
            });
        });
    </script>
</head>

<body>
    <div>
        <input type="button" id="begin_speak" value="播放">
        <input type="button" id="pause_speak" style="display:none" value="暂停">
        <input type="button" id="cancel_speak" style="display:none" value="停止">
        <input type="button" id="resume_speak" style="display:none" value="继续播放">
    </div>
    <div id="content">
        <p>Yii2.0是一个高效，安全，快速的PHP开发框架，内置了很多开发时常用的功能。Yii也内置了验证码功能，让我们在开发时可以直接使用，不过框架自带的验证码在生成后，无论是点击验证码还是重新请求生成验证码的URL，生成的验证码内容是没有变化的
        </p>
        <p>yii框架生成验证码，只需在控制器里的
            <span style="font-size: 16px; color:red;font-family: 宋体, SimSun; text-decoration: underline;">actions</span>
            <span style="font-size: 16px; font-family: 宋体, SimSun; text-decoration: none;">方法里，添加一些配置就行了</span>
        </P>
    </div>
</body>

</html>
```

:::

[示例网址](https://megrez-file.virtualbing.fun/Web/%E5%AE%9E%E8%B7%B5%E7%A7%AF%E7%B4%AF/%E8%AF%AD%E9%9F%B3%E6%92%AD%E6%8A%A5/SpeechSynthesisAPI/%E8%AF%AD%E9%9F%B3%E6%92%AD%E6%94%BEDemo.html)
