export default {
    base:['#7A3B3F','#FA6800','#008A00','#6900FE','#AA00FE',
        '#A10025','#F0A30A','#5FA817','#0050EE','#76608A',
        '#D80073','#D8C100','#6C8764','#1BA1E2','#637687',
        '#E51300','#81592B','#A4C400','#00AAA8','#F472D0'],

    HexToRgb: function (str) {
        str=str.toLowerCase();
        var r = /^\#?[0-9a-f]{6}$/i;
        //test方法检查在字符串中是否存在一个模式，如果存在则返回true，否则返回false
        if (!r.test(str)) return window.alert("输入错误的hex颜色值");
        //replace替换查找的到的字符串
        str = str.replace("#", "");
        //match得到查询数组
        var hxs = str.match(/../g);
        alert('bf' + hxs)
        for (var i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16);
        alert(parseInt(80, 16))
        return hxs;
    },
    RgbToHex: function (a, b, c) {
        var r = /^\d{1,3}$/i;
        if (!r.test(a) || !r.test(b) || !r.test(c)) return window.alert("输入错误的rgb颜色值");
        var hexs = [a.toString(16), b.toString(16), c.toString(16)];
        for (var i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = "0" + hexs[i];
        return "#" + hexs.join("");
    },
    getDarkColor: function (color, level) {
        color=color.toLowerCase();
        var r = /^\#?[0-9a-f]{6}$/i;
        if (!r.test(color)) return window.alert("输入错误的hex颜色值");
        var rgbc = this.HexToRgb(color);
        //floor 向下取整
        for (var i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level));
        return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2]);
    },
    getLightColor: function (color, level) {
        color=color.toLowerCase();
        var r = /^\#?[0-9a-f]{6}$/i;
        if (!r.test(color)) return window.alert("输入错误的hex颜色值");
        var rgbc = this.HexToRgb(color);
        for (var i = 0; i < 3; i++) rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i]);
        return this.RgbToHex(rgbc[0], rgbc[1], rgbc[2]);
    }

}

