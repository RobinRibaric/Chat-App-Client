import React from 'react';

import './LogoutBar.css';

const LogoutBar = () => (
    <div className="LogoutBar">
        <div className="leftInnerContainer">
            <h3>Chat</h3>
        </div>
        <div className="rightInnerContainer">
            <a href="/"><button className="disconnectButton" ><h3>Disconnect</h3></button></a>
        </div>

    </div>
);

export default LogoutBar;