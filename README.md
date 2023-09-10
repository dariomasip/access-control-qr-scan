# Guest Access Control with QR Code Scanning

This project is a web application that allows controlling guest access to an event through QR code scanning. The application provides an efficient and secure solution to ensure that only authorized individuals can enter the event.

## Features

- **QR Code Scanning**: The application can scan QR codes and process them.

- **Database Validation**: It verifies if the scanned code exists in the database.

- **Previous Scan Validation**: It ensures that the code has not been scanned before.

- **Time Validation**: It checks if the code was scanned within a specified time frame.

- **Report Generation**: As codes are scanned, it generates a report of quantities by QR code type.

- **View Scan Activity**: It allows viewing the activity of scanned codes.

## Technologies Used

- **React.js**: Used to build the user interface and manage application state.

- **Node.js with Express**: Used to create the backend server that interacts with the database and serves the application.

- **MongoDB**: Used as the database to store guest information and access records.

- **HTML/CSS**: Used for layout and interface design.

## Deployment

To deploy the application, follow these steps:

1. Run the command:

```bash
npm install
```

2. Create a .env file in the project's root directory with the following environment variables:

```bash
REACT_APP_BASE_URL=[Your_API_URL]
REACT_APP_TOKEN=[Your_token]
```

Make sure to replace [Your_API_URL] and [Your_token] with your API URL and authorization token, respectively.

3. Generate an optimized production build of the application with the following command:

```bash
npm run build
```

4. Deploy the application on your preferred server or platform using the files generated in the build folder.
   \
   The application will be available for public use after these steps.

## Backend

The backend for this application can be found at https://github.com/dariomasip/elchetostaff-server.git.

## Author

[Darío Masip](https://github.com/dariomasip)

## Contact

If you have any questions or comments about the project, feel free to contact me at masipdario@gmail.com or through my [LinkedIn](https://www.linkedin.com/in/dariomasip).
