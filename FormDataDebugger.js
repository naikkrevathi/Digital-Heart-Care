// FormDataDebugger.js
import React from 'react';

/**
 * This is a temporary debug component to help identify issues with form submission
 * Remove this after resolving the currentUsername issue
 */
const FormDataDebugger = ({ formData }) => {
  return (
    <div style={{ 
      border: '1px solid #ddd', 
      padding: '10px', 
      margin: '20px 0', 
      backgroundColor: '#f9f9f9',
      borderRadius: '4px' 
    }}>
      <h3>Debug Form Data:</h3>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
      
      <div>
        <strong>Current Username in formData:</strong> {formData.currentUsername || 'NOT SET'}
      </div>
      
      <div>
        <strong>Current Username in localStorage:</strong> {localStorage.getItem('username') || 'NOT SET'}
      </div>
    </div>
  );
};

export default FormDataDebugger;