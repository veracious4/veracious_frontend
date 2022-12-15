import {record, authRecord} from '../apis/backend_api';
import history from '../history';
import {SIGN_UP, AUTH_FAILED, SIGN_IN, SIGN_OUT, FORGOT_PASS, 
    FORGOT_PASS_FAILED, RESET_PASS, RESET_PASS_FAILED, RESET_USER_PROFILE} from './actionTypes'

export const signUp = (userDetails) => async (dispatch,getState) =>{
    try{
        const response = await record.post('/auth/register/', userDetails);
        const data = {
            token:response.data.token,
            timestamp:Date.now()
        }

        localStorage.setItem('v_isSignedIn','true');
        localStorage.setItem('v_timestamp', data.timestamp);
        localStorage.setItem('v_token', data.token);
        history.push('/');
        console.log("User created");
        dispatch({type:SIGN_UP,payload:response.data});
    }catch(e){
        let error = e;
        console.log(e.response);
        if(e.response){
            if(e.response.data.code===11000){
                error = "This email id already exist"
            }else{
                error = e.response.statusText;
            }
        }
        dispatch({type:AUTH_FAILED, payload:{error}})
    }
}

export const signIn = (userDetails) => async (dispatch, getState) =>{
    try{
        const response = await record.post('/auth/login/', userDetails);
        console.log(response)
        const data = {
            token:response.data.token,
            timestamp:Date.now()
        }
        localStorage.setItem('v_isSignedIn','true');
        localStorage.setItem('v_timestamp', data.timestamp );
        localStorage.setItem('v_token',  data.token);
        history.push('/');
        dispatch({type:SIGN_IN, payload:response.data});
    }catch(e){
        let error = e;
        console.log(e.response);
        if(e.response){
            if(e.response.data){
                error = e.response.data;
            }else{
                error = e.response.statusText;
            }
        }
        dispatch({type:AUTH_FAILED, payload:{error}})
    }

}

// auth record is a function that acceprts the auth token as an argument
export const signOut = (userDetails) => async (dispatch,getState) =>{
    const token = userDetails.token;
    try{
        await authRecord(token).post('/users/logout');
        localStorage.removeItem('v_token')
        localStorage.removeItem('v_timestamp')
        localStorage.removeItem('v_isSignedIn')
        // history.push('/logout');
        dispatch({type:SIGN_OUT, payload:{msg:"You have been logged out successfully"}});
        dispatch({type:RESET_USER_PROFILE, payload:""})
    }catch(e){
        localStorage.removeItem('v_token')
        localStorage.removeItem('v_timestamp')
        localStorage.removeItem('v_isSignedIn')
    }
    
}

// export const forgetPassword = (userDetails) => async (dispatch,getState) =>{
//     try{
//         const response = await record.post('/users/forgot_password', userDetails);
//         console.log(response.data.message);
//         dispatch({type:FORGOT_PASS,payload:response.data});
//     }catch(e){
//         let error;
//         if(e.response){
//             if(e.response.status===401){
//                 error = e.response.data.message||"Unsuccessfull";
//             }
//             else{
//                 error = e.response.statusText;
//             }
//         }
//         console.log(error);
//         dispatch({type:FORGOT_PASS_FAILED, payload:{error}})
//     }
// }

// export const resetPassword = (userDetails) => async (dispatch,getState) =>{
//     try{
//         const response = await record.post('/users/reset_password', userDetails);
//         console.log(response.data);
//         dispatch({type:RESET_PASS,payload:response.data});
//     }catch(e){
//         let error;
//         if(e.response){
//             if(e.response.status===401){
//                 error = e.response.data||"Unsuccessfull";
//             }
//             else{
//                 error = e.response.statusText;
//             }
//         }
//         console.log(e.response.data);
//         dispatch({type:RESET_PASS_FAILED, payload:{error}})
//     }
// }
export const sessionExpiry = () => async (dispatch,getState) =>{
    localStorage.removeItem('v_token')
    localStorage.removeItem('v_timestamp')
    localStorage.removeItem('v_isSignedIn')
    dispatch({type:SIGN_OUT, payload:{msg:"Your session has expired. Please login again"}});
}