import Image from 'next/image';
import styles from './page.module.css';
import Navbar from './components/Navbar';
import LandingSection from './components/LandingSection';

export default function Home() {
  return (
    <div className={styles.page}>
       <title>Ocular Genetic Registry</title>
      <Navbar/>
        {/* <div className={styles.waveImage}>
          <Image
            src="/wavelines.png" 
            alt="Wave Lines" 
            height={500} 
            width={1800}
          />
        </div> */}
      <main className={styles.main}>
        <LandingSection />
        
      </main>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#55A1B4" fillOpacity="1" d="M0,32L60,69.3C120,107,240,181,360,197.3C480,213,600,171,720,160C840,149,960,171,1080,192C1200,213,1320,235,1380,245.3L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>       
      </svg>

      <footer className={styles.footer}>
        <p className='font-lora'>© {new Date().getFullYear()} National Ocular Genetic Registry</p>
      </footer>
    </div>
  );
}
