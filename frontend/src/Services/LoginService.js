import { BehaviorSubject } from 'rxjs';
import API from './Base';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    EmailConfirmation,
    PasswordConfirmation,
    SetPassword,
    currentUser: currentUserSubject.asObservable(),
    get userRole () { return currentUserSubject.value.Role },
    get currentUserValue () { return currentUserSubject.value }
};

function login(email,password){
    console.log(email,password)
    const request = API.post('login/',{
        email: email,
        password: password
    },{})
    request
        .then(function(response){
            console.log(response.data)
            localStorage.setItem('currentUser', JSON.stringify(response.data))
            API.defaults.headers.common['Authorization'] = 'Token ' + response.data.Token
            currentUserSubject.next(response.data)
        })
    return request
}


function logout() {
    API.post('logout/',{})
    .then(function(response){
        if(response){
            localStorage.removeItem('currentUser')
            localStorage.removeItem('projectID')
            currentUserSubject.next(null)
        }
    })
    .catch(function(error){
        console.log(error)
    })
}

function EmailConfirmation(email){
    const request = API.post('emailconfirmation/',{
        email: email
    })
    return request
}

function PasswordConfirmation(uid,token){
    const request = API.post('passconfirmation/',{
        uid: uid,
        token: token
    })
    return request
}

function SetPassword(password,retypedPass,confirm){
    const request = API.post('resetpassword/',{
        password: password,
        retypedPass: retypedPass,
        confirm: confirm
    })
    return request
}