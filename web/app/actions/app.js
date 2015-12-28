
export default {active:{},user:{},setting:{},box:{}};



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
