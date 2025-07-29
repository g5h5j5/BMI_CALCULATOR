# BMI Calculator - Interactive Health Tool

## Overview

This is a client-side BMI (Body Mass Index) calculator web application built with vanilla HTML, CSS, and JavaScript. The application provides an interactive interface for users to calculate their BMI with visual feedback, unit conversions, and real-time calculations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Pure Client-Side Application**: Built entirely with vanilla web technologies (HTML5, CSS3, JavaScript ES6+)
- **No Framework Dependencies**: Uses modern JavaScript classes and DOM manipulation without external libraries
- **Responsive Design**: Grid-based layout with CSS Grid and Flexbox for responsive behavior
- **Real-time Calculations**: Immediate feedback and conversions as users input data

### Component Structure
- **Single Page Application**: All functionality contained within one HTML page
- **Modular JavaScript**: Object-oriented approach with a BMICalculator class encapsulating all logic
- **CSS Grid Layout**: Two-column layout separating input controls from results display

## Key Components

### 1. Input Section
- **Weight Input**: Supports both kilograms (kg) and pounds (lb) with real-time conversion display
- **Height Input**: Dual input system supporting both metric (cm) and imperial (feet/inches) measurements
- **Unit Converters**: Radio button selectors for switching between measurement systems
- **Validation**: Input constraints and step values for proper data entry

### 2. Calculation Engine
- **BMI Formula Implementation**: Standard BMI calculation (weight in kg / height in meters²)
- **Unit Conversion Logic**: Automatic conversion between metric and imperial systems
- **Real-time Processing**: Calculations update as users modify inputs

### 3. Results Display
- **BMI Value Display**: Numerical BMI result with appropriate formatting
- **Category Classification**: BMI category determination (underweight, normal, overweight, obese)
- **Visual Indicators**: Arrow positioning and color coding for BMI ranges

### 4. User Interface
- **Modern CSS Styling**: Gradient backgrounds, shadows, and rounded corners
- **Interactive Elements**: Hover effects, active states, and visual feedback
- **Accessibility Features**: Proper labeling, semantic HTML structure

## Data Flow

1. **User Input**: User enters weight and height values, selects preferred units
2. **Real-time Conversion**: Application immediately shows equivalent values in alternative units
3. **Calculation Trigger**: User clicks calculate button or inputs trigger automatic calculation
4. **BMI Computation**: JavaScript calculates BMI using standardized formula
5. **Category Determination**: BMI value is classified into health categories
6. **Visual Update**: Results section updates with BMI value, category, and visual indicators

## External Dependencies

- **No External Libraries**: Application runs entirely on native browser APIs
- **No Backend Services**: All calculations performed client-side
- **No Database**: No data persistence required
- **Web Fonts**: Uses system fonts (Segoe UI family) for broad compatibility

## Deployment Strategy

### Static Hosting Ready
- **Files**: Three core files (index.html, style.css, script.js)
- **No Build Process**: Ready for direct deployment to any static hosting service
- **No Server Requirements**: Can be served from any web server or CDN
- **Offline Capable**: Functions without internet connection once loaded

### Recommended Deployment Options
- **GitHub Pages**: Simple static hosting for the repository
- **Netlify**: Drag-and-drop deployment with automatic HTTPS
- **Vercel**: Zero-configuration deployment
- **Traditional Web Hosting**: Upload files to any web server directory

### Performance Considerations
- **Lightweight**: Minimal file sizes with no external dependencies
- **Fast Loading**: No framework overhead or external API calls
- **Browser Compatibility**: Uses modern but well-supported JavaScript features
- **Mobile Responsive**: Grid layout adapts to different screen sizes

## Technical Implementation Notes

### JavaScript Architecture
- **Class-based Structure**: BMICalculator class encapsulates all functionality
- **Event-driven**: Uses DOM event listeners for user interactions
- **Method Organization**: Separate methods for calculations, conversions, and UI updates

### CSS Approach
- **Mobile-first Design**: Responsive grid system
- **Modern CSS Features**: CSS Grid, Flexbox, custom properties
- **Visual Hierarchy**: Clear separation between input and output sections

### HTML Structure
- **Semantic Markup**: Proper use of form elements, labels, and sections
- **Accessibility**: ARIA labels and semantic structure for screen readers
- **Progressive Enhancement**: Core functionality works without JavaScript