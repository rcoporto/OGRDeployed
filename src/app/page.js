import Image from 'next/image';
import styles from './page.module.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import LandingSection from './components/LandingSection';

export default function Home() {
  return (
    <div className={styles.page}>
       <title>Ocular Genetic Registry</title>
      <Navbar/>
        <div className={styles.waveImage}>
          <Image
            src="/wavelines.png" 
            alt="Wave Lines" 
            height={500} 
            width={1800}
          />
        </div>
      <main className={styles.main}>
        <HeroSection />
        {/* <LandingSection /> */}

        {/* <h1 className={styles.heading}>Welcome to the Ocular Genetic Registry</h1>
        <p className={styles.description}>
          This is the central hub for all things related to ocular genetics. Explore our resources and get started with your research.
        </p> */}


        {/* <div className={styles.ctas}>
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
        </div> */}
      </main>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#2E4756" fillOpacity="1" d="M0,32L60,69.3C120,107,240,181,360,197.3C480,213,600,171,720,160C840,149,960,171,1080,192C1200,213,1320,235,1380,245.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        
      </svg>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Ocular Genetic Registry</p>
      </footer>
    </div>
  );
}
