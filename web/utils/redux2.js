'use strict';

exports.__esModule = true;
exports['redux2'] = redux2;
exports['reducerMaker'] = reducerMaker;
exports['redux2Middleware'] = redux2Middleware;

var info = null,localDispatch;

function redux2Middleware_(actions, binders) {
	return function (_ref) {
		let action;
		var getState = _ref.getState;
		return function (next) {
			return function (action) {
				console.log(arguments);
				let actionName,
				stateName,arg=action;

				if (typeof action === 'object') {
					if (action['_REDUX2_ACTION_NAME_']) {
						
						if(!actions[action['_REDUX2_ACTION_NAME_']]) 
								throw 'please make sure the '+action['_REDUX2_ACTION_NAME_']+' exist.' ;
						
						actionName = action['_REDUX2_ACTION_NAME_'];
						stateName = binders[actionName];
						action = actions[actionName](action.data);

					} else {
						//其他类型的action直接流过
						return next(action);
					}
				}
				
				if(typeof action ==='undefined') return;
				
				if (typeof action === 'function') {
					
					action = action(localDispatch, getState);//必须使用本地方法注入到action中
					
					if(typeof action ==='undefined') return;
					
					if(action.then){ // 支持promise
						action.then(function(data){
							next({
								type : Symbol(),
								[stateName] : data
							});
						},function (error) {
							localDispatch({error:error,action:arg});
						});
					}else{
					
						return next({
							type : Symbol(),
							[stateName] : action
						});
					}
					
				} else {
					return next({
						type : Symbol(),
						[stateName] : action
					});
				}

				/* //重发布
				function dispatch(arg1, arg2) { 
					var action;
					if (typeof arg1 === 'string') {//string分流，否则重新发布
						// dispatch('increment',{step:2});
						if(!actions[arg1]) throw 'please make sure the '+arg1+' exist.' ;
						action = actions[arg1](arg2);
						
						if(typeof action ==='undefined') return;
						
						if (typeof action === 'function'){
							action = action(dispatch, getState);
							
							if(typeof action ==='undefined') return;
							
							if(action.then){ // 支持promise
								action.then(function(data){
									next({
										type : Symbol(),
										[binders[arg1]] : data
									});
								},function (error) {
									next({error:error,action:arg});
								});
							}else{
							
								return next({
									type : Symbol(),
									[binders[arg1]] : action
								});
							}
						}else
							return next({
								type : Symbol(),
								[binders[arg1]] : action
							});
					} else {
						return next({
							type : Symbol(),
							[binders[arg1]] : arg1
						});
					}
				} */
			};
		};
	}
}

function reducerMaker(conf) {
	info = process(conf);
	return info.reducers;
}

function redux2(store) {

	const dispatch = store.dispatch;
	const {
		actions,
		binders
	}
		 = info;

	localDispatch=store.dispatch = function (arg1, arg2) {
		var obj;
		if (typeof arg1 === 'string') {
			obj = {};
			obj['_REDUX2_ACTION_NAME_'] = arg1;
			obj.data = arg2;
		} else {
			//console.error(arguments);
			//throw 'the first argument of dispatch should be string';
			//return;
		}
		dispatch.call(this, obj || arg1);
	}

}

function redux2Middleware() {
	return redux2Middleware_(info.actions, info.binders);
}

function process(conf) {

	let[ reducers, actions, binders] = [{}, {}, {} ];
	
	
	
	for (let i = 0; i < conf.length; i++) {
		let req = conf[i];

		req.keys().forEach(function (name) {

			let key = name.replace(/.*?\/([a-zA-Z0-9_\$]+?)\.js/, function (item, $1) {
					return $1;
				});

			let obj = req(name);
			//初始化默认值
			if (typeof obj === 'undefined') {
				throw  ` the action $ {name}should had a defaultvalue ` ;
				return;
			}
			if (obj == null)
				obj = {
				default:
					null
				};
			else if (obj.constructor !== Object)
				obj = {
				default:
					obj
				};

			//console.log('初始值',obj);

			reducers[key] = (function (name, key, obj) {
				return function reducer(state, action) {

					//初始化
					if (typeof state === 'undefined') {
						if (obj['default'].constructor === Object) {
							return Object.assign({}, obj['default']);
						} else {
							return obj['default'] || null;
						}
					} else {
						//没更新
						if (typeof action[key] === 'undefined') {
							return state;
						} else {
							if (obj['default'].constructor != Object)
								return action[key];
							else
								return Object.assign({}, state, action[key]);
						}
					}
					
				}
			})(name, key, obj);

			obj = {...obj};
			delete obj.default;
			Object.keys(obj).forEach((item) => {
				binders[item] = key;
			});
			Object.assign(actions, obj);
		
		});

	}
	
	return {
			actions : actions,
			reducers : reducers,
			binders : binders
		};
}
	
