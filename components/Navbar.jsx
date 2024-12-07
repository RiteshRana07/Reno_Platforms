import Link from "next/link";
import nav from '../styles/nav.module.css'
import Footer from "../components/Footer";

export default function Navbar() {
  return (
    <>
      <nav className={nav['body']}>
        <div className={nav['navbar']}>
          <img 
            src="https://t4.ftcdn.net/jpg/09/61/87/15/360_F_961871505_vc5G5SvoHqumND0QFX6rJtgsEsxhfu5p.jpg" 
            alt="School Logo"
          />
          <h1>Welcome To School Management System</h1>
          <p>Take control of your schools, view the complete list, and seamlessly add new schools to the platform. Use the links below for easy navigation through the system.</p>
          <div>
            <Link href="/addSchool">Add School</Link>
            <Link href="/showschools">Show Schools</Link>
          </div>
        </div>
      </nav>
      <Footer/>
    </>
  );
}
