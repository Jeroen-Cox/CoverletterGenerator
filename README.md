# Coverletter Generator

A Vue 3, Nuxt 3, Typescript, Pinia, Firebase project to explore Server Side Rendering and using Nuxt's server to securely tap into external API's.

## User Story
The Coverletter generator aka CoverGP can be used by people applying to jobs to quickly generate coverletters. The user can register for, and login to a dashboard where the user can manage job applications. All a user has to do is provide a job title, the name of the company, a link to the vacancy, a link to the user's Linkedin profile, and three achievements relevant for the position. With the click of a button a coverletter is then generated. The user can change data and improve coverletters without losing previous results. 

## Features
- Server Side Authentication using Nuxt 3 and Firebase
- Global State using Pinia
- Persisted Authentication state using Pinia-plugin-persistedstate
- Securely tap into OpenAI API on the Server Side
- Web scraping using Cheerio

## Example screenshot
Disclaimer: No real form submission visible in this screenshot.

![covergp demo](https://github.com/Jeroen-Cox/CoverletterGenerator/assets/92381509/71e9604a-625d-442b-89a1-d508e875715f)

## Limitations
Web scraping will not always work as job platforms will try to hide relevant data behind authentication walls, or will simply make sure that webscrapers are recognized and stopped from fetching data. This project is meant as a exploration of methods, techniques and technologies, not as a final product. 
# How to get ready for usage:

## 1: First install packages:

```
yarn install
```

## 2: Install the Firebase CLI tools 
Follow the instructions from [Firebase](https://firebaseopensource.com/projects/firebase/firebase-tools/)

## 3: Setup your .env file with your Firebase and OpenAI details
Open the .env.example file, change the "XXXX.." for your keys, then rename and save the file as .env
```
NUXT_PUBLIC_FIREBASE_API_KEY=XXXXXXXXXXXX
NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN=XXXXXXXXXXXX
NUXT_PUBLIC_FIREBASE_PROJECT_ID=XXXXXXXXXXXX
NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET=XXXXXXXXXXXX
NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=XXXXXXXXXXXX
NUXT_PUBLIC_FIREBASE_APP_ID=XXXXXXXXXXXX
NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID=XXXXXXXXXXXX
NUXT_OPEN_AI_API_KEY=XXXXXXXXXXXX
```

## 4: Setup the Firebase credentials on the server side
Open server/utils/firebase-example.ts, add your credential information, rename and save file as firebase.ts
```
credential: cert({
        type: 'service_account',
        project_id: 'Name of your project',
        private_key_id: 'Your private key id',
        private_key: 'Your private key',
        client_id: 'Your client ID',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: 'Your cert url',
        universe_domain: 'googleapis.com'
      } as ServiceAccount)
```

# Running the project
## Local development:

```
yarn dev
```

## Problems with types not recognized in for example nuxt.config.ts?

```
yarn nuxi generate
```

## Deploy to your Firebase hosting

```
yarn deploy
```
In order for a Nuxt SSR project to work with Firebase Hosting you have to enable [Firebase Cloud Functions](https://firebase.google.com/docs/functions) and be on a billing plan.
