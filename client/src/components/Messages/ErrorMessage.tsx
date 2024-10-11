import Link from "next/link";

export default function ErrorMessage ({message}: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="text-red-500 text-lg font-semibold mb-4">{message}</div>
                <Link href="/login">
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">
                    Ir para Login
                </button>
                </Link>
        </div>
    )
}