# Coverletter Generator

A Vue 3, Nuxt 3, Typescript, Pinia, Firebase project to explore Server Side Rendering and using Nuxt's server to securely tap into external API's.

## Features
- Server Side Authentication using Nuxt 3 and Firebase
- Global State using Pinia
- Persisted Authentication state using Pinia-plugin-persistedstate
- Securely tap into OpenAI API on the Server Side


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
