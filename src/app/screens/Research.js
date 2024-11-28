"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import styles from './Research.module.css';
import 'flowbite';
import { initFlowbite } from 'flowbite';

//to check for valid access
// import { useAuth } from '../context/authContext'; // Ensure this is imported correctly
// import { useRouter } from 'next/navigation'; // or 'react-router-dom' if using that

// Sample data
const initialData = [
  {
    registryNumber: 'RN001',
    email: 'sample1@mail.com',
    sex: 'Male',
    birthdate: '1980-01-01',
    age: 44,
    region: 'Region 1',
    chiefComplaint: 'Blurring',
    durationBlurring: '> 12 months',
    familyMemberDisease: 'Father',
    siblingsDiseaseCount: 1,
    ergDate: '2020-01-15',
    ergResult: 'Normal',
    diagnosis: 'Retinitis Pigmentosa',
    variants: ['RP1'],
    rightEye: '0.9',
    leftEye: '0.8',
    corneaRight: 'Clear',
    corneaLeft: 'Mild Opacity',
    retinaRight: 'RPE Degeneration',
    retinaLeft: 'Normal',
    geneticTestingDate: '2020-05-10',
    address: '123 Street, City',
  },
  {
    registryNumber: 'RN002',
    email: 'sample2@mail.com',
    sex: 'Female',
    birthdate: '1985-05-10',
    age: 39,
    region: 'Region 2',
    chiefComplaint: 'None',
    durationBlurring: '6-12 months',
    familyMemberDisease: 'Mother',
    siblingsDiseaseCount: 2,
    ergDate: '2021-07-25',
    ergResult: 'Abnormal',
    diagnosis: 'Stargardt Disease',
    variants: ['STGD1'],
    rightEye: '0.7',
    leftEye: '0.6',
    corneaRight: 'Clear',
    corneaLeft: 'Clear',
    retinaRight: 'Atrophy',
    retinaLeft: 'Atrophy',
    geneticTestingDate: '2021-08-11',
    address: '456 Avenue, Town',
  },
  // Add more sample data here
];

// Main Research Component
function Research() {
  const [data, setData] = useState(initialData);
  const [filteredData, setFilteredData] = useState(initialData);
  const [diseaseFilter, setDiseaseFilter] = useState('');
  const [variantFilter, setVariantFilter] = useState('');
  const [ageRange, setAgeRange] = useState([0, 100]);
  const [regionFilter, setRegionFilter] = useState('');

  //for login/access checking
  // const user = useAuth(); // Destructure logout directly
  // const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state
  // const [hasResearchAccess, setHasResearchAccess] = useState(false); // Track research access
  // const router = useRouter();

  // useEffect(() => {
  //   try{
  //   if (user && user.user.research === true) {
  //     setIsAuthenticated(true);
  //     setHasResearchAccess(true);
  //   } else {
  //     setIsAuthenticated(false);
  //     setHasResearchAccess(false);
  //     //alert("You are not authorized!");
  //     // router.push('/login?message=no_access'); // Redirect to login page if unauthenticated
  //     router.push('/invalid')
  //   }
  // }
  // catch{
  //   setIsAuthenticated(false);
  //     setHasResearchAccess(false);
  //     //alert("You are not authorized!");
  //     //router.push('/login?message=no_access'); // Redirect to login page if unauthenticated
  //     router.push('/invalid')
  // }
  // }, []);

  // Filter logic
  useEffect(() => {
    let filtered = initialData;

    if (diseaseFilter) {
      filtered = filtered.filter(item => item.diagnosis === diseaseFilter);
    }
    if (variantFilter) {
      filtered = filtered.filter(item => item.variants.includes(variantFilter));
    }
    if (regionFilter) {
      filtered = filtered.filter(item => item.region === regionFilter);
    }
    if (ageRange) {
      filtered = filtered.filter(
        item => item.age >= ageRange[0] && item.age <= ageRange[1]
      );
    }

    setFilteredData(filtered);
    initFlowbite();
  }, [diseaseFilter, variantFilter, ageRange, regionFilter]);

  // Statistics calculation
  const averageAge =
    filteredData.reduce((sum, item) => sum + item.age, 0) / filteredData.length || 0;

  const averageVision =
    filteredData.reduce((sum, item) => sum + parseFloat(item.rightEye), 0) / filteredData.length || 0;

  const cornealOpacityCount = filteredData.filter(
    item => item.corneaLeft.includes('Opacity') || item.corneaRight.includes('Opacity')
  ).length;

  const retinaChangeCount = filteredData.filter(
    item => item.retinaRight !== 'Normal' || item.retinaLeft !== 'Normal'
  ).length;

  const totalCount = filteredData.length;

  const resetFilters = () => {
    setDiseaseFilter('');
    setVariantFilter('');
    setAgeRange([0, 100]);
    setRegionFilter('');
    setFilteredData(initialData); // Reset filteredData to initial data
  };

  return (
    <div>
      <div class="flex flex-col min-h-0.5 bg-[#F8F8FF] bg-top bg-contain">
        <title>Research</title>
          <Navbar />

          <div class="my-12 mx-20 text-center z-10">
            <h1 class="text-center mb-6 text-3xl font-extrabold leading-none tracking-tight text-bluegreen-80 md:text-4xl lg:text-5xl">Research</h1>
          </div>

  {/* Main Content Area */}
  <div className={styles.mainContent}>

  <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    {/* <div class="sm:hidden">
        <label for="tabs" class="sr-only">Select tab</label>
        <select id="tabs" class="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option>Retinitis Pigmentosa</option>
            <option>Stargardt Disease</option>
            <option>Cone Rod Dystrophy</option>
        </select>
    </div> */}
    <ul class=" text-sm font-medium font-poppins text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse" id="fullWidthTab" data-tabs-toggle="#fullWidthTabContent" role="tablist">
        <li class="w-full">
            <button id="retinitis-tab" data-tabs-target="#retinitis" type="button" role="tab" aria-controls="retinitis" aria-selected="true" class="inline-block w-full p-4 rounded-ss-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600">Retinitis Pigmentosa</button>
        </li>
        <li class="w-full">
            <button id="stargardt-tab" data-tabs-target="#stargardt" type="button" role="tab" aria-controls="stargardt" aria-selected="false" class="inline-block w-full p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600">Stargardt Disease</button>
        </li>
        <li class="w-full">
            <button id="conerod-tab" data-tabs-target="#conerod" type="button" role="tab" aria-controls="conerod" aria-selected="false" class="inline-block w-full p-4 rounded-se-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600">Cone Rod Dystrophy</button>
        </li>
    </ul>

    <div id="fullWidthTabContent" class="border-t border-gray-200 dark:border-gray-600">
        <div class=" p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="retinitis" role="tabpanel" aria-labelledby="retinitis-tab">

          

<div class="mb-4 border-b border-gray-200 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-styled-tab" data-tabs-toggle="#default-styled-tab-content" data-tabs-active-classes="text-pink-30 hover:text-pink-20 border-pink-50" data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-pink-10 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300" role="tablist">
        <li class="me-2" role="presentation">
            <button class="inline-block p-4 border-b-2 rounded-t-lg" id="overallRP-styled-tab" data-tabs-target="#styled-overallRP" type="button" role="tab" aria-controls="overallRP" aria-selected="false">Overall</button>
        </li>
        <li class="me-2" role="presentation">
            <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="RLPB1-styled-tab" data-tabs-target="#styled-RLPB1" type="button" role="tab" aria-controls="RLPB1" aria-selected="false">RLPB1</button>
        </li>
        <li class="me-2" role="presentation">
            <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="RP1-styled-tab" data-tabs-target="#styled-RP1" type="button" role="tab" aria-controls="RP1" aria-selected="false">RP1</button>
        </li>
        <li role="presentation">
            <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="RHO-styled-tab" data-tabs-target="#styled-RHO" type="button" role="tab" aria-controls="RHO" aria-selected="false">RHO</button>
        </li>
        <li role="presentation">
            <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="RPE65-styled-tab" data-tabs-target="#styled-RPE65" type="button" role="tab" aria-controls="RPE65" aria-selected="false">RPE65</button>
        </li>
    </ul>
</div>
<div id="default-styled-tab-content">
    <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-overallRP" role="tabpanel" aria-labelledby="overallRP-tab">
    <dl class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
                <div class="flex flex-col text-center " >
                    <dt class="mb-2 text-2xl text-bluegreen-70 font-extrabold">123</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Average duration of illness</dd>
                </div>
                <div class="flex flex-col text-center ">
                    <dt class="mb-2 text-2xl text-bluegreen-70 font-extrabold">{averageAge.toFixed(2)}</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Average age</dd>
                </div>
                <div class="flex flex-col text-center ">
                    <dt class="mb-2 text-2xl text-bluegreen-70 font-extrabold">{averageVision.toFixed(2)}</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Average vision</dd>
                </div>
                <div class="flex flex-col text-center ">
                    <dt class="mb-2 text-2xl text-bluegreen-70 font-extrabold">{cornealOpacityCount}</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Frequency of presence of corneal opacity</dd>
                </div>
                <div class="flex flex-col text-center ">
                    <dt class="mb-2 text-2xl text-bluegreen-70 font-extrabold">{retinaChangeCount}</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Frequency of retina changes</dd>
                </div>
                <div class="flex flex-col text-center">
                    <dt class="mb-2 text-2xl text-bluegreen-1 font-extrabold">{totalCount}</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Total count</dd>
                </div>
            </dl>
    </div>
    <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-RLPB1" role="tabpanel" aria-labelledby="RLPB1-tab">
    <dl class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
                <div class="flex flex-col text-center " >
                    <dt class="mb-2 text-2xl font-extrabold">456</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Average duration of illness</dd>
                </div>
                <div class="flex flex-col text-center ">
                    <dt class="mb-2 text-2xl font-extrabold">{averageAge.toFixed(2)}</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Average age</dd>
                </div>
                <div class="flex flex-col text-center ">
                    <dt class="mb-2 text-2xl font-extrabold">{averageVision.toFixed(2)}</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Average vision</dd>
                </div>
                <div class="flex flex-col text-center ">
                    <dt class="mb-2 text-2xl font-extrabold">{cornealOpacityCount}</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Frequency of presence of corneal opacity</dd>
                </div>
                <div class="flex flex-col text-center ">
                    <dt class="mb-2 text-2xl font-extrabold">{retinaChangeCount}</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Frequency of retina changes</dd>
                </div>
                <div class="flex flex-col text-center">
                    <dt class="mb-2 text-2xl font-extrabold">{totalCount}</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Total count</dd>
                </div>
            </dl> 
    </div>
    <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-RP1" role="tabpanel" aria-labelledby="RP1-tab">
    <dl class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
                <div class="flex flex-col text-center " >
                    <dt class="mb-2 text-2xl font-extrabold">999</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Average duration of illness</dd>
                </div>
                <div class="flex flex-col text-center ">
                    <dt class="mb-2 text-2xl font-extrabold">999</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Average age</dd>
                </div>
                <div class="flex flex-col text-center ">
                    <dt class="mb-2 text-2xl font-extrabold">999</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Average vision</dd>
                </div>
                <div class="flex flex-col text-center ">
                    <dt class="mb-2 text-2xl font-extrabold">999</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Frequency of presence of corneal opacity</dd>
                </div>
                <div class="flex flex-col text-center ">
                    <dt class="mb-2 text-2xl font-extrabold">999</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Frequency of retina changes</dd>
                </div>
                <div class="flex flex-col text-center">
                    <dt class="mb-2 text-2xl font-extrabold">999</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Total count</dd>
                </div>
            </dl>     
    </div>
    <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-RHO" role="tabpanel" aria-labelledby="RHO-tab">
         
    </div>
    <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-RPE65" role="tabpanel" aria-labelledby="RPE65-tab">
            
    </div>
</div>


            {/* <dl class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
                <div class="flex flex-col text-center " >
                    <dt class="mb-2 text-2xl font-extrabold">123</dt>
                    <dd class="text-gray-500 dark:text-gray-400">Average duration of illness</dd>
                </div>
                <div class="flex flex-col text-center ">
                    <dt class="mb-2 text-2xl font-extrabold">123</dt>
                    <dd class="text-gray-500 dark:text-gray-400">Average age</dd>
                </div>
                <div class="flex flex-col text-center ">
                    <dt class="mb-2 text-2xl font-extrabold">123</dt>
                    <dd class="text-gray-500 dark:text-gray-400">Average vision</dd>
                </div>
                <div class="flex flex-col text-center ">
                    <dt class="mb-2 text-2xl font-extrabold">123</dt>
                    <dd class="text-gray-500 dark:text-gray-400">Frequency of presence of corneal opacity</dd>
                </div>
                <div class="flex flex-col text-center ">
                    <dt class="mb-2 text-2xl font-extrabold">123</dt>
                    <dd class="text-gray-500 dark:text-gray-400">Frequency of retina changes</dd>
                </div>
                <div class="flex flex-col text-center">
                    <dt class="mb-2 text-2xl font-extrabold">123</dt>
                    <dd class="text-gray-500 dark:text-gray-400">Total count</dd>
                </div>
            </dl> */}
        </div>

        
        <div class="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="stargardt" role="tabpanel" aria-labelledby="stargardt-tab">

        <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-styled-tab" data-tabs-toggle="#default-styled-tab-content" data-tabs-active-classes="text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500" data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300" role="tablist">
        <li class="me-2" role="presentation">
            <button class="inline-block p-4 border-b-2 rounded-t-lg" id="overallSD-styled-tab" data-tabs-target="#styled-overallSD" type="button" role="tab" aria-controls="overallSD" aria-selected="false">Overall</button>
        </li>
        <li class="me-2" role="presentation">
            <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="STGD2-styled-tab" data-tabs-target="#styled-STGD2" type="button" role="tab" aria-controls="STGD2" aria-selected="false">STGD2</button>
        </li>
        <li class="me-2" role="presentation">
            <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="STGD3-styled-tab" data-tabs-target="#styled-STGD3" type="button" role="tab" aria-controls="STGD3" aria-selected="false">STGD3</button>
        </li>
        <li role="presentation">
            <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="STGD4-styled-tab" data-tabs-target="#styled-STGD4" type="button" role="tab" aria-controls="STGD4" aria-selected="false">STGD4</button>
        </li>
    </ul>
</div>
<div id="default-styled-tab-content">
    <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-overallSD" role="tabpanel" aria-labelledby="overallSD-tab">
    <dl class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
                <div class="flex flex-col text-center " >
                    <dt class="mb-2 text-2xl font-extrabold">789</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Average duration of illness</dd>
                </div>
                <div class="flex flex-col text-center ">
                    <dt class="mb-2 text-2xl font-extrabold">789</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Average age</dd>
                </div>
                <div class="flex flex-col text-center ">
                    <dt class="mb-2 text-2xl font-extrabold">789</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Average vision</dd>
                </div>
                <div class="flex flex-col text-center ">
                    <dt class="mb-2 text-2xl font-extrabold">789</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Frequency of presence of corneal opacity</dd>
                </div>
                <div class="flex flex-col text-center ">
                    <dt class="mb-2 text-2xl font-extrabold">789</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Frequency of retina changes</dd>
                </div>
                <div class="flex flex-col text-center">
                    <dt class="mb-2 text-2xl font-extrabold">789</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Total count</dd>
                </div>
            </dl>
    </div>
    <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-STGD2" role="tabpanel" aria-labelledby="STGD2-tab">
 
    </div>
    <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-STGD3" role="tabpanel" aria-labelledby="STGD3-tab">
          
    </div>
    <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-STGD4" role="tabpanel" aria-labelledby="STGD4-tab">
         
    </div>
</div>

        </div>

        <div class="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="conerod" role="tabpanel" aria-labelledby="conerod-tab">
        <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-styled-tab" data-tabs-toggle="#default-styled-tab-content" data-tabs-active-classes="text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500" data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300" role="tablist">
        <li class="me-2" role="presentation">
            <button class="inline-block p-4 border-b-2 rounded-t-lg" id="overallCR-styled-tab" data-tabs-target="#styled-overallCR" type="button" role="tab" aria-controls="overallCR" aria-selected="false">Overall</button>
        </li>
        <li class="me-2" role="presentation">
            <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="CNGA3-styled-tab" data-tabs-target="#styled-CNGA3" type="button" role="tab" aria-controls="CNGA3" aria-selected="false">CNGA3</button>
        </li>
        <li class="me-2" role="presentation">
            <button class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300" id="ABCA4-styled-tab" data-tabs-target="#styled-ABCA4" type="button" role="tab" aria-controls="ABCA4" aria-selected="false">ABCA4</button>
        </li>
    </ul>
</div>
<div id="default-styled-tab-content">
    <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-overallCR" role="tabpanel" aria-labelledby="overallCR-tab">
    <dl class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
                <div class="flex flex-col text-center " >
                    <dt class="mb-2 text-2xl font-extrabold">100</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Average duration of illness</dd>
                </div>
                <div class="flex flex-col text-center ">
                    <dt class="mb-2 text-2xl font-extrabold">100</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Average age</dd>
                </div>
                <div class="flex flex-col text-center ">
                    <dt class="mb-2 text-2xl font-extrabold">100</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Average vision</dd>
                </div>
                <div class="flex flex-col text-center ">
                    <dt class="mb-2 text-2xl font-extrabold">100</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Frequency of presence of corneal opacity</dd>
                </div>
                <div class="flex flex-col text-center ">
                    <dt class="mb-2 text-2xl font-extrabold">100</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Frequency of retina changes</dd>
                </div>
                <div class="flex flex-col text-center">
                    <dt class="mb-2 text-2xl font-extrabold">100</dt>
                    <dd class="text-gray-500 font-lora dark:text-gray-400">Total count</dd>
                </div>
            </dl>
    </div>
    <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-CNGA3" role="tabpanel" aria-labelledby="CNGA3-tab">
 
 </div>
 <div class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800" id="styled-ABCA4" role="tabpanel" aria-labelledby="ABCA4-tab">
       
 </div>
    </div>

        </div>

    </div>
</div>

    {/* Top Section with Filters and Statistics */}
    <div className={styles.topSection}>
      {/* Filters Section */}
      <div className={styles.filters}>
        <h2 className={styles.filterHeading}>Filters</h2>

        {/* Disease Filter Buttons */}
        <button className={styles.button} onClick={() => setDiseaseFilter('Retinitis Pigmentosa')}>Retinitis Pigmentosa</button>
        <button className={styles.button} onClick={() => setDiseaseFilter('Stargardt Disease')}>Stargardt Disease</button>
        <button className={styles.button} onClick={() => setDiseaseFilter('Cone Rod Dystrophy')}>Cone Rod Dystrophy</button>

        {/* Disease-Specific Variant Buttons */}
        {diseaseFilter === 'Retinitis Pigmentosa' && (
          <>
            <button className={styles.button} onClick={() => setVariantFilter('RLPB1')}>RLPB1</button>
            <button className={styles.button} onClick={() => setVariantFilter('RP1')}>RP1</button>
            <button className={styles.button} onClick={() => setVariantFilter('RHO')}>RHO</button>
            <button className={styles.button} onClick={() => setVariantFilter('RPE65')}>RPE65</button>
          </>
        )}
        {diseaseFilter === 'Stargardt Disease' && (
          <>
            <button className={styles.button} onClick={() => setVariantFilter('STGD2')}>STGD2</button>
            <button className={styles.button} onClick={() => setVariantFilter('STGD3')}>STGD3</button>
            <button className={styles.button} onClick={() => setVariantFilter('STGD4')}>STGD4</button>
          </>
        )}
        {diseaseFilter === 'Cone Rod Dystrophy' && (
          <>
            <button className={styles.button} onClick={() => setVariantFilter('CNGA3')}>CNGA3</button>
            <button className={styles.button} onClick={() => setVariantFilter('ABCA4')}>ABCA4</button>
          </>
        )}

        <button className={styles.resetButton} onClick={resetFilters}>Reset Filters</button>

        {/* Age Range Filter */}
        <div className={styles.ageRange}>
          <h3 className={styles.subheading}>Age Range</h3>
          <input
            type="number"
            placeholder="Min age"
            className={styles.input}
            value={ageRange[0]}
            onChange={(e) => setAgeRange([+e.target.value, ageRange[1]])}
          />
          <input
            type="number"
            placeholder="Max age"
            className={styles.input}
            value={ageRange[1]}
            onChange={(e) => setAgeRange([ageRange[0], +e.target.value])}
          />
        </div>

        {/* Region Filter */}
        <div className={styles.regionFilter}>
          <h3 className={styles.subheading}>Region</h3>
          <select
            className={styles.select}
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
          >
            <option value="">Select Region</option>
            <option value="Region 1">Region 1</option>
            <option value="Region 2">Region 2</option>
            <option value="Region 3">Region 3</option>
            <option value="Region 4">Region 4</option>
            <option value="Region 5">Region 5</option>
            <option value="Region 6">Region 6</option>
            <option value="Region 7">Region 7</option>
            <option value="Region 8">Region 8</option>
            <option value="Region 9">Region 9</option>
            <option value="Region 10">Region 10</option>
            <option value="Region 11">Region 11</option>
            <option value="Region 12">Region 12</option>
            <option value="NCR">NCR</option>
          </select>
        </div>
      </div>

      {/* Statistics Section */}
      <div className={styles.statistics}>
        <h2>Statistics</h2>
        <p>Total Count: {totalCount}</p>
        <p>Average Age: {averageAge.toFixed(2)}</p>
        <p>Average Vision (Right Eye): {averageVision.toFixed(2)}</p>
        <p>Frequency of Presence of Corneal Opacity: {cornealOpacityCount}</p>
        <p>Frequency of Retina Changes: {retinaChangeCount}</p>
      </div>
    </div>

    {/* Table Section */}
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Registry Number</th>
          <th>Sex</th>
          <th>Birthdate</th>
          <th>Age</th>
          <th>Region</th>
          <th>Chief Complaint</th>
          <th>Duration of Blurring</th>
          <th>Family Member Disease</th>
          <th>Siblings Disease Count</th>
          <th>ERG Date</th>
          <th>ERG Result</th>
          <th>Diagnosis</th>
          <th>Variants</th>
          <th>Right Eye Vision</th>
          <th>Left Eye Vision</th>
          <th>Cornea (Right)</th>
          <th>Cornea (Left)</th>
          <th>Retina (Right)</th>
          <th>Retina (Left)</th>
          <th>Genetic Testing Date</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((item, index) => (
          <tr key={index}>
            <td>{item.registryNumber}</td>
            <td>{item.sex}</td>
            <td>{item.birthdate}</td>
            <td>{item.age}</td>
            <td>{item.region}</td>
            <td>{item.chiefComplaint}</td>
            <td>{item.durationBlurring}</td>
            <td>{item.familyMemberDisease}</td>
            <td>{item.siblingsDiseaseCount}</td>
            <td>{item.ergDate}</td>
            <td>{item.ergResult}</td>
            <td>{item.diagnosis}</td>
            <td>{item.variants.join(', ')}</td>
            <td>{item.rightEye}</td>
            <td>{item.leftEye}</td>
            <td>{item.corneaRight}</td>
            <td>{item.corneaLeft}</td>
            <td>{item.retinaRight}</td>
            <td>{item.retinaLeft}</td>
            <td>{item.geneticTestingDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
}

export default Research;