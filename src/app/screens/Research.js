"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import styles from './Research.module.css';
import 'flowbite';
import { initFlowbite } from 'flowbite';


//to check for valid access
// import { useAuth } from '../context/authContext'; // Ensure this is imported correctly
// import { useRouter } from 'next/navigation'; // or 'react-router-dom' if using that


import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { app } from '../../../firebase/firebase'; // Adjust this path to your Firebase setup

const db = getFirestore(app);

// // Sample data
// const initialData = [
//   {
//     registryNumber: 'RN001',
//     email: 'sample1@mail.com',
//     sex: 'Male',
//     birthdate: '1980-01-01',
//     age: 44,
//     region: 'Region 1',
//     chiefComplaint: 'Blurring',
//     durationBlurring: '> 12 months',
//     familyMemberDisease: 'Father',
//     siblingsDiseaseCount: 1,
//     ergDate: '2020-01-15',
//     ergResult: 'Normal',
//     diagnosis: 'Retinitis Pigmentosa',
//     variants: ['RP1'],
//     rightEye: '0.9',
//     leftEye: '0.8',
//     corneaRight: 'Clear',
//     corneaLeft: 'Mild Opacity',
//     retinaRight: 'RPE Degeneration',
//     retinaLeft: 'Normal',
//     geneticTestingDate: '2020-05-10',
//     address: '123 Street, City',
//   },
//   {
//     registryNumber: 'RN002',
//     email: 'sample2@mail.com',
//     sex: 'Female',
//     birthdate: '1985-05-10',
//     age: 39,
//     region: 'Region 2',
//     chiefComplaint: 'None',
//     durationBlurring: '6-12 months',
//     familyMemberDisease: 'Mother',
//     siblingsDiseaseCount: 2,
//     ergDate: '2021-07-25',
//     ergResult: 'Abnormal',
//     diagnosis: 'Stargardt Disease',
//     variants: ['STGD1'],
//     rightEye: '0.7',
//     leftEye: '0.6',
//     corneaRight: 'Clear',
//     corneaLeft: 'Clear',
//     retinaRight: 'Atrophy',
//     retinaLeft: 'Atrophy',
//     geneticTestingDate: '2021-08-11',
//     address: '456 Avenue, Town',
//   },
//   // Add more sample data here
// ];

// Main Research Component
function Research() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [diseaseFilter, setDiseaseFilter] = useState('');
  const [variantFilter, setVariantFilter] = useState('');
  const [ageRange, setAgeRange] = useState([0, 100]);
  const [regionFilter, setRegionFilter] = useState('');

  const user = useAuth();
  const router = useRouter();
  // Check authentication and access
  useEffect(() => {
    try {
      if (user && user.user.research === true) {
        // User has access
      } else {
        router.push("/invalid");
      }
    } catch {
      router.push("/invalid");
    }
  }, [user]);
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
    // Fetch registries data from Firestore
useEffect(() => {
  
  const fetchRegistries = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "registries"));
      const fetchedData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        // Calculate age based on birthdate
        const birthdate = data.birthdate ? new Date(data.birthdate) : null;
        const today = new Date();
        const age = birthdate
          ? today.getFullYear() -
            birthdate.getFullYear() -
            (today < new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate()) ? 1 : 0)
          : null;
        
        return {
          id: doc.id,
          ...data,
          age, // Add dynamically calculated age to the object
        };
      });
      setData(fetchedData);
      setFilteredData(fetchedData);
    } catch (error) {
      console.error("Error fetching registries:", error);
    }
  };

  fetchRegistries();
}, []);

  // Filter logic
  useEffect(() => {
    let filtered = data;

    if (diseaseFilter) {
      filtered = filtered.filter(item => item.diagnosis === diseaseFilter);
    }
    if (variantFilter) {
      // filtered = filtered.filter(item => item.variants.includes(variantFilter));
      filtered = filtered.filter(item => item.variants?.includes(variantFilter));
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
    setFilteredData(data); // Reset filteredData to initial data
  };

  return (
    <div>
      <div class="flex flex-col min-h-0.5 bg-[#F8F8FF] bg-top bg-contain">
        <title>Research</title>
          <Navbar />

          <div class="my-12 mx-20 text-center z-10">
            <h1 class="text-center mb-6 text-3xl font-extrabold leading-none tracking-tight text-bluegreen-80 md:text-4xl lg:text-5xl">Research</h1>
          </div>

 
  <div class="flex flex-col">

    <div class="text-justify mb-8 grid md:grid-cols-3 gap-6">

      <div>
        <div class="flex items-center justify-self-center">
          <label class="block ml-6 mr-2 text-left text-sm text-nowrap font-medium text-bluegreen-90">Age Range</label>
            <input
              type="number"
              placeholder="Min age"
              class="block px-2.5 py-2.5 w-max text-sm font-lora text-bluegreen-90 bg-[#EEEEEE] rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70"
              value={ageRange[0]}
              onChange={(e) => setAgeRange([+e.target.value, ageRange[1]])}
            />

            <span class="mx-4 text-sm text-gray-60">to</span>

            <input
              type="number"
              placeholder="Max age"
              class="block px-2.5 py-2.5 w-max text-sm font-lora text-bluegreen-90 bg-[#EEEEEE] rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70"
              value={ageRange[1]}
              onChange={(e) => setAgeRange([ageRange[0], +e.target.value])}
            />

        </div>
      </div>

      <div>
        <div class="flex items-center justify-self-center">
          <label class="block mr-2 text-left text-sm font-medium text-bluegreen-90">Region</label>
            <select
              class="block px-2.5 py-2.5 w-max text-sm font-lora text-bluegreen-90 bg-[#EEEEEE] rounded-lg border-1 border-gray-20 appearance-none focus:outline-none focus:ring-0 focus:border-bluegreen-70 peer"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
            >
              <option value="">Select</option>
              <option value="NCR">NCR</option>
              <option value="Region I">Region I</option>
              <option value="Region II">Region II</option>
              <option value="Region III">Region III</option>
              <option value="Region IV-A">Region IV-A</option>
              <option value="MIMAROPA">MIMAROPA</option>
              <option value="Region V">Region V</option>
              <option value="Region VI">Region VI</option>
              <option value="Region VII">Region VII</option>
              <option value="Region VIII">Region VIII</option>
              <option value="Region IX">Region IX</option>
              <option value="Region X">Region X</option>
              <option value="Region XI">Region XI</option>
              <option value="Region XII">Region XII</option>
              <option value="Region XIII">Region XIII</option>
              <option value="Region CAR">CAR</option>
              <option value="BARMM">BARMM</option>
            </select>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-self-center">
          <label class="block ml-6 mr-2 text-left text-sm text-nowrap font-medium text-bluegreen-90">Reset Filters</label>
            <button type="button" class="text-blue-700 bg-pink-1 hover:bg-pink-10 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-20 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center" onClick={resetFilters}>
              <svg class="w-4 h-4 text-pink-50" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
              </svg>
              <span class="sr-only">Refresh</span>
            </button>
        </div>
      </div>

    </div>

 

    <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
   
      <div class="border-t border-gray-200">

        <div class="inline-flex m-8 rounded-md shadow-sm" role="group">

        <p style={{ color: '#3d7a89' }}>⠀Double-click to access variants: ⠀</p>


          <button type="button" id="dropdownRPButton" class="px-4 py-2 text-sm font-medium text-pink-30 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-pink-50 focus:z-10 focus:ring-2 focus:ring-pink-10 focus:text-pink-20" data-dropdown-toggle="dropdownRP" onClick={() => {setDiseaseFilter('Retinitis Pigmentosa');setVariantFilter('');}}>
            Retinitis Pigmentosa
          </button>
          <button type="button" id="dropdownSDButton" class="px-4 py-2 text-sm font-medium text-pink-30 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-pink-50 focus:z-10 focus:ring-2 focus:ring-pink-10 focus:text-pink-20" data-dropdown-toggle="dropdownSD" onClick={() => {setDiseaseFilter('Stargardt Disease');setVariantFilter('');}}>
            Stargardt Disease
          </button>
          <button type="button" id="dropdownCRButton" class="px-4 py-2 text-sm font-medium text-pink-30 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-pink-50 focus:z-10 focus:ring-2 focus:ring-pink-10 focus:text-pink-20" data-dropdown-toggle="dropdownCR" onClick={() => {setDiseaseFilter('Cone Rod Dystrophy');setVariantFilter('');}}>
            Cone Rod Dystrophy
          </button>
        </div>

        {diseaseFilter === 'Retinitis Pigmentosa' && (
        <div id="dropdownRP" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRPButton">
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setVariantFilter('RLPB1')}>RLPB1</a>
              </li>
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setVariantFilter('RP1')}>RP1</a>
              </li>
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setVariantFilter('RHO')}>RHO</a>
              </li>
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setVariantFilter('RPE65')}>RPE65</a>
              </li>
            </ul>
        </div>
        )}

        {diseaseFilter === 'Stargardt Disease' && (
        <div id="dropdownSD" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSDButton">
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setVariantFilter('STGD2')}>STGD2</a>
              </li>
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setVariantFilter('STGD3')}>STGD3</a>
              </li>
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setVariantFilter('STGD4')}>STGD4</a>
              </li>
            </ul>
        </div>
        )}

        {diseaseFilter === 'Cone Rod Dystrophy' && (
        <div id="dropdownCR" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCRButton">
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setVariantFilter('CNGA3')}>CNGA3</a>
              </li>
              <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setVariantFilter('ABCA4')}>ABCA4</a>
              </li>
            </ul>
        </div>
        )}

        <div class="p-4 mx-4 mb-4 bg-gray-50 rounded-lg md:p-8 dark:bg-gray-800" >
          <dl class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 sm:p-8">
            <div class="flex flex-col  text-center">
                <dt class="mb-2 text-2xl text-bluegreen-70 font-extrabold">???</dt>
                <dd class="text-gray-500 font-lora dark:text-gray-400">Average duration of illness</dd>
            </div>
            <div class="flex flex-col  text-center">
                <dt class="mb-2 text-2xl text-bluegreen-70 font-extrabold">{averageAge.toFixed(2)}</dt>
                <dd class="text-gray-500 font-lora dark:text-gray-400">Average age</dd>
            </div>
            <div class="flex flex-col  text-center">
                <dt class="mb-2 text-2xl text-bluegreen-70 font-extrabold">{averageVision.toFixed(2)}</dt>
                <dd class="text-gray-500 font-lora dark:text-gray-400">Average vision</dd>
            </div>
            <div class="flex flex-col  text-center">
                <dt class="mb-2 text-2xl text-bluegreen-70 font-extrabold">{cornealOpacityCount}</dt>
                <dd class="text-gray-500 font-lora dark:text-gray-400">Frequency of presence of corneal opacity</dd>
            </div>
            <div class="flex flex-col  text-center">
                <dt class="mb-2 text-2xl text-bluegreen-70 font-extrabold">{retinaChangeCount}</dt>
                <dd class="text-gray-500 font-lora dark:text-gray-400">Frequency of retina changes</dd>
            </div>
            <div class="flex flex-col  text-center">
                <dt class="mb-2 text-2xl text-bluegreen-70 font-extrabold">{totalCount}</dt>
                <dd class="text-gray-500 font-lora dark:text-gray-400">Total count</dd>
            </div>
          </dl>
        </div>

    </div>
</div>

    {/* Top Section with Filters and Statistics */}
    {/* <div className={styles.topSection}> */}
      {/* Filters Section */}
      {/* <div className={styles.filters}>
        <h2 className={styles.filterHeading}>Filters</h2> */}

        {/* Disease Filter Buttons */}
        {/* <button className={styles.button} onClick={() => setDiseaseFilter('Retinitis Pigmentosa')}>Retinitis Pigmentosa</button>
        <button className={styles.button} onClick={() => setDiseaseFilter('Stargardt Disease')}>Stargardt Disease</button>
        <button className={styles.button} onClick={() => setDiseaseFilter('Cone Rod Dystrophy')}>Cone Rod Dystrophy</button> */}

        {/* Disease-Specific Variant Buttons */}
        {/* {diseaseFilter === 'Retinitis Pigmentosa' && (
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

        <button className={styles.resetButton} onClick={resetFilters}>Reset Filters</button> */}

        {/* Age Range Filter */}
        {/* <div className={styles.ageRange}>
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
        </div> */}

        {/* Region Filter */}
        {/* <div className={styles.regionFilter}>
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
        </div> */}
      {/* </div> */}

      {/* Statistics Section */}
      {/* <div className={styles.statistics}>
        <h2>Statistics</h2>
        <p>Total Count: {totalCount}</p>
        <p>Average Age: {averageAge.toFixed(2)}</p>
        <p>Average Vision (Right Eye): {averageVision.toFixed(2)}</p>
        <p>Frequency of Presence of Corneal Opacity: {cornealOpacityCount}</p>
        <p>Frequency of Retina Changes: {retinaChangeCount}</p>
      </div>
    </div> */}

    




    {/* Table Section */}
    {/* <table className={styles.table}>
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
    </table> */}





    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-center text-blue-100 dark:text-blue-100">
        <thead class="text-xs text-white uppercase font-poppins bg-bluegreen-70 border-b border-bluegreen-70 dark:text-white">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Registry Number
                </th>
                <th scope="col" class="px-6 py-3">
                    Sex
                </th>
                <th scope="col" class="px-6 py-3">
                    Birthdate
                </th>
                <th scope="col" class="px-6 py-3">
                    Age
                </th>
                <th scope="col" class="px-6 py-3">
                    Region
                </th>
                <th scope="col" class="px-6 py-3">
                    Chief Complaint
                </th>
                <th scope="col" class="px-6 py-3">
                    Duration of Blurring
                </th>
                <th scope="col" class="px-6 py-3">
                    Family Member Disease
                </th>
                <th scope="col" class="px-6 py-3">
                    Siblings Disease Count
                </th>
                <th scope="col" class="px-6 py-3">
                    ERG Date
                </th>
                <th scope="col" class="px-6 py-3">
                    ERG Result
                </th>
                <th scope="col" class="px-6 py-3">
                    Diagnosis
                </th>
                <th scope="col" class="px-6 py-3">
                    Variants
                </th>
                <th scope="col" class="px-6 py-3">
                    Right Eye Vision
                </th>
                <th scope="col" class="px-6 py-3">
                    Left Eye Vision
                </th>
                <th scope="col" class="px-6 py-3">
                    Cornea (Right)
                </th>
                <th scope="col" class="px-6 py-3">
                    Cornea (Left)
                </th>
                <th scope="col" class="px-6 py-3">
                    Retina (Right)
                </th>
                <th scope="col" class="px-6 py-3">
                    Retina (Left)
                </th>
                <th scope="col" class="px-6 py-3">
                    Genetic Testing Date
                </th>
            </tr>
        </thead>
        <tbody>
        {filteredData.map((item, index) => (
          <tr key={index} class="bg-gray-10 border-b border-blue-400 hover:bg-bluegreen-1">
            <td class="px-6 py-4 font-medium font-lora text-bluegreen-90 whitespace-nowrap">{item.registryNumber}</td>
            <td class="px-6 py-4 font-lora text-bluegreen-90 text-nowrap">{item.sex}</td>
            <td class="px-6 py-4 font-lora text-bluegreen-90 text-nowrap">{item.birthdate}</td>
            <td class="px-6 py-4 font-lora text-bluegreen-90 text-nowrap text-center">{item.age}</td>
            <td class="px-6 py-4 font-lora text-bluegreen-90 text-nowrap text-center">{item.region}</td>
            <td class="px-6 py-4 font-lora text-bluegreen-90 text-nowrap text-center">{item.chiefComplaint}</td>
            <td class="px-6 py-4 font-lora text-bluegreen-90 text-nowrap text-center">{item.durationBlurring}</td>
            <td class="px-6 py-4 font-lora text-bluegreen-90 text-nowrap text-center">{item.familyMemberDisease}</td>
            <td class="px-6 py-4 font-lora text-bluegreen-90 text-nowrap text-center">{item.siblingsDiseaseCount}</td>
            <td class="px-6 py-4 font-lora text-bluegreen-90 text-nowrap text-center">{item.ergDate}</td>
            <td class="px-6 py-4 font-lora text-bluegreen-90 text-nowrap text-center">{item.ergResult}</td>
            <td class="px-6 py-4 font-lora text-bluegreen-90 text-nowrap text-center">{item.diagnosis}</td>
            <td class="px-6 py-4 font-lora text-bluegreen-90 text-nowrap text-center">{item.variants.join(', ')}</td>
            <td class="px-6 py-4 font-lora text-bluegreen-90 text-nowrap text-center">{item.rightEye}</td>
            <td class="px-6 py-4 font-lora text-bluegreen-90 text-nowrap text-center">{item.leftEye}</td>
            <td class="px-6 py-4 font-lora text-bluegreen-90 text-nowrap text-center">{item.corneaRight}</td>
            <td class="px-6 py-4 font-lora text-bluegreen-90 text-nowrap text-center">{item.corneaLeft}</td>
            <td class="px-6 py-4 font-lora text-bluegreen-90 text-nowrap text-center">{item.retinaRight}</td>
            <td class="px-6 py-4 font-lora text-bluegreen-90 text-nowrap text-center">{item.retinaLeft}</td>
            <td class="px-6 py-4 font-lora text-bluegreen-90 text-nowrap text-center">{item.geneticTestingDate}</td>
          </tr>
        ))}
        </tbody>
    </table>
</div>




  </div>
</div>

    </div>
  );
}

export default Research;