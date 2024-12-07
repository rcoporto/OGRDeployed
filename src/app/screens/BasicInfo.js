import React from 'react';
import Navbar from '../components/Navbar';
import BasicInfoSection from '../components/BasicInfoSection';

function BasicInfo() {
  return (
    <div class="flex flex-col min-h-screen bg-[#F8F8FF]">
      <title>Basic Information</title>
      <Navbar />
      
      <h1 class="mt-8 mx-10 text-4xl font-extrabold leading-none tracking-tight text-bluegreen-80 md:text-3xl lg:text-4xl z-10">Basic Information</h1>
      <h3 class="mx-10 text-2xl font-medium text-gray-30 mb-10 z-10">Learn about genetics and associated diseases through these resources.</h3>

      <BasicInfoSection />

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#55A1B4" fill-opacity="1" d="M0,288L60,277.3C120,267,240,245,360,245.3C480,245,600,267,720,240C840,213,960,139,1080,122.7C1200,107,1320,149,1380,170.7L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
        </path>
      </svg>

      <footer class="bg-[#65697B] text-[#FFF] text-center p-2">
        <p className='font-lora'>© {new Date().getFullYear()} National Ocular Genetic Registry</p>
      </footer>
    </div>
  )
}

export default BasicInfo;