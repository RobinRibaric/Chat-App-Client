import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';


import Context from '../../context/index';
import Messages from '../Messages/Messages.js';
import TextInput from '../TextInput/TextInput.js';
import LogoutBar from '../LogoutBar/LogoutBar.js';
import './Chat.css';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [inactive, setDisconnect] = useState(false);
    const { errorInformation, setErrorInformation } = useContext(Context);
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {
        const { name } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);

        socket.emit('join', { name }, () => {
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT, location.search]);


    useEffect(() => {
        socket.on('message', (message) => {
            setMessages(messages => [...messages, message]);
        });
        socket.on('disconnect', () => {
            setDisconnect(true);
        });
        socket.on('problem', (error) => {
            console.log(error.error);
            setErrorInformation(error.error);
        });
        socket.on('connect_error', (error) => {
            setErrorInformation('Connection error');
            setDisconnect(true);
        })
    }, []);


    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sentMessage', message, () => setMessage(''))
        }
    };

    return (
        <div className="outerContainer">

            <div className="container">
                {inactive ? <Redirect to='/' /> : null}
                <LogoutBar />
                <Messages messages={messages} name={name} />
                <TextInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>

    )
}


export default Chat;