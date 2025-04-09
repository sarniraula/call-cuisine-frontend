import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();
    return (
      <div className="bg-white shadow-md p-4 flex items-center justify-between">
        <img src="/logo-text.png" alt="Call Cuisine Logo" className="w-40" />

  
        {/* Future Actions (User Profile, Logout, etc.) */}
        <div className="flex items-center space-x-4">
          <button onClick={() => {
              localStorage.clear();
              router.push('/login');
              window.location.reload(); 
          }} 
          className="px-4 py-2 bg-gray-200 rounded-md">Logout</button>
        </div>
      </div>
    );
  }
  