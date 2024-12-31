import React, { useState } from 'react';
import { useRef } from 'react';
import  '../css/form.css';

// Helper function for PDF generation (example)
const generatePDF = (data) => {
  // Implement PDF generation logic here using a library like jsPDF
};

const EnergyCostForm = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    buildingImage: null,
    location: '',
    sunlightHours: '',
    windSpeed: '',
    noiseLevels: '',
    co2Levels: '',
    insulationType: '',
    energyConsumption: '',
    laborCost: '',
    materialCost: '',
    insulationCost: '',
    budgetRange: 0,
  });

  const [calculatedResults, setCalculatedResults] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      buildingImage: e.target.files[0],
    }));
  };

  // Handle budget range slider
  const handleSliderChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      budgetRange: e.target.value,
    }));
  };

  // Handle calculation
  const handleCalculate = () => {
    // Perform energy and cost calculations
    const { sunlightHours, windSpeed, noiseLevels, co2Levels, energyConsumption, laborCost, materialCost, insulationCost, budgetRange } = formData;

    const totalCost = parseFloat(laborCost) + parseFloat(materialCost) + parseFloat(insulationCost);
    const energyEfficiency = (parseFloat(energyConsumption) / 1000) * (parseFloat(sunlightHours) + parseFloat(windSpeed) + parseFloat(noiseLevels) + parseFloat(co2Levels));

    setCalculatedResults({ totalCost, energyEfficiency });
  };

  // Handle form reset
  const handleReset = () => {
    setFormData({
      buildingImage: null,
      location: '',
      sunlightHours: '',
      windSpeed: '',
      noiseLevels: '',
      co2Levels: '',
      insulationType: '',
      energyConsumption: '',
      laborCost: '',
      materialCost: '',
      insulationCost: '',
      budgetRange: 0,
    });
    setCalculatedResults(null);
  };

  // Render the form
  return (
    <div className="form-container">
      <h2>Building Energy and Cost Form</h2>
      <form onSubmit={(e) => e.preventDefault()}>

        {/* Building Image File Input */}
        <label>Building Image:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        {/* Location Dropdown */}
        <label>Project Location:</label>
        <select name="location" value={formData.location} onChange={handleChange}>
          <option value="">Select Location</option>
          <option value="Urban">Urban</option>
          <option value="Suburban">Suburban</option>
          <option value="Rural">Rural</option>
        </select>

        {/* Energy Parameters (Text Inputs) */}
        <label>Sunlight Hours per Day:</label>
        <input type="number" name="sunlightHours" value={formData.sunlightHours} onChange={handleChange} min="0" />

        <label>Wind Speed (km/h):</label>
        <input type="number" name="windSpeed" value={formData.windSpeed} onChange={handleChange} min="0" />

        <label>Noise Levels (dB):</label>
        <input type="number" name="noiseLevels" value={formData.noiseLevels} onChange={handleChange} min="0" />

        <label>Carbon Dioxide (CO₂) Levels (ppm):</label>
        <input type="number" name="co2Levels" value={formData.co2Levels} onChange={handleChange} min="0" />

        {/* Insulation Type Radio Buttons */}
        <label>Insulation Type:</label>
        <div>
          <input type="radio" name="insulationType" value="Fiberglass" checked={formData.insulationType === "Fiberglass"} onChange={handleChange} />
          <label>Fiberglass</label>
        </div>
        <div>
          <input type="radio" name="insulationType" value="Spray Foam" checked={formData.insulationType === "Spray Foam"} onChange={handleChange} />
          <label>Spray Foam</label>
        </div>
        <div>
          <input type="radio" name="insulationType" value="Cellulose" checked={formData.insulationType === "Cellulose"} onChange={handleChange} />
          <label>Cellulose</label>
        </div>
        <div>
          <input type="radio" name="insulationType" value="Other" checked={formData.insulationType === "Other"} onChange={handleChange} />
          <label>Other</label>
        </div>

        {/* Numerical Inputs for Costs */}
        <label>Energy Consumption (kWh):</label>
        <input type="number" name="energyConsumption" value={formData.energyConsumption} onChange={handleChange} min="0" />

        <label>Labor Cost (per hour):</label>
        <input type="number" name="laborCost" value={formData.laborCost} onChange={handleChange} min="0" />

        <label>Material Cost (per unit):</label>
        <input type="number" name="materialCost" value={formData.materialCost} onChange={handleChange} min="0" />

        <label>Insulation Cost (per unit):</label>
        <input type="number" name="insulationCost" value={formData.insulationCost} onChange={handleChange} min="0" />

        {/* Budget Range Slider */}
        <label>Budget Range:</label>
        <input type="range" min="0" max="1000000" value={formData.budgetRange} onChange={handleSliderChange} />
        <span>{formData.budgetRange}</span>

        {/* Action Buttons */}
        <button type="button" onClick={handleCalculate}>Calculate</button>
        <button type="button" onClick={() => generatePDF(formData)}>Generate PDF</button>
        <button type="button" onClick={handleReset}>Reset</button>

      </form>

      {/* Display Results */}
      {calculatedResults && (
        <div className="results">
          <h3>Calculated Results:</h3>
          <p>Total Cost: ${calculatedResults.totalCost}</p>
          <p>Energy Efficiency: {calculatedResults.energyEfficiency} kWh</p>
        </div>
      )}
    </div>
  );
};

export default EnergyCostForm;