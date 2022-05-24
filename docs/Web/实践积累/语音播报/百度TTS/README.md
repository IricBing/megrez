# 百度TTS

`百度TTS` 是**收费**的，但是我在网上找了一个案例：https://www.jq22.com/webqd5027，好像并不需要的登录也能用，目前还没有深入研究，因为这个有明显弊端——**无法离线使用**。

示例代码：

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>百度TTS Demo</title>
</head>

<body>
    <div>
        <input type="text" id="ttsText">
        <input type="button" id="tts_btn" onclick="doTTS()" value="播放">
    </div>
    <div id="bdtts_div_id">
        <audio id="tts_autio_id" autoplay="autoplay">
            <source id="tts_source_id" src="http://tts.baidu.com/text2audio?lan=zh&amp;ie=UTF-8&amp;spd=9&amp;per=3&amp;text=请输入文字" type="audio/mpeg">
            <embed id="tts_embed_id" height="0" width="0" src="">
        </audio>
    </div>
</body>

<script>
    function doTTS() {
        var ttsDiv = document.getElementById('bdtts_div_id');
        var ttsAudio = document.getElementById('tts_autio_id');
        var ttsText = document.getElementById('ttsText').value;

        // 文字转语音
        ttsDiv.removeChild(ttsAudio);
        var au1 = '<audio id="tts_autio_id" autoplay="autoplay">';
        var sss = '<source id="tts_source_id" src="http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&per=3&spd=9&text=' + ttsText + '" type="audio/mpeg">';
        var eee = '<embed id="tts_embed_id" height="0" width="0" src="">';
        var au2 = '</audio>';
        ttsDiv.innerHTML = au1 + sss + eee + au2;

        ttsAudio = document.getElementById('tts_autio_id');

        ttsAudio.play();
    }
</script>

</html>
```

[在线Demo](https://megrez-file.virtualbing.fun/Web/%E5%AE%9E%E8%B7%B5%E7%A7%AF%E7%B4%AF/%E8%AF%AD%E9%9F%B3%E6%92%AD%E6%8A%A5/%E7%99%BE%E5%BA%A6TTS/tts.html)
