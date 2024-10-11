"use client"

import { useRouter } from "next/navigation"
import { BsHouse, BsPersonCircle } from "react-icons/bs"

export default function Header () {
    const router = useRouter()

    const handleProfile = () => {
      router.push('/perfil')
    }

    const handleMenu = () => {
        router.push('/')
    }
   
    return (
        <div>
            <div className="flex justify-end bg-blue-600">
                <BsHouse className="cursor-pointer text-white text-6xl p-2" onClick={handleMenu}/>
                <BsPersonCircle  className="cursor-pointer text-white text-6xl p-2" onClick={handleProfile}/>
            </div>
        </div>
    )
}