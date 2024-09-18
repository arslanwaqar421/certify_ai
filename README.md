# Certify AI

This project consists of two main parts:
1. **Backend**: A Django-based REST API server.
2. **Frontend**: A React app bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

---

## Backend

The backend of this project is built with Django and uses Django REST Framework to provide a set of RESTful APIs for the frontend to interact with.

### Backend Features

- **Login/Signup**: Simple email password based login and Signup.
- **Profile Management**: Users can manage their profile, including personal details and certifications.
- **Career Path Suggestions**: The backend uses AI to suggest career paths, certifications, and internships based on the user's profile.
- **Certificate Generation**: Users can generate certificates upon completing quizzes and learning paths.

### Environment Setup

To ensure the proper configuration of the backend, you will need to set up environment variables. These include:

- **Database configuration**: Install postgres.
- **OpenAI API Key**: Provide the API key for AI-based functionality.
- **Secret keys and JWT settings**: Include the necessary keys for authentication.

### Additional Notes

- **Admin Panel**: You can manage the backend from the Django Admin panel for handling users, careers, and certifications.
- **Token-based Authentication**: All API calls must include the JWT token for authorization.

For more detailed documentation about the backend, refer to the [Django REST Framework documentation](https://www.django-rest-framework.org/).

## Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
