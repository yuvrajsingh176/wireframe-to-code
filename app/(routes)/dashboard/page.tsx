import React from 'react'
import ImageUpload from './_components/ImageUpload'

function Dashboard() {
    return (
        <div className='xl:px-40 '>
            <p className='font-bold text-3xl text-center w-full text-primary'>Convert wireframe to code</p>
            <ImageUpload />
        </div>
    )
}

export default Dashboard