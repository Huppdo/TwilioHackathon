## About

This project is all about connecting people to others during these unprecedented times. Many people have remarked that they lack the random social interaction that comes with being in an office or school setting.
Therefore, this project is all about adding friends and then allowing them to spontaneously contact you, either through the designated **call** button on your friend card or through chance with the **random** button
on the sidebar

### How it works

This application utilizes both React, Python3, Twilio, as well as Google Firebase in order to facilitate making calls, user authentication, friend statuses, and more.

## Development tools
- Google
- Firebase Console
- Webstorm
- PyCharm Professional
- Windows 10
- Nginx
- RHEL AWS server

## Features

- React Multi-Page web server using [React](https://reactjs.org/) and [Node.js](https://nodejs.org/)
- [Material-UI](https://material-ui.com/) for React
- User authentication and data storage through Google's [Firebase](https://firebase.google.com/)
- User interface to manage and call friends
- Easy to use design with quick to start design principles
- [Python3](https://www.python.org/) backend to control sensitive user data
- Backend web server and API using [Flask](https://flask.palletsprojects.com/en/1.1.x/)

## Set up

### Requirements

- [Node.js](https://nodejs.org/)
- [React](https://reactjs.org/)
- A Twilio account - [sign up](https://www.twilio.com/try-twilio)
- A Firebase account - [sign up/login](https://console.firebase.google.com/)


### Twilio Account Settings

This application should provide you a base to write your own video chat application using Twilio.
Before development can begin, please collect the following config values

| Config&nbsp;Value        | Description                                                                                                                                                  |
| :------------------------| :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Account&nbsp;Sid         | Your primary Twilio account identifier - find this [in the Console](https://www.twilio.com/console).                                                         |
| Auth&nbsp;Token          | Used to authenticate - [just like the above, you'll find this here](https://www.twilio.com/console).                                                         |
| Video&nbsp;API&nbsp;Key | Your Twilio Video API access identifier. You can create one [here](https://www.twilio.com/console/video/project/api-keys) |
| Video&nbsp;Api&nbsp;Secret | Your Twilio Video API access secret key. ***This can be only be seen when generating the Video API key!***  |

### Firebase Account Settings

Firebase is going to deal with all of our user authentication and storage through both
their auth and database platforms. Please start and new project and app within said project, then gather the following:

| Config&nbsp;Value | Description                                                                                                                                                  |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Admin&nbsp;Key  | The main server authentication for your back end (it will provide god powers, I promise). This can be found under the Service accounts section of your firebase app and downloaded as twiliohackathon.json                                                         |
| Web&nbsp;Auth&nbsp;Key   |This is provided to your web app for client side database authentication|

**Please** make sure to reinforce your Firebase Database with custom rules to ensure no data leaks.
In addition, make sure to enable email & password accounts in Firebase Authentication.

### Local development

After the above requirements have been met:

1. Clone this repository and `cd` into it

```bash
git clone git@github.com:twilio-labs/sample-template-nodejs.git
cd sample-template-nodejs/frontend
```

2. Install Node dependencies

```bash
npm install
```

3. Replace the environment variables in /src/components/base with your Firebase web key

4. Run the application

```bash
npm start
```

6. In another terminal/cmd window, `cd` into the backend
```bash
cd sample-template-nodejs/backend
```

7. Run the following command to install all Python3 dependencies
```bash
pip install Flask Flask-Cors Twilio firebase_admin 
```

8. Replace the placeholder twiliohackathon.json with the one you downloaded in [Firebase Account Settings](#firebase-account-settings)

9. Replace the values in config.py with the values from [Twilio Account Settings](#twilio-account-settings)

10. Start the Python backend API
```bash
pip install Flask Flask-Cors Twilio firebase_admin 
```

11. Navigate to [http://localhost:3000](http://localhost:3000) to view the React project

That's it!

### Important Config Files & Values

| Config&nbsp;File/Value        | Description                                                                                                                                                  |
| :------------------------| :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| backend/twiliohackathon.json        | The *god* key for your backend to surpass all Firebase rules|
| backend/config.py          | This file holds all of the data needed to interface with Twilio and the Twilio video API|
| frontend/src/components/base.js | This file holds the Web access information for firebase and client side authentication and friends |
| frontend/src/constants/apipath.js | Here is the path to the backend API to change the port or route|

## Contributing

This project is open source and welcomes contributions.

[Visit the project on GitHub](https://https://github.com/Huppdo/TwilioHackathon)

## License

[MIT](http://www.opensource.org/licenses/mit-license.html)

## Disclaimer

No warranty expressed or implied. Software is as it is.
