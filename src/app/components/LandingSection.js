import styles from './LandingSection.module.css';
import Image from 'next/image';

const LandingSection = () => {
    return (
        // <div>
            
        //         <div className={styles.heroImage}>
        //             <Image 
        //             src="/herobgpic.png" 
        //             alt="Hero Landing Image" 
        //             height={700} 
        //             width={700}
        //             />
        //         </div>
            
        // </div>

        

        <section>
            <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
                {/* <div class="bg-bluegreen-70 rounded-3xl p-8 md:p-12 mb-8"> */}
                <div class="bg-cover bg-no-repeat bg-[url('../../public/equipment.jpg')] bg-gray-500 bg-blend-screen backdrop-blur-lg transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0 rounded-3xl p-8 md:p-12 mb-8">
                    <h1 class="text-bluegreen-80 text-3xl md:text-5xl font-extrabold mb-8 px-12">Vision for Generations: Advancing Eye Health Through Genetics</h1>
                    <p class="text-lg font-normal text-gray-70 font-lora mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <a href="#" class="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-pink-10 hover:bg-pink-30 focus:ring-4 focus:ring-pink-1">
                        Read more
                        <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </a>
                </div>

                <div class="grid md:grid-cols-2 gap-8">
                    {/* <div class="bg-gray-300 rounded-3xl p-8 md:p-12">
                        <h2 class="text-bluegreen-90 text-3xl font-extrabold mb-8">Book an appointment now</h2>
                        <p class="text-lg font-normal text-gray-70 font-lora mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <a href="#" class="text-blue-600 hover:underline font-medium text-lg inline-flex items-center">Read more
                            <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                        </a>
                    </div> */}

                    

                    <div class="bg-white border border-gray-200 rounded-3xl">
                        <img class="rounded-t-lg" src="/femaleeyedoctor.jpg" alt="" />

                        <div class="p-5">
                            <h2 class="text-bluegreen-75 text-3xl font-extrabold mb-8">Book an appointment</h2>
                            <p class="text-lg font-normal text-gray-70 font-lora mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-bluegreen-60 rounded-lg hover:bg-bluegreen-70 focus:ring-4 focus:outline-none focus:ring-bluegreen-1">
                                Book now
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </a>
                        </div>
                    </div>


                    <div class="bg-gray-100 border border-gray-200 rounded-3xl p-8 md:p-12">
                        <h2 class="text-pink-20 text-3xl font-extrabold mb-8">Vision</h2>
                        <p class="text-lg font-normal text-gray-70 font-lora mb-12">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                        <h2 class="text-pink-20 text-3xl font-extrabold mb-8">Mission</h2>
                        <p class="text-lg font-normal text-gray-70 font-lora mb-12">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>

                    <div className={styles.HeroSection}>
                        <Image 
                        src="/herobgpic.png" 
                        alt="Hero Landing Image" 
                        height={700} 
                        width={700}
                        />
                    </div>

                    <div>                       
                        <h1 class="mb-4 mt-8 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Ocular Genetics</span></h1>
                        <h3 class="ms-2 text-2xl font-semibold text-gray-30 mb-10">What do we do?</h3>
                        <p class="text-lg font-normal text-gray-70 font-lora lg:text-xl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>


                </div>
            </div>

        </section>

        
    );
}

export default LandingSection
