import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserTokenContext } from './context';
import axiosMain from '../api/mainAxios';
const Protection = ({ role }) => {

    if(role == 0){
        return <Redirect to="/login" />
    }else{
        //Go 

    }

    return children;
}
