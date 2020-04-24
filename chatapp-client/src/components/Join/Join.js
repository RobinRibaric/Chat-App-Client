import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../context/index';



import './Join.css';

const Join = () => {
    const [name, setName] = useState("");
    const { errorInformation, setErrorInformation } = useContext(Context);

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Pick a nickname</h1>
                <h3 className="information">{errorInformation}</h3>
                <div><input placeholder="Nickname" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <Link onClick={event => (!name) ? event.preventDefault() : null} to={`/chat?name=${name}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>

        </div>
    )
}


export default Join;