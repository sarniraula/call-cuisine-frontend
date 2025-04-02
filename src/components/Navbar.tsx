export default function Navbar() {
    return (
      <div className="bg-white shadow-md p-4 flex items-center justify-between">
        {/* Logo Placeholder */}
        <div className="text-2xl font-bold">Call Cuisine</div>
  
        {/* Future Actions (User Profile, Logout, etc.) */}
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-gray-200 rounded-md">Profile</button>
        </div>
      </div>
    );
  }
  