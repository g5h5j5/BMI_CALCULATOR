/**
 * BMI Calculator JavaScript
 * Handles calculations, unit conversions, and UI updates
 */

class BMICalculator {
    constructor() {
        this.weightInput = document.getElementById('weight');
        this.heightCmInput = document.getElementById('height-cm');
        this.heightFtInput = document.getElementById('height-ft');
        this.heightInInput = document.getElementById('height-in');
        this.calculateBtn = document.getElementById('calculate-btn');
        this.downloadBtn = document.getElementById('download-btn');
        this.bmiValue = document.getElementById('bmi-value');
        this.bmiCategory = document.getElementById('bmi-category');
        this.bmiIndicator = document.getElementById('bmi-indicator');
        this.thermometerFill = document.getElementById('thermometer-fill');
        this.weightConversion = document.getElementById('weight-conversion');
        this.heightConversion = document.getElementById('height-conversion');
        
        this.weightUnit = 'kg';
        this.heightUnit = 'cm';
        this.lastCalculation = null;
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Weight unit change
        document.querySelectorAll('input[name="weight-unit"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.weightUnit = e.target.value;
                this.updateWeightConversion();
            });
        });

        // Height unit change
        document.querySelectorAll('input[name="height-unit"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.heightUnit = e.target.value;
                this.toggleHeightInputs();
                this.updateHeightConversion();
            });
        });

        // Input changes for real-time conversion
        this.weightInput.addEventListener('input', () => this.updateWeightConversion());
        this.heightCmInput.addEventListener('input', () => this.updateHeightConversion());
        this.heightFtInput.addEventListener('input', () => this.updateHeightConversion());
        this.heightInInput.addEventListener('input', () => this.updateHeightConversion());

        // Calculate button
        this.calculateBtn.addEventListener('click', () => this.calculateBMI());

        // Download button
        this.downloadBtn.addEventListener('click', () => this.downloadResults());

        // Enter key support
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.calculateBMI();
            }
        });

        // Real-time calculation as user types
        [this.weightInput, this.heightCmInput, this.heightFtInput, this.heightInInput].forEach(input => {
            input.addEventListener('input', () => {
                if (this.hasValidInputs()) {
                    this.calculateBMI();
                }
            });
        });
    }

    toggleHeightInputs() {
        const cmInput = this.heightCmInput;
        const feetInchesInputs = document.querySelector('.feet-inches-inputs');
        
        if (this.heightUnit === 'cm') {
            cmInput.style.display = 'block';
            cmInput.classList.add('active');
            feetInchesInputs.style.display = 'none';
        } else {
            cmInput.style.display = 'none';
            cmInput.classList.remove('active');
            feetInchesInputs.style.display = 'flex';
        }
    }

    updateWeightConversion() {
        const weight = parseFloat(this.weightInput.value);
        if (isNaN(weight) || weight <= 0) {
            this.weightConversion.textContent = '';
            return;
        }

        let convertedValue, convertedUnit;
        if (this.weightUnit === 'kg') {
            convertedValue = this.kgToLb(weight);
            convertedUnit = 'lb';
        } else {
            convertedValue = this.lbToKg(weight);
            convertedUnit = 'kg';
        }

        this.weightConversion.textContent = `≈ ${convertedValue.toFixed(1)} ${convertedUnit}`;
    }

    updateHeightConversion() {
        if (this.heightUnit === 'cm') {
            const height = parseFloat(this.heightCmInput.value);
            if (isNaN(height) || height <= 0) {
                this.heightConversion.textContent = '';
                return;
            }

            const { feet, inches } = this.cmToFeetInches(height);
            this.heightConversion.textContent = `≈ ${feet}' ${inches}"`;
        } else {
            const feet = parseFloat(this.heightFtInput.value) || 0;
            const inches = parseFloat(this.heightInInput.value) || 0;
            
            if (feet === 0 && inches === 0) {
                this.heightConversion.textContent = '';
                return;
            }

            const cm = this.feetInchesToCm(feet, inches);
            this.heightConversion.textContent = `≈ ${cm.toFixed(1)} cm`;
        }
    }

    // Unit conversion functions
    lbToKg(lb) {
        return lb / 2.20462;
    }

    kgToLb(kg) {
        return kg * 2.20462;
    }

    feetInchesToCm(feet, inches) {
        return (feet * 30.48) + (inches * 2.54);
    }

    cmToFeetInches(cm) {
        const totalInches = cm / 2.54;
        const feet = Math.floor(totalInches / 12);
        const inches = Math.round((totalInches % 12) * 10) / 10;
        return { feet, inches };
    }

    cmToMeters(cm) {
        return cm / 100;
    }

    hasValidInputs() {
        const weight = parseFloat(this.weightInput.value);
        let height;

        if (this.heightUnit === 'cm') {
            height = parseFloat(this.heightCmInput.value);
        } else {
            const feet = parseFloat(this.heightFtInput.value) || 0;
            const inches = parseFloat(this.heightInInput.value) || 0;
            height = feet > 0 || inches > 0;
        }

        return !isNaN(weight) && weight > 0 && height && height > 0;
    }

    getWeightInKg() {
        const weight = parseFloat(this.weightInput.value);
        return this.weightUnit === 'kg' ? weight : this.lbToKg(weight);
    }

    getHeightInMeters() {
        if (this.heightUnit === 'cm') {
            const heightCm = parseFloat(this.heightCmInput.value);
            return this.cmToMeters(heightCm);
        } else {
            const feet = parseFloat(this.heightFtInput.value) || 0;
            const inches = parseFloat(this.heightInInput.value) || 0;
            const heightCm = this.feetInchesToCm(feet, inches);
            return this.cmToMeters(heightCm);
        }
    }

    calculateBMI() {
        // Validate inputs
        if (!this.hasValidInputs()) {
            this.showError('Please enter valid weight and height values.');
            return;
        }

        // Clear any previous errors
        this.clearErrors();

        // Get values in standard units
        const weightKg = this.getWeightInKg();
        const heightM = this.getHeightInMeters();

        // Validate ranges
        if (weightKg < 10 || weightKg > 1000) {
            this.showError('Weight must be between 10 and 1000 kg.');
            return;
        }

        if (heightM < 0.5 || heightM > 3.0) {
            this.showError('Height must be between 50 cm and 300 cm.');
            return;
        }

        // Calculate BMI
        const bmi = weightKg / (heightM * heightM);

        // Store calculation data for download
        this.lastCalculation = {
            bmi: bmi,
            weight: {
                value: parseFloat(this.weightInput.value),
                unit: this.weightUnit,
                kg: weightKg
            },
            height: {
                unit: this.heightUnit,
                meters: heightM,
                cm: heightM * 100,
                original: this.heightUnit === 'cm' ? 
                    parseFloat(this.heightCmInput.value) : 
                    `${parseFloat(this.heightFtInput.value) || 0}' ${parseFloat(this.heightInInput.value) || 0}"`
            },
            category: this.getBMICategory(bmi),
            date: new Date().toLocaleString()
        };

        // Display results
        this.displayBMI(bmi);
        this.updateThermometer(bmi);
        this.animateResults();
        
        // Show download button
        this.downloadBtn.style.display = 'block';
    }

    displayBMI(bmi) {
        // Update BMI value
        this.bmiValue.textContent = bmi.toFixed(1);

        // Determine category and update styling
        const category = this.getBMICategory(bmi);
        this.bmiCategory.textContent = category.name;
        this.bmiCategory.className = `bmi-category ${category.class}`;
    }

    getBMICategory(bmi) {
        if (bmi < 18.5) {
            return { name: 'Underweight', class: 'underweight' };
        } else if (bmi < 25) {
            return { name: 'Normal Weight', class: 'normal' };
        } else if (bmi < 30) {
            return { name: 'Overweight', class: 'overweight' };
        } else {
            return { name: 'Obese', class: 'obese' };
        }
    }

    updateThermometer(bmi) {
        // Calculate fill percentage based on BMI scale
        // BMI ranges: 15 (bottom) to 40 (top) mapped to 0% to 100% fill
        const minBMI = 15;
        const maxBMI = 40;
        const clampedBMI = Math.max(minBMI, Math.min(maxBMI, bmi));
        
        // Calculate fill percentage (inverted because thermometer fills from bottom)
        const fillPercentage = ((clampedBMI - minBMI) / (maxBMI - minBMI)) * 100;
        
        // Update thermometer fill
        this.thermometerFill.style.height = `${fillPercentage}%`;
        this.thermometerFill.classList.add('active');
        
        // Calculate indicator position (from top, so we need to invert)
        const indicatorPosition = 100 - fillPercentage;
        this.bmiIndicator.style.top = `${indicatorPosition}%`;
        this.bmiIndicator.classList.add('active');
        
        // Update bulb intensity based on BMI level (keep color constant)
        const bulb = document.querySelector('.thermometer-bulb');
        const intensity = Math.min(1, fillPercentage / 100);
        bulb.style.opacity = 0.7 + (intensity * 0.3); // Opacity varies from 0.7 to 1.0
    }

    animateResults() {
        const bmiDisplay = document.querySelector('.bmi-display');
        bmiDisplay.classList.add('updated');
        
        setTimeout(() => {
            bmiDisplay.classList.remove('updated');
        }, 600);
    }

    showError(message) {
        // Remove existing error messages
        this.clearErrors();

        // Create and show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;

        // Add error after the calculate button
        this.calculateBtn.parentNode.insertBefore(errorDiv, this.calculateBtn.nextSibling);

        // Auto-remove error after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    clearErrors() {
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(error => error.remove());
    }

    downloadResults() {
        if (!this.lastCalculation) {
            this.showError('No BMI calculation available to download.');
            return;
        }

        const data = this.lastCalculation;
        
        // Create detailed BMI report
        const report = `BMI CALCULATOR RESULTS
========================

Calculation Date: ${data.date}

PERSONAL MEASUREMENTS:
• Weight: ${data.weight.value} ${data.weight.unit} (${data.weight.kg.toFixed(1)} kg)
• Height: ${data.height.original} (${data.height.cm.toFixed(1)} cm)

BMI RESULT:
• BMI Value: ${data.bmi.toFixed(1)}
• Category: ${data.category.name}

BMI CATEGORIES REFERENCE:
• Underweight: Less than 18.5
• Normal weight: 18.5 - 24.9
• Overweight: 25 - 29.9
• Obese: 30 or greater

HEALTH RECOMMENDATIONS:
${this.getHealthRecommendations(data.bmi)}

IMPORTANT NOTE:
BMI is a screening tool and not a diagnostic tool. 
Consult with a healthcare professional for personalized health advice.

Generated by BMI Calculator - Interactive Health Tool`;

        // Create and download file
        const blob = new Blob([report], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `BMI_Report_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    getHealthRecommendations(bmi) {
        if (bmi < 18.5) {
            return `Your BMI indicates you may be underweight. Consider:
• Consulting with a healthcare provider about healthy weight gain
• Focusing on nutrient-dense foods
• Regular exercise to build muscle mass
• Monitoring your health with regular check-ups`;
        } else if (bmi < 25) {
            return `Your BMI is in the normal weight range. To maintain your health:
• Continue with a balanced diet
• Stay physically active (150+ minutes moderate exercise per week)
• Maintain current healthy lifestyle habits
• Regular health screenings as recommended by your doctor`;
        } else if (bmi < 30) {
            return `Your BMI indicates you may be overweight. Consider:
• Consulting with a healthcare provider about weight management
• Adopting a balanced, calorie-controlled diet
• Increasing physical activity gradually
• Setting realistic weight loss goals (1-2 lbs per week)
• Focus on sustainable lifestyle changes`;
        } else {
            return `Your BMI indicates obesity. Important steps to consider:
• Consult with a healthcare provider for a comprehensive health assessment
• Work with professionals to develop a safe weight loss plan
• Focus on gradual lifestyle changes rather than quick fixes
• Consider joining support groups or programs
• Regular monitoring of related health conditions (diabetes, heart disease)`;
        }
    }
}

// Initialize the calculator when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BMICalculator();
});

// Additional utility functions for enhanced UX
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add smooth scrolling for mobile devices
if (window.innerWidth <= 768) {
    document.addEventListener('DOMContentLoaded', () => {
        const inputs = document.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                setTimeout(() => {
                    input.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 300);
            });
        });
    });
}

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Note: Service worker file would need to be created separately
        // This is just the registration code
        console.log('BMI Calculator ready for offline use');
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Alt + C to calculate
    if (e.altKey && e.key === 'c') {
        e.preventDefault();
        document.getElementById('calculate-btn').click();
    }
    
    // Alt + R to reset (clear inputs)
    if (e.altKey && e.key === 'r') {
        e.preventDefault();
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.value = '';
        });
        document.getElementById('bmi-value').textContent = '--';
        document.getElementById('bmi-category').textContent = 'Enter your details to calculate';
        document.getElementById('bmi-category').className = 'bmi-category';
        document.getElementById('bmi-indicator').classList.remove('active');
        document.getElementById('thermometer-fill').style.height = '0%';
        document.getElementById('thermometer-fill').classList.remove('active');
        document.querySelector('.thermometer-bulb').style.opacity = '0.7';
    }
});

// Export for testing purposes (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BMICalculator;
}
