import React, { useState } from 'react';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));


const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/'
});

if(currentUserSubject.value){
    API.defaults.headers.common['Authorization'] = 'Token ' + currentUserSubject.value.Token;
}

export default API;