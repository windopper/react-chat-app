import React from 'react';

const TextContainer = ({users}) => {
    return (
        <div>
            <div>
                <h1>
                    실시간 채팅 프로그램{' '}
                    <span role='img' aria-label='emoji'>
                    💬
                    </span>
                </h1>
                <h2>
                    Created with React, Express, Node and Socket.IO{' '}
                </h2>
                <span role='img' aria-label='emoji'>
                ❤️
                </span>

            </div>
            {users ? (
                <div>
                    <h1>현재 채팅중인 사람들: </h1> 
                    <div>
                        <h2>
                            {users.map(({name}) => (
                                <div key={name} className='activeItem'>
                                    {name}
                                </div>
                            ))}
                        </h2>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default TextContainer;