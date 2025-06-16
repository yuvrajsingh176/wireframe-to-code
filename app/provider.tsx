"use client"
import { auth } from '@/configs/firebaseConfig';
import { Appcontext } from '@/context/Appcontext';
import { AuthContext } from '@/context/AuthContext';
import { onAuthStateChanged, User } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

interface AuthContextType {
    user: User | null;
}

function Provider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    const path = usePathname();
    const [model, setModel] = useState<string>('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe(); // Cleanup
    }, []);

    useEffect(() => {
        if (path === '/' && user?.email) {
            router.push('/dashboard');
        }
    }, [user, path]);

    return (
        <AuthContext.Provider value={{ user }}>
            <Appcontext.Provider value={{ model, setModel }}>
                <div className='w-full'>
                    {children}
                </div>
            </Appcontext.Provider>
        </AuthContext.Provider>
    )
}


// Custom hook to use auth
export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export default Provider

