import React from 'react'

export const NotFound = () => {
    return (
        <div className='d-flex justify-content-center align-items-center flex-column gap-3 mt-4' style={{ width: '100%' }}>
            <h1 className='text-danger mt-5'>404!</h1>
            <p>Resource not found!</p>
        </div>
    )
}
