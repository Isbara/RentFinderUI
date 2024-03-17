import React from 'react';
import HeaderLogged from './HeaderLogged';
import HeaderNotLogged from './HeaderNotLogged';

function MainPage(){
    const isLoggedIn = false;

    return(
            <div>
                {isLoggedIn ? <HeaderLogged /> : <HeaderNotLogged />}

            </div>
    )
} export default MainPage;