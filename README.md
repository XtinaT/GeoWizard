# Project geo_wizard

This is a React application for creating "Projects" with geographic areas of interest. The application includes an intuitive step-by-step wizard, file upload capabilities, and integration with mocked APIs.

## Features

- Step-by-Step Wizard: Simplifies project creation through an interactive interface.
- GeoJSON File Upload: Easily upload and process geographic data files.
- OpenLayers Integration: Visualize your uploaded Area of Interest using OpenLayers, with the ability to view area descriptions by clicking on the selected regions.
- Mocked API Integration: Includes a 50/50 success or failure rate, helping to test both success and error scenarios. Error messages are displayed to guide users in case of failure.
- Form Validation: Ensures accurate data entry with real-time validation.
- Error Handling: User-friendly error messages powered by a mocked API.

## Tech Stack

- Frontend: React, TypeScript
- Mapping Library: OpenLayers
- Validation: Formik, Yup
- Additional Tools:
- Axios for HTTP requests
- Tailwind CSS for styling
- Swiper for carousel functionality
- Day.js for date manipulation

## How to Run

1. Clone this repository:
   git clone https://github.com/XtinaT/geo_wizard.git
2. cd geo_wizard
3. npm install
4. npm start
5. open http://localhost:3000 in your browser to view the app
