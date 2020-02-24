import React from 'react'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    if (message.includes('added') || message.includes('Successfully')) {
        return (
            <div className='success'>
                {message}
            </div>
        )
    }

    return (
        <div className='error'>
            {message}
        </div>
    )
}


export default Notification