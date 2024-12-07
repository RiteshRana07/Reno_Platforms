import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">Welcome to School Management</h1>
        <div className="space-x-4">
          <Link
            href="/addSchool"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Add School
          </Link>
          <Link
            href="/showschools"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Show Schools
          </Link>
        </div>
      </main> */}
      
    </>
  );
}
