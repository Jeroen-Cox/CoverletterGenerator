import { initializeApp, cert, ServiceAccount, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'

// const config: ServiceAccount =

const app = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert({
        type: 'service_account',
        project_id: 'covergp-f0018',
        private_key_id: 'f51b2811c7937f8e781e87a6861e73b9ce297969',
        private_key:
          '-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQCpsd7VpBucJrUF\nQy9oIFvxwa4b8nJEPpM6pihmwQe3lIU5RM1WNnugEjKQFYI2HPsIormotmB9ze9P\nWvtFsCixdHASIFHmcpk6+fA02zkG/lRlLmLMxgwJB5sr6qEpXWna27Aprjm2+sDB\nY5JWCkjD2rwAYw5/GQkZviZxawJJ7KcCN0aJqMxnYo3a1T2HuGXMOAeGj2O3tK8j\nYGl2TKBt8lujx6+iVahzQe5shbK0d6OMrnS4/2CtPFhs5f06qRGKuU5aGzJzqY9b\n1Syva93XBAdWFGtE29uBcdc4VzfXArwBzEBV3XxOYWGBQzxnWgdJlSDyLUcXkhxB\n4aEnv363AgMBAAECgf8D4Av7mesu4McaHJYMQNhO1Gw5I3ef7/VFYZmx+hj38OJ8\nbFDhpyHJI42N5CrtrvbRim+fQ0/dGXRdlqKcfqRvQZvrHNHVrHmEkH9h8LNcsJmL\njpdQi/owiV5kP+O9DhZJEJPhmt3d7WXb8Qe1PhC6GX+7btZvwdPV1lps2iwfhANZ\ndTPdw8d5tI2ncgO33HK9iwz2+V8QbDruCjeKkbOl0dHD54W792T/XURmRhqj3vxT\nGD0ojzGNyIpldXmDDvwH00vEUavA3A0oMJzHl7TjpvLbmnlGZmAZS36ik56zf5K2\nYBToXKNoefBPLcvZ/B0UD8Erxqzu2LdfTEhaG2ECgYEA5Z3di6lJD6660pxeIw1C\ntPH9NLvh7O6rA/bcfPLCPqGM3Qm3jAXJSbaim1viafSw3CoVOVftWhasurb/+Xcq\nU4aabE4Cnr/hRgu5GPtixrtIzPxyF6Xws/Shon2pVWzLmWbxuKjTIMqggt2laZri\nJJI+QjP/nMdQoPjlscQq8AUCgYEAvTFp+iiKNZKY/7fI+7yJWeFYLxOy9RwokaCw\nBZcDG6t2F4R5cBE//qIhNPxQmf1/lmXRZjCkS7yfsMohjyVpANnriBz0kIhXkrFV\nVQlfljfPzHCd6cmBM2VbRUUHxWhnwcxFO0jGqPSg1y9PGDRed4c/3qpPVV5yheoL\nDDDWPIsCgYBHEUFMxKx0SiRQo00PlD8dOfigpbYbWxNbOsCre4dbUy0CDMvebrwK\nMJjLdPjyymUi/3NqOCiiRXpYn+NCFvvmtjZ9Zveworrary4u6T99OuIhb9DwOM/z\nIrgUTshmRDIP3Kjb+oS+FXjwiCF2OhXcM9dJLkbjA12VNPQCvTB88QKBgG1M7PLv\nFNnadbXWkbCNvbRFcdLQyKS+vdlUQh0Yn10O88ymZhoOfTA4roKT+mTchSd4bz9g\nfqqasI9MV5MBg+ZP/7jFMa2Gd0FyXeAg6C461DxCG5kDJzdwKQid1t1/ceIOhzi2\n1L6rhXiMBl/vcVwQsR+MuQSS6grfqb5DQKH9AoGBAMDv4QOBcuPz+56ewVhCLmWI\n1SGFaDRe2b2pWT1QO2Toe8L5djlZUJ6Z6h2CXavh9BdCBpL89S3gxhsjLLciETZP\npIeV+Q5xF4o8L18rMuc0/JDHnaOCrqUpyjRL908iCes3vNrfaSi/NjC9+qJf8d5g\n+ErEIelLFs2gmgzKCLua\n-----END PRIVATE KEY-----\n',
        client_email: 'firebase-adminsdk-sz5m1@covergp-f0018.iam.gserviceaccount.com',
        client_id: '113836612775436799102',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url:
          'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-sz5m1%40covergp-f0018.iam.gserviceaccount.com',
        universe_domain: 'googleapis.com'
      } as ServiceAccount)
    })
export const authAdmin = getAuth(app)
export const firestore = getFirestore(app)
