import 'babel-polyfill'
import React,{Component,PropTypes} from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware ,combineReducers } from 'redux'
import { ReduxRouter, routerStateReducer, reduxReactRouter} from 'redux-router'
import { Route, IndexRoute, Redirect} from 'react-router'
import {createHistory} from 'history'

import {redux2,reducerMaker,redux2Middleware} from './utils/redux2'

import 'style/reset.css'
import 'style/util.css'
import 'style/nokia20.css'
import 'style/iconfont/iconfont.css'


import util from 'utils/utilty';

var reduc=reducerMaker([require.context('./app/actions', true, /\.js$/)]);

const reducers=combineReducers({...reduc, router: routerStateReducer});



const store = compose(
	applyMiddleware( redux2Middleware()),
	reduxReactRouter({createHistory})
)(createStore)(reducers); 


redux2(store);



class Root extends Component {
	componentDidMount() {
		util.calcRem();
	}
	render(){return (
		<Provider store={store}> 

			<ReduxRouter>
				<Route path="/" component={require('./login/Login')}/>
				<Route path="/login" component={require('./login/Login')}/>
				<Route path="/intro" component={require('./intro/Intro')}/>
				<Route path="/help" component={require('./help/Help')}/>
				<Route path="/:username" component={require('./app/App')} />
			</ReduxRouter>
		</Provider>
		);
	}	
}

ReactDOM.render(<Root/>, document.querySelector('#main'));