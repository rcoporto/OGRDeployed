import styles from './HeroSection.module.css';
import Image from 'next/image';

const HeroSection = () => {
    return (
        <div>
            <div className={styles.heroLanding}>
                <div className={styles.heroLandingContent}>
                    <h1 className={styles.header}>Welcome to the Ocular Genetic Registry</h1>
                    <p className={styles.description}>This is the central hub for all things related to ocular genetics. Explore our resources and get started with your research.</p>
                    <p className={styles.description2}>Learn more ➜</p>
                    
                </div>
                
                
                <div className={styles.heroImage}>
                    <Image 
                    src="/herobgpic.png" 
                    alt="Hero Landing Image" 
                    height={700} 
                    width={700}
                    />
                </div>
            </div>
        </div>
    );
}

export default HeroSection
