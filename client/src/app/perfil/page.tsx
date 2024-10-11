"use client";

import DeleteAccountButton from "@/components/Profile/DeleteAccount";
import ChangeUsernameForm from "@/components/Profile/EditProfile";
import LogoutButton from "@/components/Profile/Logout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page () {
    const router = useRouter()

    const isLoggedIn = async () => {

        try{
            const response = await fetch('http://localhost:5000/check-login', {
                method: 'GET',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                },
              });

            if(!response.ok) {
                router.push('/login')
            }
        } catch (error) {
            console.log(error)
            router.push('/login')
        }

    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Account Settings</h1>
            <div>
                <h2 className="text-lg font-semibold">Logout</h2>
                <LogoutButton />
            </div>
            <div>
                <h2 className="text-lg font-semibold">Delete Account</h2>
                <DeleteAccountButton />
            </div>
            <div>
                <h2 className="text-lg font-semibold">Trocar usuário</h2>
                <ChangeUsernameForm/>
            </div>
        </div>
    )
}