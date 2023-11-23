import { initializeApp, cert, ServiceAccount, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

// const config: ServiceAccount =
// Most of this information can be found in your Firebase dashboard

const app = getApps().length
  ? getApps()[0]
  : initializeApp({
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
    })
export const authAdmin = getAuth(app)
export const firestore = getFirestore(app)
