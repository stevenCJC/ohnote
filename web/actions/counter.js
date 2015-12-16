
export default {n:0};

export function increment() {
	return (dispatch, getState) => {
		const {counter={n:0}}= getState();
		/*
		 dispatch('decrement',data)
		 dispatch({n:0});
		 
		 * */
		dispatch('decrement');
		return dispatch({
			n:counter.n+1,
			mata:{error:null,code:200,status:'SUCCESS'}
		});
	}
}

export function decrement() {
	return (dispatch, getState) => {
		
		const {counter={n:0}}= getState();
		return dispatch({
			n:counter.n-1,
			mata:{error:null,code:200,status:'SUCCESS'}
		});
	}
}

export function incrementIfOdd() {
	return (dispatch, getState) => {
		const {counter}= getState();

		if (counter.n % 2 === 0) {
			return
		}
		dispatch('increment');
	}
}

export function incrementAsync() {
	return async (dispatch, getState) => {
		await new Promise(function (resolve, reject) {
			setTimeout(() => { resolve(); }, 2000);
		});
		return dispatch('increment');
	}
}



