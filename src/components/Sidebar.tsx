import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Order Manager</h2>
      <nav>
        <ul>
          <li className="mb-2">
            <Link href="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          </li>
          <li className="mb-2">
            <Link href="/orders" className="hover:text-gray-300">Orders</Link>
          </li>
          <li className="mb-2">
            <Link href="/settings" className="hover:text-gray-300">Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;