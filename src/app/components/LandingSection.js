import styles from './LandingSection.module.css';
import Image from 'next/image';

const LandingSection = () => {
    return (
        <div>
        <section className={styles.landing}>
            <section className={styles.landingContent}>
                <h2>What do we do?</h2>
            </section>
            {/* <section className={styles.infoContent}>
                <h2>Who can participate?</h2>
            </section> */}
            
        </section>

        {/* <section className={styles.info}>
        </section> */}
        </div>
    );
}

export default LandingSection
