import { useForm } from 'react-hook-form';
import axios from 'axios';
import Link from 'next/link';
import styles from '../styles/AddSchool.module.css'; 
import Footer from "../components/Footer";

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('image', data.image[0]);
      const imageUpload = await axios.post('/api/uploadImage', formData); 

      const schoolData = {
        ...data,
        image: imageUpload.data.imageUrl,
      };

      await axios.post('/api/addSchool', schoolData);
      alert('School added successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add school.');
    }
  };

  return (
    <>
    <div className={styles['body']}>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.homeLink}>Home</Link>
        <Link href="/showschools" className={styles.link}>Show Schools</Link>
      </nav>

      
        <div className={styles['form-container']}>
          <h2>Add School</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('name', { required: true })} placeholder="School Name" />
            {errors.name && <span>Name is required</span>}

            <input {...register('address', { required: true })} placeholder="Address" />
            {errors.address && <span>Address is required</span>}

            <input {...register('city', { required: true })} placeholder="City" />
            {errors.city && <span>City is required</span>}

            <input {...register('state', { required: true })} placeholder="State" />
            {errors.state && <span>State is required</span>}

            <input type="number" {...register('contact', { required: true, min: 1000000000 })} placeholder="Contact" />
            {errors.contact && <span>Valid Contact is required</span>}

            <input type="email" {...register('email_id', { required: true })} placeholder="Email" />
            {errors.email_id && <span>Email is required</span>}

            <input type="file" {...register('image', { required: true })} />
            {errors.image && <span>Image is required</span>}

            <button type="submit" className={styles.submitButton}>Add School</button>
          </form>
        </div>
      </div>
      <Footer />
      </>
  );
}
