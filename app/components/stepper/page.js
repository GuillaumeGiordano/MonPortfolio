// Stepper.js
import React, { useState } from "react";
import styles from "./Stepper.module.css"; // Importez le fichier CSS Module

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <h2>Étape {currentStep}</h2>
      <div className={styles.stepper}>
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className={`${styles.step} ${
              index + 1 === currentStep ? styles.active : ""
            }`}>
            {index + 1}
          </div>
        ))}
      </div>
      <button onClick={handlePrevStep} disabled={currentStep === 1}>
        Précédent
      </button>
      <button onClick={handleNextStep} disabled={currentStep === 6}>
        Suivant
      </button>
    </div>
  );
};

export default Stepper;
