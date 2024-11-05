import Image from "next/image";

const BasicInfoSection = () => {
    return (
        
    <div>

{/* <div class="w-auto text-gray-900 bg-white border border-gray-200 rounded-lg mx-14">
    <button type="button" class="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
        <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
        Profile
    </button>
    
</div> */}

        <Image
            src="/wavelines2.png" 
            alt="Wave Lines" 
            height={400} 
            width={1800}
            className='opacity-20 top-0 absolute z-0'
          />

        <div class="grid md:grid-cols-1 gap-4 mx-6 justify-self-center">
            <a href="https://www.nei.nih.gov/learn-about-eye-health/eye-conditions-and-diseases" target="_blank" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-screen-lg hover:bg-gray-100 z-10 bg-blend-screen backdrop-blur-lg transition-all duration-300 cursor-pointer filter hover:grayscale">
                <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/info1.jpg" alt=""/>
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-pink-30">National Eye Institute (NEI) - Eye Conditions Related to Genetics</h5>
                    <p class="mb-3 font-normal text-gray-60 font-lora">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </a>

            <a href="https://retina-international.org/irds/" target="_blank" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-screen-lg hover:bg-gray-100 z-10 bg-blend-screen backdrop-blur-lg transition-all duration-300 cursor-pointer filter hover:grayscale">
                <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/info2.jpg" alt=""/>
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-pink-30">Retina International - Inherited Retinal Diseases</h5>
                    <p class="mb-3 font-normal text-gray-60 font-lora">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </a>

            <a href="https://oculargenomics.meei.harvard.edu/" target="_blank" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-screen-lg hover:bg-gray-100 z-10 bg-blend-screen backdrop-blur-lg transition-all duration-300 cursor-pointer filter hover:grayscale">
                <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/info3.jpg" alt=""/>
                <div class="flex flex-col justify-between p-4 leading-normal">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-pink-30">The Ocular Genomics Institute (OGI)</h5>
                    <p class="mb-3 font-normal text-gray-60 font-lora">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </a>
        </div>


        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#55A1B4" fill-opacity="1" d="M0,288L60,277.3C120,267,240,245,360,245.3C480,245,600,267,720,240C840,213,960,139,1080,122.7C1200,107,1320,149,1380,170.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
        </path></svg> */}


    </div>

    );
}

export default BasicInfoSection