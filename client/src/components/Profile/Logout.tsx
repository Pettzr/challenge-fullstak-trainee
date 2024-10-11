import { useRouter } from "next/navigation";

export default function LogoutButton () {
    const router = useRouter();
  
    const handleLogout = async () => {
      try {
        const response = await fetch('http://localhost:5000/logout', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
  
        const data = await response.json();
        if (data.success) {
          router.push("/login");
          window.location.reload();
        } else {
          alert('Erro ao fazer logout');
        }
      } catch (error) {
        alert('Erro ao enviar a requisição');
      }
      
    };
  
    return (
      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200" onClick={handleLogout}>
        Logout
      </button>
    );
  };