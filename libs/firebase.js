// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDwDLNqxTNcnVwYyGuOYaewJPG4MtEnNYU',
  authDomain: 'carmen-handbag.firebaseapp.com',
  projectId: 'carmen-handbag',
  storageBucket: 'carmen-handbag.appspot.com',
  messagingSenderId: '627359414583',
  appId: '1:627359414583:web:3fa7a6222d395f8aec82b2',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp
