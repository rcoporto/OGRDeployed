"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import 'flowbite';
import { initFlowbite } from 'flowbite';



//to check for valid access
// import { useAuth } from '../context/authContext'; // Ensure this is imported correctly
// import { useRouter } from 'next/navigation'; // or 'react-router-dom' if using that

import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from '../../../firebase/firebase'; // Adjust this path to your Firebase setup

//const db = getFirestore(app);

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


  const getMostFrequentValue = (arr) => {
    const frequency = {};
    let maxFreq = 0;
    let mode = null;

    arr.forEach((value) => {
      if (value != null) {
        frequency[value] = (frequency[value] || 0) + 1;
        if (frequency[value] > maxFreq) {
          maxFreq = frequency[value];
          mode = value;
        }
      }
    });

    return mode;
  };

  const frequentBlurringDuration = getMostFrequentValue(
    filteredData.map((item) => item.durationBlurring)
  );

  // const downloadCSV = () => {
  //   if (!filteredData || filteredData.length === 0) {
  //     alert("No data to download.");
  //     return;
  //   }

  //   // Define the specific columns you want to include in the CSV
  //   const columns = [
  //     "registryNumber",
  //     "sex",
  //     "birthdate",
  //     "age",
  //     "region",
  //     "chiefComplaint",
  //     "durationBlurring",
  //     "familyMemberDisease",
  //     "siblingsDiseaseCount",
  //     "ergDate",
  //     "ergResult",
  //     "diagnosis",
  //     "variants",
  //     "rightEye",
  //     "leftEye",
  //     "corneaRight",
  //     "corneaLeft",
  //     "retinaRight",
  //     "retinaLeft",
  //     "geneticTestingDate"
  //   ];

  //   // Prepare the filters for the CSV content
  //   const filterDetails = [];
  //   if (diseaseFilter) filterDetails.push(`Disease: ${diseaseFilter}`);
  //   if (variantFilter) filterDetails.push(`Variant: ${variantFilter}`);
  //   if (regionFilter) filterDetails.push(`Region: ${regionFilter}`);
  //   if (ageRange) filterDetails.push(`Age Range: ${ageRange[0]} - ${ageRange[1]}`);

  //   const csvRows = [];

  //   // Add the filter details as the first row
  //   if (filterDetails.length > 0) {
  //     csvRows.push(`Filters applied: ${filterDetails.join(', ')}`);
  //   }

  //   // Add an empty row to separate filters from the actual data
  //   csvRows.push('');

  //   // Add headers
  //   csvRows.push(columns.join(','));

  //   // Add rows with filtered data
  //   for (const row of filteredData) {
  //     const values = columns.map(column => {
  //       return `"${String(row[column] || '').replace(/"/g, '""')}"`; // Escape double quotes
  //     });
  //     csvRows.push(values.join(','));
  //   }

  //   // Generate the CSV file
  //   const csvString = csvRows.join('\n');
  //   const blob = new Blob([csvString], { type: 'text/csv' });
  //   const url = URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.setAttribute('href', url);
  //   a.setAttribute('download', 'filtered_data.csv');
  //   a.click();
  // };

  const downloadCSV = () => {
    if (!filteredData || filteredData.length === 0) {
      alert("No data to download.");
      return;
    }
  
    // Define the specific columns you want to include in the CSV
    const columns = [
      "registryNumber",
      "sex",
      "birthdate",
      "age",
      "region",
      "chiefComplaint",
      "durationBlurring",
      "familyMemberDisease",
      "siblingsDiseaseCount",
      "ergDate",
      "ergResult",
      "diagnosis",
      "variants",
      "rightEye",
      "leftEye",
      "corneaRight",
      "corneaLeft",
      "retinaRight",
      "retinaLeft",
      "geneticTestingDate"
    ];
  
    // Prepare the filters for the CSV content
    const filterDetails = [];
    if (diseaseFilter) filterDetails.push(`Disease: ${diseaseFilter}`);
    if (variantFilter) filterDetails.push(`Variant: ${variantFilter}`);
    if (regionFilter) filterDetails.push(`Region: ${regionFilter}`);
    if (ageRange) filterDetails.push(`Age Range: ${ageRange[0]} - ${ageRange[1]}`);
  
    // Calculate statistics
    const averageAge =
      filteredData.reduce((sum, item) => sum + item.age, 0) / filteredData.length || 0;
  
    const averageVision =
      filteredData.reduce((sum, item) => sum + parseFloat(item.rightEye || 0), 0) / filteredData.length || 0;
  
    const cornealOpacityCount = filteredData.filter(
      item => (item.corneaLeft?.includes('Opacity') || item.corneaRight?.includes('Opacity'))
    ).length;
  
    const retinaChangeCount = filteredData.filter(
      item => item.retinaRight !== 'Normal' || item.retinaLeft !== 'Normal'
    ).length;
  
    const totalCount = filteredData.length;
  
    const getMostFrequentValue = (arr) => {
      const frequency = {};
      let maxFreq = 0;
      let mode = null;
  
      arr.forEach((value) => {
        if (value != null) {
          frequency[value] = (frequency[value] || 0) + 1;
          if (frequency[value] > maxFreq) {
            maxFreq = frequency[value];
            mode = value;
          }
        }
      });
  
      return mode;
    };
  
    const frequentBlurringDuration = getMostFrequentValue(
      filteredData.map((item) => item.durationBlurring)
    );
  
    const csvRows = [];
  
    // Add filter details
    if (filterDetails.length > 0) {
      csvRows.push(`Filters applied: ${filterDetails.join(', ')}`);
    }
  
    // Add statistics
    csvRows.push(`Total Records: ${totalCount}`);
    csvRows.push(`Average Age: ${averageAge.toFixed(2)}`);
    csvRows.push(`Average Right Eye Vision: ${averageVision.toFixed(2)}`);
    csvRows.push(`Corneal Opacity Count: ${cornealOpacityCount}`);
    csvRows.push(`Retina Change Count: ${retinaChangeCount}`);
    csvRows.push(`Most Frequent Duration of Blurring: ${frequentBlurringDuration || 'N/A'}`);
    
    // Add an empty row for separation
    csvRows.push('');
  
    // Add headers
    csvRows.push(columns.join(','));
  
    // Add rows with filtered data
    for (const row of filteredData) {
      const values = columns.map(column => {
        return `"${String(row[column] || '').replace(/"/g, '""')}"`; // Escape double quotes
      });
      csvRows.push(values.join(','));
    }
  
     // Generate the CSV file
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv' });

  // Create a dynamic filename with the current date and time
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const formattedTime = `${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;
  const filename = `Ocular_Genetic_Registry_${formattedDate}_${formattedTime}.csv`;

  // Download the file
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', filename);
  a.click();
  };


  return (
    <>
      {/* Container div for entire page */}
      <div class="flex flex-col min-h-0.5 bg-[#F8F8FF] bg-top bg-contain">
        <title>Research</title>
        <Navbar />

        <div class="my-12 mx-20 text-center z-10">
          <h1 class="text-center mb-6 text-3xl font-extrabold leading-none tracking-tight text-bluegreen-80 md:text-4xl lg:text-5xl">Research</h1>
        </div>

        {/* Container div for entire page content */}
        <div class="flex flex-col">

          {/* Container div for age filter, region filter, & reset filter */}
          <div class="text-justify mb-8 mx-20 grid md:grid-cols-4 gap-14">
            <div>

              <div class="flex items-center justify-self-center">
                <label class="block ml-32 mr-2 text-left text-sm text-nowrap font-medium text-bluegreen-90">Age Range</label>
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
                <label class="block ml-72 mr-2 text-left text-sm font-medium text-bluegreen-90">Region</label>
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
                <label class="block ml-48 mr-2 text-left text-sm text-nowrap font-medium text-bluegreen-90">Reset Filters</label>
                <button type="button" class="text-blue-700 bg-pink-1 hover:bg-pink-10 hover:text-white focus:ring-4 focus:outline-none focus:ring-pink-20 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center" onClick={resetFilters}>
                  <svg class="w-4 h-4 text-pink-50" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLineCap="round" strokeLineJoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4" />
                  </svg>
                  <span class="sr-only">Refresh</span>
                </button>
              </div>
            </div>

            <div>
              <div class="flex items-center justify-self-center">
                <label class="block ml-20 mr-2 text-left text-sm text-nowrap font-medium text-bluegreen-90">Download CSV</label>
                <button type="button" class="text-blue-700 bg-lightbluegreen-10 hover:bg-lightbluegreen-5 hover:text-white focus:ring-4 focus:outline-none focus:ring-bluegreen-1 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center" onClick={downloadCSV}>
                  <svg class="w-4 h-4 text-bluegreen-80" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M13 11.15V4a1 1 0 1 0-2 0v7.15L8.78 8.374a1 1 0 1 0-1.56 1.25l4 5a1 1 0 0 0 1.56 0l4-5a1 1 0 1 0-1.56-1.25L13 11.15Z" clip-rule="evenodd" />
                    <path fill-rule="evenodd" d="M9.657 15.874 7.358 13H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2.358l-2.3 2.874a3 3 0 0 1-4.685 0ZM17 16a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clip-rule="evenodd" />
                  </svg>
                  <span class="sr-only">Download CSV</span>
                </button>
              </div>
            </div>
          </div>

          {/* Container div for entire section */}
          <div class="w-full bg-white border border-gray-200 rounded-lg shadow">

            {/* Container div for button group + statistics */}
            <div class="border-t border-gray-200">

              <span class="text-bluegreen-70 ml-4">⠀Double-click to access variants: ⠀</span>

              <div class="inline-flex m-8 rounded-md shadow-sm" role="group">
                <button type="button" id="dropdownRPButton" class="px-4 py-2 text-sm font-medium text-pink-30 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-pink-50 focus:z-10 focus:ring-2 focus:ring-pink-10 focus:text-pink-20" data-dropdown-toggle="dropdownRP" onClick={() => { setDiseaseFilter('Retinitis Pigmentosa'); setVariantFilter(''); }}>
                  Retinitis Pigmentosa
                </button>
                <button type="button" id="dropdownSDButton" class="px-4 py-2 text-sm font-medium text-pink-30 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-pink-50 focus:z-10 focus:ring-2 focus:ring-pink-10 focus:text-pink-20" data-dropdown-toggle="dropdownSD" onClick={() => { setDiseaseFilter('Stargardt Disease'); setVariantFilter(''); }}>
                  Stargardt Disease
                </button>
                <button type="button" id="dropdownCRButton" class="px-4 py-2 text-sm font-medium text-pink-30 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-pink-50 focus:z-10 focus:ring-2 focus:ring-pink-10 focus:text-pink-20" data-dropdown-toggle="dropdownCR" onClick={() => { setDiseaseFilter('Cone Rod Dystrophy'); setVariantFilter(''); }}>
                  Cone Rod Dystrophy
                </button>
              </div>

              {/* Retinitis Pigmentosa Variants */}
              {diseaseFilter === 'Retinitis Pigmentosa' && (
                <div id="dropdownRP" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                  <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownRPButton">
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100" onClick={() => setVariantFilter('RLPB1')}>RLPB1</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100" onClick={() => setVariantFilter('RP1')}>RP1</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100" onClick={() => setVariantFilter('RHO')}>RHO</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100" onClick={() => setVariantFilter('RPE65')}>RPE65</a>
                    </li>
                  </ul>
                </div>
              )}

              {/* Stargardt Disease Variants */}
              {diseaseFilter === 'Stargardt Disease' && (
                <div id="dropdownSD" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                  <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownSDButton">
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100" onClick={() => setVariantFilter('STGD2')}>STGD2</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100" onClick={() => setVariantFilter('STGD3')}>STGD3</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100" onClick={() => setVariantFilter('STGD4')}>STGD4</a>
                    </li>
                  </ul>
                </div>
              )}

              {/* Cone Rod Dystrophy Variants */}
              {diseaseFilter === 'Cone Rod Dystrophy' && (
                <div id="dropdownCR" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                  <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownCRButton">
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100" onClick={() => setVariantFilter('CNGA3')}>CNGA3</a>
                    </li>
                    <li>
                      <a href="#" class="block px-4 py-2 hover:bg-gray-100" onClick={() => setVariantFilter('ABCA4')}>ABCA4</a>
                    </li>
                  </ul>
                </div>
              )}

              <div class="p-4 mx-4 mb-4 bg-gray-50 rounded-lg md:p-8" >
                <dl class="grid max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 sm:p-8">
                  <div class="flex flex-col text-center">
                    <dt class="mb-2 text-2xl text-bluegreen-70 font-extrabold">
                      {frequentBlurringDuration || 'N/A'}
                    </dt>
                    <dd class="text-gray-500 font-lora">Frequent duration of illness</dd>
                  </div>

                  <div class="flex flex-col  text-center">
                    <dt class="mb-2 text-2xl text-bluegreen-70 font-extrabold">{averageAge.toFixed(2)}</dt>
                    <dd class="text-gray-500 font-lora">Average age</dd>
                  </div>
                  <div class="flex flex-col  text-center">
                    <dt class="mb-2 text-2xl text-bluegreen-70 font-extrabold">{averageVision.toFixed(2)}</dt>
                    <dd class="text-gray-500 font-lora">Average vision</dd>
                  </div>
                  <div class="flex flex-col  text-center">
                    <dt class="mb-2 text-2xl text-bluegreen-70 font-extrabold">{cornealOpacityCount}</dt>
                    <dd class="text-gray-500 font-lora">Frequency of presence of corneal opacity</dd>
                  </div>
                  <div class="flex flex-col  text-center">
                    <dt class="mb-2 text-2xl text-bluegreen-70 font-extrabold">{retinaChangeCount}</dt>
                    <dd class="text-gray-500 font-lora">Frequency of retina changes</dd>
                  </div>
                  <div class="flex flex-col  text-center">
                    <dt class="mb-2 text-2xl text-bluegreen-70 font-extrabold">{totalCount}</dt>
                    <dd class="text-gray-500 font-lora">Total count</dd>
                  </div>
                </dl>
              </div>

              {/* End of container div for button group + statistics */}
            </div>
            {/* End of container div for entire section */}
          </div>

          {/* Container div for table */}
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-center text-blue-100">
              <thead class="text-xs text-white uppercase font-poppins bg-bluegreen-70 border-b border-bluegreen-70">
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
                  <tr key={index} class="bg-gray-10 border-b border-lightbluegreen-10 hover:bg-bluegreen-1">
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

            {/* End of container div for table */}
          </div>
          {/* End of container div for entire page content */}
        </div>
        {/* End of container div for entire page */}
      </div>
    </>
  );
}

export default Research;