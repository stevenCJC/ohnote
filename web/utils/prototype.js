define(function () {

    Date.prototype.format=function(format) {
        d = this;
        var Y = d.getFullYear().toString();
        var M = (d.getMonth() + 1).toString();
        var D = d.getDate().toString();
        var h = d.getHours().toString();
        var m = d.getMinutes().toString();
        var s = d.getSeconds().toString();
        if (!format) return Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
        else {
            format = format.replace(/YYYY/, Y);
            format = format.replace(/YY/, Y.substr(2));
            format = format.replace(/MM/, M.length == 1 ? '0' + M : M);
            format = format.replace(/M/, M);
            format = format.replace(/DD/, D.length == 1 ? '0' + D : D);
            format = format.replace(/D/, D);
            format = format.replace(/hh/, h.length == 1 ? '0' + h : h);
            format = format.replace(/h/, h);
            format = format.replace(/mm/, m.length == 1 ? '0' + m : m);
            format = format.replace(/m/, m);
            format = format.replace(/ss/, s.length == 1 ? '0' + s : s);
            format = format.replace(/s/, s);
            return format;
        }

    }
	
	


});