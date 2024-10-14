"use client"

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const Registry = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    middleName: '',
    lastName: '',
    sex: '',
    birthdate: '',
    age: '',
    region: '',
    chiefComplaint: '',
    durationBlurring: '',
    familyMemberDisease: '',
    siblingsDiseaseCount: '',
    ergDate: '',
    ergResult: '',
    diagnosis: '',
    variants: [],
    rightEye: '',
    leftEye: '',
    corneaRight: '',
    corneaLeft: '',
    retinaRight: '',
    retinaLeft: '',
    geneticTestingDate: '',
    address: '',
    registryNumber: ''
  });


  const handleChange = (e) => {
  const { name, value, type } = e.target;

  // For variants, update the state correctly
  if (name === 'variants') {
    setFormData(prevData => ({
      ...prevData,
      variants: [value]  // For single selection
    }));
    return;
  }

  setFormData(prevData => ({
    ...prevData,
    [name]: value
  }));

  // Calculate age based on birthdate
  if (name === 'birthdate') {
    const birthDate = new Date(value);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    setFormData(prevData => ({
      ...prevData,
      birthdate: value,
      age: age
    }));
  }

  // Set variants based on the diagnosis
  if (name === 'diagnosis') {
    const selectedDiagnosis = value;
    let variants = [];
    if (selectedDiagnosis === 'Retinitis Pigmentosa') {
      variants = ['RLPB1', 'RP1', 'RHO', 'RPE65'];
    } else if (selectedDiagnosis === 'Stargardt Disease') {
      variants = ['STGD2', 'STGD3', 'STGD4'];
    } else if (selectedDiagnosis === 'Cone Rod Dystrophy') {
      variants = ['CNGA3', 'ABCA4'];
    }
    setFormData(prevData => ({
      ...prevData,
      diagnosis: value,
      variants: variants
    }));
  }
};

  // Generate a unique registry number
  useEffect(() => {
    if (formData.geneticTestingDate) {
      const year = new Date(formData.geneticTestingDate).getFullYear();
      const randomNumber = Math.floor(100000 + Math.random() * 900000); // Random 6-digit number
      const registryNumber = `${year}-${randomNumber}`;
      setFormData(prevData => ({
        ...prevData,
        registryNumber: registryNumber
      }));

      // Here, you would check the database to ensure uniqueness.
      // For simplicity, this code only generates the registry number.
    }
  }, [formData.geneticTestingDate]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    alert('Form submitted!'); // Placeholder alert
    // You can do anything with formData here, like sending it to an API
    console.log('Submitted data:', formData);
  };

  return (
    <div>
      <title>Registry</title>
      <Navbar />

      <h1>Registry</h1>

      <form onSubmit={handleSubmit}>
        {/* Registry Number */}
        <h2>Registry Number</h2>
        <label>Registry Number:</label>
        <input 
          type="text" 
          name="registryNumber" 
          value={formData.registryNumber} 
          readOnly 
        />
        <br />

        <label>Email</label>
        <input 
          type="text" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
        />
        <br />

        {/* Demographics */}
        <h2>Demographics</h2>
        <label>First Name:</label>
        <input 
          type="text" 
          name="firstName" 
          value={formData.firstName} 
          onChange={handleChange} 
        />
        <br />

        <label>Middle Name:</label>
        <input 
          type="text" 
          name="middleName" 
          value={formData.middleName} 
          onChange={handleChange} 
        />
        <br />

        <label>Last Name:</label>
        <input 
          type="text" 
          name="lastName" 
          value={formData.lastName} 
          onChange={handleChange} 
        />
        <br />

        <label>Sex:</label>
        <select 
          name="sex" 
          value={formData.sex} 
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <br />

        <label>Birthdate:</label>
        <input 
          type="date" 
          name="birthdate" 
          value={formData.birthdate} 
          onChange={handleChange} 
        />
        <br />

        <label>Age:</label>
        <input 
          type="text" 
          name="age" 
          value={formData.age} 
          readOnly 
        />
        <br />

            {/* Address */}
            <h2>Address</h2>
        <label>Address:</label>
        <textarea 
          name="address" 
          value={formData.address} 
          onChange={handleChange}
          rows="4" 
          cols="50" 
        />
        <br />

        <label>Region:</label>
        <select 
          name="region" 
          value={formData.region} 
          onChange={handleChange}
        >
          <option value="">Select</option>
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
        <br />

        {/* Clinical History */}
        <h2>Clinical History</h2>
        <label>Chief Complaint:</label>
        <select 
          name="chiefComplaint" 
          value={formData.chiefComplaint} 
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="None">None</option>
          <option value="Left">Left Eye</option>
          <option value="Right">Right Eye</option>
          <option value="Both">Both Eyes</option>
        </select>
        <br />

        <label>Duration of Blurring:</label>
        <select 
          name="durationBlurring" 
          value={formData.durationBlurring} 
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="< 6 months">Less than 6 months</option>
          <option value="> 12 months">More than 12 months</option>
          <option value="2 years">2 years</option>
          <option value="3 years">3 years</option>
          <option value="4 years">4 years</option>
          <option value="5 years">5 years</option>
          <option value="> 10 years">More than 10 years</option>
        </select>
        <br />

        {/* Family History */}
        <h2>Family History</h2>
        <label>Member of the family with the same disease or history of blindness or blurring of vision:</label>
        <select 
          name="familyMemberDisease" 
          value={formData.familyMemberDisease} 
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Grandfather">Grandfather</option>
          <option value="Grandmother">Grandmother</option>
          <option value="Father">Father</option>
          <option value="Mother">Mother</option>
          <option value="Uncle">Uncle</option>
          <option value="Aunt">Aunt</option>
          <option value="Brother">Brother</option>
          <option value="Sister">Sister</option>
          <option value="None">None</option>
        </select>
        <br />

        <label>How many siblings have the same disease or history of blindness or blurring of vision:</label>
        <select 
          name="siblingsDiseaseCount" 
          value={formData.siblingsDiseaseCount} 
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="None">None</option>
        </select>
        <br />

        {/* Diagnostics */}
        <h2>Diagnostics</h2>
        <label>ERG Date:</label>
        <input 
          type="date" 
          name="ergDate" 
          value={formData.ergDate} 
          onChange={handleChange}
        />
        <br />

        <label>ERG Result:</label>
        <input 
          type="date" 
          name="ergResult" 
          value={formData.ergResult} 
          onChange={handleChange}
        />
        <br />
        {/* Diagnosis */}
        <h2>Diagnosis</h2>
        <label>Diagnosis:</label>
        <select 
          name="diagnosis" 
          value={formData.diagnosis} 
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Retinitis Pigmentosa">Retinitis Pigmentosa</option>
          <option value="Stargardt Disease">Stargardt Disease</option>
          <option value="Cone Rod Dystrophy">Cone Rod Dystrophy</option>
        </select>
        <br />

        {Array.isArray(formData.variants) && formData.variants.length > 0 && (
  <>
    <label>Variants:</label>
    <select 
      name="variants" 
      value={formData.variants} 
      onChange={handleChange}
    >
      <option value="">Select</option>
      {formData.variants.map((variant, index) => (
        <option key={index} value={variant}>
          {variant}
        </option>
      ))}
    </select>
    <br />
  </>
)}


        {/* Best Corrected Visual Acuity */}
        <h2>Best Corrected Visual Acuity</h2>
        <label>Right Eye:</label>
        <select 
          name="rightEye" 
          value={formData.rightEye} 
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="1.0">1.0</option>
          <option value="0.9">0.9</option>
          <option value="0.8">0.8</option>
          <option value="0.7">0.7</option>
          <option value="0.6">0.6</option>
          <option value="0.5">0.5</option>
          <option value="0.4">0.4</option>
          <option value="0.3">0.3</option>
          <option value="0.2">0.2</option>
          <option value="0.1">0.1</option>
          <option value="Counting Fingers">Counting Fingers</option>
          <option value="Hand Movement">Hand Movement</option>
        </select>
        <br />

        <label>Left Eye:</label>
        <select 
          name="leftEye" 
          value={formData.leftEye} 
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="1.0">1.0</option>
          <option value="0.9">0.9</option>
          <option value="0.8">0.8</option>
          <option value="0.7">0.7</option>
          <option value="0.6">0.6</option>
          <option value="0.5">0.5</option>
          <option value="0.4">0.4</option>
          <option value="0.3">0.3</option>
          <option value="0.2">0.2</option>
          <option value="0.1">0.1</option>
          <option value="Counting Fingers">Counting Fingers</option>
          <option value="Hand Movement">Hand Movement</option>
        </select>
        <br />

        {/* Cornea */}
        <h2>Cornea</h2>
        <label>Right Eye:</label>
        <select 
          name="corneaRight" 
          value={formData.corneaRight} 
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Clear">Clear</option>
          <option value="Mild Opacity">Mild Opacity</option>
          <option value="Moderate Opacity">Moderate Opacity</option>
          <option value="Severe Opacity">Severe Opacity</option>
        </select>
        <br />

        <label>Left Eye:</label>
        <select 
          name="corneaLeft" 
          value={formData.corneaLeft} 
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Clear">Clear</option>
          <option value="Mild Opacity">Mild Opacity</option>
          <option value="Moderate Opacity">Moderate Opacity</option>
          <option value="Severe Opacity">Severe Opacity</option>
        </select>
        <br />

        {/* Retina */}
        <h2>Retina</h2>
        <label>Right Eye:</label>
        <select 
          name="retinaRight" 
          value={formData.retinaRight} 
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Normal">Normal</option>
          <option value="RPE Degeneration">RPE Degeneration</option>
          <option value="Choroidal Degeneration">Choroidal Degeneration</option>
          <option value="RPE and Choroidal Degeneration">RPE and Choroidal Degeneration</option>
        </select>
        <br />

        <label>Left Eye:</label>
        <select 
          name="retinaLeft" 
          value={formData.retinaLeft} 
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Normal">Normal</option>
          <option value="RPE Degeneration">RPE Degeneration</option>
          <option value="Choroidal Degeneration">Choroidal Degeneration</option>
          <option value="RPE and Choroidal Degeneration">RPE and Choroidal Degeneration</option>
        </select>
        <br />

        {/* Genetic Testing */}
        <h2>Genetic Testing</h2>
        <label>Date Performed:</label>
        <input 
          type="date" 
          name="geneticTestingDate" 
          value={formData.geneticTestingDate} 
          onChange={handleChange}
        />
        <br />

  

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Registry;


