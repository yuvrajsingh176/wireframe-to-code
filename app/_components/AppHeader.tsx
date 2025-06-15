import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import ProfileAvatar from './ProfileAvatar'

function AppHeader({ hideSidebar = false }) {
    return (
        <div>
            <div className='p-4 shadow-sm flex items-center justify-between w-full '>
                {!hideSidebar && <SidebarTrigger />}
                <div className='flex justify-end'>
                    <ProfileAvatar />
                </div>
            </div>

        </div>
    )
}

export default AppHeader