import React from 'react';
import HeaderLogged from './HeaderLogged';
import HeaderNotLogged from './HeaderNotLogged';
import App from './App'
function MainPage(){
    const token=App.getToken()
    const isLoggedIn = token;
    return(
            <div>
                {isLoggedIn ? <HeaderLogged /> : <HeaderNotLogged />}

            </div>
    )
} export default MainPage;