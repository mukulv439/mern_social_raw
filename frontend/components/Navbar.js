import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link href="/">My Social App</Link>
        </div>
        <div className="space-x-6 text-white hidden md:flex">
          <Link href="/" className="hover:text-gray-300 transition">Feed</Link>
          <Link href="/new-post" className="hover:text-gray-300 transition">New Post</Link>
          <Link href="/login" className="hover:text-gray-300 transition">Login</Link>
        </div>
        <div className="md:hidden">
          {/* Add a simple mobile menu here if needed */}
        </div>
      </div>
    </nav>
  );
}
