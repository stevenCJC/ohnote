'use strict';

exports.__esModule = true;
exports['redux2'] = redux2;
exports['reducerMaker'] = reducerMaker;
exports['redux2Middleware'] = redux2Middleware;

var info = null;

function redux2Middleware_(actions, binders) {
	return function (_ref) {
		let action;
		var getState = _ref.getState;
		return function (next) {
			return function (action) {
				console.log(arguments);
				let actionName,
				stateName;

				if (typeof action === 'object') {
					if (action['_REDUX2_ACTION_NAME_']) {

						actionName = action['_REDUX2_ACTION_NAME_'];
						stateName = action['_REDUX2_STATE_NAME_'];
						action = actions[actionName](action.data);

					} else {
						//其他类型的action直接流过
						return next(action);
					}
				}

				if (typeof action === 'function') {
					action = action(dispatch, getState);
					return next({
						type : Symbol(),
						[stateName] : action
					});
				} else {
					return next({
						type : Symbol(),
						[action['_REDUX2_STATE_NAME_']] : action
					});
				}

				function dispatch(arg1, arg2) {
					var action;
					if (typeof arg1 === 'string') {
						// dispatch('increment',{step:2});
						action = actions[arg1](arg2);
						if (typeof action === 'function')
							return action(dispatch, getState);
						else
							return next({
								type : Symbol(),
								[binders[arg1]] : action
							});
					} else if (typeof arg1 === 'function') {
						return arg1(dispatch, getState);
					} else {
						// dispatch({n:3});
						return next({
							type : Symbol(),
							[stateName] : arg1
						});
					}
				}
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
	} = info;

	store.dispatch = function (arg1, arg2) {
		var obj;
		if (typeof arg1 === 'string') {
			obj = {};
			obj['_REDUX2_ACTION_NAME_'] = arg1;
			obj['_REDUX2_STATE_NAME_'] = binders[arg1];
			obj.data = arg2;
		} else {
			console.error(arguments);
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

	const[req, reducers, actions, binders] = [conf, {}, {}, {}

	];

	console.log(req.keys());

	req.keys().forEach(function (name) {

		let key = name.replace(/.*?\/([a-zA-Z0-9_\$]+?)\.js/, function (item, $1) {
				return $1;
			});

		let obj = req(name);
		//初始化默认值
		if (typeof obj === 'undefined')
			throw 'the action should had a default value';
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
				//有更新的情况
				//console.log(name,obj['default'],Object.assign({},state,action[key]||obj['default'],{meta:action.meta}));


			}
		})(name, key, obj);

		obj = {
			...obj
		};
		delete obj.default;
		Object.keys(obj).forEach((item) => {
				binders[item] = key;
			});
		Object.assign(actions, obj);
	});

	return {
		actions : actions,
		reducers : reducers,
		binders : binders
	}

}
