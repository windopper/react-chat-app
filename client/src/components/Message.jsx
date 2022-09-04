import React from 'react';

const Message = ({message: {text, user}, name}) => {
    console.log(text, user);
    let isSendByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName) {
        isSendByCurrentUser = true;
    }

    return isSendByCurrentUser ? (
        <div>
            <p>{trimmedName}</p>
            <div>
                <p>{text}</p>
            </div>
        </div>
    ) : (
        <div>
            <div>
                <p>{text}</p>
            </div>
            <p>{user}</p>
        </div>
    )
}

export default Message;