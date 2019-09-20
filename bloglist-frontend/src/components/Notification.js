import React from 'react'

const Notification = ({ notification }) => {
    if(!notification){
        return null
    }
    const { message,status } = notification
    return (
        <div className={status === 'success' ? 'notification' : 'notification failure'}>
            <p>{message}</p>
        </div>
    )
}

export default Notification