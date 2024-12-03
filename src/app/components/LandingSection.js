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
                <div class="bg-cover bg-no-repeat bg-[url('../../public/equipment.jpg')] bg-gray-500 bg-blend-screen backdrop-blur-lg transition-all duration-300 cursor-pointer filter hover:grayscale rounded-3xl p-8 md:p-12 mb-8">
                    <h1 class="text-bluegreen-80 text-3xl md:text-5xl font-extrabold mb-8 px-12">Vision for Generations: Advancing Eye Health Through Genetics</h1>
                    <p class="text-lg font-normal text-gray-70 font-lora mb-6">The Ocular Genetic Registry project aims to revolutionize the management of inheritable retinal diseases through a digital platform. Designed for patients, ophthalmologists, and researchers, the registry enables users to contribute and access a robust database of genetic and clinical data. This platform facilitates accurate diagnosis, supports cutting-edge research, and fosters a collaborative approach to advancing eye health and genetic understanding.</p>
                    <a href="http://localhost:3000/basic-info" class="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-pink-10 hover:bg-pink-30 focus:ring-4 focus:ring-pink-1">
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
                            <h2 class="text-bluegreen-75 text-3xl font-extrabold mb-8">About Ocular Genetic Registry</h2>
                            <p class="text-lg font-normal text-gray-70 font-lora mb-6">The Ocular Genetic Registry serves as an essential tool for ophthalmologists and researchers, offering a comprehensive database of inheritable retinal diseases. It allows professionals to share clinical data, track genetic information, and collaborate on breakthroughs in diagnosis and treatment. With this resource, the platform contributes to more effective research and ultimately better outcomes for patients.</p>
                            <a href="/inquire-now" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-bluegreen-60 rounded-lg hover:bg-bluegreen-70 focus:ring-4 focus:outline-none focus:ring-bluegreen-1">
                                Contact us
                                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </a>
                        </div>
                    </div>


                    <div class="bg-gray-100 border border-gray-200 rounded-3xl p-8 md:p-12">
                        <h2 class="text-pink-20 text-3xl font-extrabold mb-8">A Collaborative Approach</h2>
                        <p class="text-lg font-normal text-gray-70 font-lora mb-12">
                        The Ocular Genetic Registry fosters collaboration among researchers and healthcare providers. By centralizing genetic and clinical data, the platform helps improve research efficiency, enabling faster development of diagnostic tools and treatments for inheritable retinal diseases. Users can easily access shared resources, participate in ongoing studies, and contribute valuable information to advance genetic eye health.</p>

                        <h2 class="text-pink-20 text-3xl font-extrabold mb-8">Expanding Knowledge, Improving Lives</h2>
                        <p class="text-lg font-normal text-gray-70 font-lora mb-12">
                        Our mission goes beyond just collecting data. Through advanced analysis of clinical and genetic information, the Ocular Genetic Registry contributes to expanding knowledge about retinal diseases. This knowledge can directly impact diagnosis, research, and treatment strategies, providing a foundation for healthier lives for future generations.</p>
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
                        The Ocular Genetic Registry is dedicated to advancing the study of inheritable retinal diseases through the sharing of genetic and clinical data. By enabling collaboration among patients, ophthalmologists, and researchers, the platform supports early diagnosis, accelerates research, and improves patient outcomes through more effective treatments and interventions.</p>
                    </div>


                </div>
            </div>

        </section>

        
    );
}

export default LandingSection
