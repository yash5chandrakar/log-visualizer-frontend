import React from 'react'
import { ProSidebar } from '../components/ProSidebar'

export const About = () => {
    return (
        <div className='dashboardOuter'>
            <ProSidebar />
            <div className='dashboardInner mt-5 mx-3'>
                <h1>About</h1>
                This project was developed by Yash Chandrakrar, a MERN stack developer skilled in Next.js, PostgreSQL, AWS services, and AI integration.
            </div>
        </div>
    )
}
