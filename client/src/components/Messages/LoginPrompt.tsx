import Link from "next/link";

export default function LoginPrompt () {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-lg font-semibold mb-4">Faça login para ver seus eventos.</div>
            <div className="flex space-x-4">
            <Link href="/login">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                Login
                </button>
            </Link>
            <Link href="/registro">
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
                Registrar
                </button>
            </Link>
            </div>
        </div>
    )
}