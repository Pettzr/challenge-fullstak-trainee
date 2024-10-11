
export default function LoadingMessage () { 

    return (
        <div className="flex justify-center items-center mt-72">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <span className="ml-4 text-lg">Buscando eventos...</span>
        </div>
    )
;}