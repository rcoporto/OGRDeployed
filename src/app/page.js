import Image from 'next/image';
import styles from './page.module.css';
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <div className={styles.page}>
       <title>Ocular Genetic Registry</title>
      <Navbar/>
      <main className={styles.main}>
        <h1 className={styles.heading}>Welcome to the Ocular Genetic Registry</h1>
        <p className={styles.description}>
          This is the central hub for all things related to ocular genetics. Explore our resources and get started with your research.
        </p>
        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="/about-us"
          >
            Learn More
          </a>
          <a
            href="/contact"
            className={styles.secondary}
          >
            Contact Us
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Ocular Genetic Registry</p>
      </footer>
    </div>
  );
}
