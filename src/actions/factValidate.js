import { record } from '../apis/backend_api';
import { FACT_VALIDATION_PROGRESS, FACT_VALIDATION_PASS, FACT_VALIDATION_FAILED } from './actionTypes';

export const factValidator = (data, setLoading) => async (dispatch,getState) =>{
    try{
        setLoading(true);
        dispatch({type:FACT_VALIDATION_PROGRESS,payload:{isLoading: true}});

        const response = await record(data.token).get(`/validate-fact?fact=${data}`);
        console.log(JSON.stringify(response));
        console.log(response.data);
        dispatch({type:FACT_VALIDATION_PASS,payload:{data: response.data}});
    } catch(e){
        console.log(e);
        dispatch({type:FACT_VALIDATION_FAILED,payload:{error: e}});
    }
    setLoading(false);
}