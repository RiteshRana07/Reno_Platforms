import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/ShowSchools.module.css'; 
import Link from 'next/link'; 
import Footer from "../components/Footer";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get('/api/getSchools');
        setSchools(response.data);
      } catch (error) {
        console.error('Error fetching schools:', error);
      } finally {
        setLoading(false); 
      }
    };
    fetchSchools();
  }, []);

  return (
    <>
      <div className={styles['body']}>
        <nav className={styles.navbar}>
          <Link href="/" className={styles.homeLink}>Home</Link>
          {!loading && schools.length > 0 && (
            <Link href="/addSchool" className={styles.link}>Add Schools</Link>
          )}
        </nav>

        {!loading && schools.length > 0 && (
          <h2 className={styles['title']}>List of Schools</h2>
        )}

        {loading ? (
          <p className={styles['loading']}>Loading...</p>
        ) : schools.length === 0 ? (
          <div className={styles['no-data']}>
            <p>No schools available.</p>
            <Link href="/addSchool" className={styles['add-school-link']}>
              Add a School
            </Link>
          </div>
        ) : (
          <div className={styles['school-list']}>
            {schools.map((school) => (
              <div key={school.id} className={styles['school-card']}>
                <img src={school.image} alt={school.name} />
                <div className={styles['details']}>
                  <h3>{school.name}</h3>
                  <p>{school.address}</p>
                  <p>{school.city}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
