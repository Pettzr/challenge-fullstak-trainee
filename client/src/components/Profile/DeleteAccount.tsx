import { useRouter } from "next/navigation";

export default function DeleteAccountButton () {
    const router = useRouter();
  
    const handleDelete = async () => {
      const response = await fetch("http://localhost:5000/delete-user", {
        method: "DELETE",
        credentials: "include",
      });
  
      console.log(response)
      if (response.ok) {
        router.push("/registro");
      } else {
        alert("Failed to delete account");
      }
    };
  
    const confirmDelete = () => {
      const confirmDelete = window.confirm(
        "Tem certeza que deseja excluir sua conta? Esta ação é irreversível."
      );
      if (confirmDelete) {
        handleDelete();
      }
    };
  
    return (
      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200" onClick={confirmDelete}>
        Delete Account
      </button>
    );
  };