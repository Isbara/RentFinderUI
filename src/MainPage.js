import React from 'react';
import HeaderLogged from './HeaderLogged';
import HeaderNotLogged from './HeaderNotLogged';

function MainPage({getToken}){
    const token=getToken()
    const isLoggedIn = token;
    return(
            <div>
                {isLoggedIn ? <HeaderLogged /> : <HeaderNotLogged />}
            </div>
    )


    
} export default MainPage;