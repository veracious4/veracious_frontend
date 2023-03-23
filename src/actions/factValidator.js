import { record } from '../apis/backend_api';
import { FACT_VALIDATION_PROGRESS, FACT_VALIDATION_PASS, FACT_VALIDATION_FAILED } from './actionTypes';

export const factValidator = (data) => async (dispatch,getState) =>{
    try{
        dispatch({type:FACT_VALIDATION_PROGRESS,payload:{isLoading: true}});

        const response = await record.get(`/validate-fact?fact=${data}`);
        console.log(JSON.stringify(response));
        console.log(response.data);
        dispatch({type:FACT_VALIDATION_PASS,payload:{data: response.data}});
    } catch(e){
        console.log(e);
        dispatch({type:FACT_VALIDATION_FAILED,payload:{error: e}});
    }
}

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

export const factValidatorAsync = (data) => async (dispatch,getState) =>{
    try{
        dispatch({type:FACT_VALIDATION_PROGRESS,payload:{isLoading: true}});

        const response = await record.get(`/validate-fact-async?fact=${data}`);
        if(response.status==202){
            const correlation_id = response.data.correlation_id;
            let response2 = await record.get(`/validate-fact-async-status?correlation_id=${correlation_id}`);
            while(response2.status==202){
                sleep(100); // sleep for 100 milliseconds
                response2 = await record.get(`/validate-fact-async-status?correlation_id=${correlation_id}`);
            }
            if(response2.status==200){
                dispatch({type:FACT_VALIDATION_PASS,payload:{data: response2.data}});
            } else if(response2.status==404){
                dispatch({type:FACT_VALIDATION_FAILED,payload:{error: response2.data}});
            }
            dispatch({type:FACT_VALIDATION_FAILED,payload:{error: response2.statusText}});


        }else{
            dispatch({type:FACT_VALIDATION_FAILED,payload:{error: response.data}});
        }
        console.log(JSON.stringify(response));

        // console.log(response.data);
        dispatch({type:FACT_VALIDATION_PASS,payload:{data: "12.5"}});
    } catch(e){
        console.log(e);
        dispatch({type:FACT_VALIDATION_FAILED,payload:{error: e}});
    }

}