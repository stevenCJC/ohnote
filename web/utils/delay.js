define(function() {

	
	// Delays a function for the given number of milliseconds, and then calls
	// it with the arguments supplied.
	/*
		1、一定时间段内触发多次，期间最后一次延迟后执行
		2、一定时间段内触发多次，期间仅执行一次
		3、每次触发，在上次结束后一定时间间隔后才执行
		4、until
	*/
	var delay={
	
		wait : function (func, wait) {
			var args = Array.prototype.slice.call(arguments, 2);
			return setTimeout(function () {
				return func(args);
			}, wait);
		},
	
		// Defers a function, scheduling it to run after the current call stack has
		// cleared.
		defer : function (func) {
			return $.delay.apply(_, [func, 1].concat(Array.prototype.slice.call(arguments, 1)));
		},
	
		// Returns a function, that, when invoked, will only be triggered at most once
		// during a given window of time.
		callFirst : function (func, wait) {
			var context,
			args,
			timeout,
			result;
			var previous = 0;
			var later = function () {
				previous = new Date;
				timeout = null;
				result = func.apply(context, args);
			};
			return function () {
				var now = new Date;
				var remaining = wait - (now - previous);
				context = this;
				args = arguments;
				if (remaining <= 0) {
					clearTimeout(timeout);
					timeout = null;
					previous = now;
					result = func.apply(context, args);
				} else if (!timeout) {
					timeout = setTimeout(later, remaining);
				}
				return result;
			};
		},
		
		
		callLast : function(func, wait) {
			var context, args, timeout;
			
			function thr() {
				context = this;
				args = arguments;
				clearTimeout(timeout);
				timeout = setTimeout(function() {
					func.apply(context, args);
				}, wait);
			};
			thr.stop=function(){
				clearTimeout(timeout);
			};
			return thr;
		},
		// Returns a function, that, as long as it continues to be invoked, will not
		// be triggered. The function will be called after it stops being called for
		// N milliseconds. If `immediate` is passed, trigger the function on the
		// leading edge, instead of the trailing.
		debounce : function (func, wait, immediate) {
			var timeout,
			result;
			return function () {
				var context = this,
				args = arguments;
				var later = function () {
					timeout = null;
					if (!immediate)
						result = func.apply(context, args);
				};
				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow)
					result = func.apply(context, args);
				return result;
			};
		},
	
		// Returns a function that will be executed at most one time, no matter how
		// often you call it. Useful for lazy initialization.
		once : function (func) {
			var ran = false,
			memo;
			return function () {
				if (ran)
					return memo;
				ran = true;
				memo = func.apply(this, arguments);
				func = null;
				return memo;
			};
		},
	
		// Returns a function that will only be executed after being called N times.
		after : function (times, func) {
			if (times <= 0)
				return func();
			return function () {
				if (--times < 1) {
					return func.apply(this, arguments);
				}
			};
		},
		
		
		until : function(handle,callback,timing){
			if(arguments.length==2){
				timing=200;
			}
			var t=setInterval(function(){
				if(handle()){
					callback();
					clearInterval(t);
					t=null;
				}
			},timing);
		}
	}
	
	return delay;
});