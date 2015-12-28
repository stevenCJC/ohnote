
export default {n:0};

export function increment() {
	return (dispatch, getState) => {
		const {counter={n:0}}= getState();
		/*
		 dispatch('decrement',data)
		 dispatch({n:0});
		 
		 * */
		dispatch('decrement');
		return {
			n:counter.n+1,
			mata:{error:null,code:200,status:'SUCCESS'}
		};
	}
}

export function decrement() {
	return (dispatch, getState) => {
		
		const {counter={n:0}}= getState();
		return {
			n:counter.n-1,
			mata:{error:null,code:200,status:'SUCCESS'}
		};
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
	return async () => {
		var t= await new Promise(function (resolve, reject) {
			setTimeout(() => { resolve(Math.random()>0.5); }, 2000);
		});
		if(t) return {n:77}
		else return {n:99}
		//return dispatch('increment');
	};
}



