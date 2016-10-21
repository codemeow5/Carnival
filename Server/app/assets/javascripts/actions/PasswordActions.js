import {
    TYPE_CHANGE_PASSWORD_DATA,
    TYPE_CLEAN_PASSWORD_DATA,
    TYPE_UPDATE_PASSWORD_REQUEST,
    TYPE_UPDATE_PASSWORD_SUCCESS,
    TYPE_UPDATE_PASSWORD_FAILURE
} from './ActionTypes';

import * as Utils from '../utils';
import {showToast} from './ToastActions';

export function changePasswordData(name, value){
    const action = {
        type: TYPE_CHANGE_PASSWORD_DATA,
        name: name,
        value: value
    };
    return action;
}

export function resetPasswordData(){
    const action = {
        type: TYPE_CLEAN_PASSWORD_DATA
    };
    return action;
}

export function updatePasswordRequest(){
    const action = {
        type: TYPE_UPDATE_PASSWORD_REQUEST
    };
    return action;
}

export function updatePasswordSuccess(response){
    const action = {
        type: TYPE_UPDATE_PASSWORD_SUCCESS,
        response: response
    };
    return action;
}

export function updatePasswordFailure(){
    const action = {
        type: TYPE_UPDATE_PASSWORD_FAILURE
    };
    return action;
}

export function updatePassword(){
    return function(dispatch, getState){
        let rootState = getState();
        if(rootState.password.form == undefined){
            return Promise.resolve();
        }
        dispatch(updatePasswordRequest());
        return Utils.post('/api/v1/private/profile/password', rootState.password.form).then(function(response){
            return response.json();
        }).then(function(data){
            let err = data['error'];
            if(err == undefined || err.trim().length === 0){
                dispatch(updatePasswordSuccess(data));
                dispatch(showToast(
                    'success', 'Update Password', 'Password has been successfully changed!'
                ));
            } else {
                dispatch(updatePasswordFailure());
                dispatch(showToast(
                    'error', 'Update Password', data['message'] != undefined ? data['message'] : err
                ));
            }
        }).catch(function(err){
            dispatch(updatePasswordFailure());
            dispatch(showToast(
                'error', 'Bad Request', err.toString()
            ));
        });
    }
}
