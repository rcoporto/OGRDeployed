"use client"
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import styles from './Research.module.css'

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
<>
<div className={styles.container}>
  <title>Research</title>
  <Navbar />
  <h1 className={styles.title}>Ocular Genetic Registry</h1>

  {/* Main Content Area */}
  <div className={styles.mainContent}>

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

    </>
  );
}

export default Research;