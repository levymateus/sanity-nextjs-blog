import { initializeApp } from "firebase/app";
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { doc, getDoc, getFirestore, updateDoc, increment, setDoc, serverTimestamp } from "firebase/firestore"
import * as envs from '../envs'
import pkg from '../package.json'

export const config = {
  apiKey: envs.firebaseApiKey,
  authDomain: envs.firebaseAuthDomain,
  projectId: envs.firebaseProjectId,
  storageBucket: envs.firebaseStorageBucket,
  messagingSenderId: envs.firebaseMessagingSenderId,
  appId: envs.firebaseAppId
};

const app = initializeApp(config)
const firestore = getFirestore(app)

export const user = () => {
  const coll = envs.isDev ? `${pkg.name}-users-dev` : `${pkg.name}-users`
  const getUserVisitorId = async () => {
    const fp = await FingerprintJS.load()
    const { visitorId } = await fp.get()
    return visitorId
  }
  const getVisitorId = getUserVisitorId()
  return {
    set: {
      post: (slug) => {
        return {
          like: async () => {
            return await setDoc(doc(firestore, coll, await getVisitorId), {
              [slug]: { isLiked: true, updated: serverTimestamp() }
            }, { merge: true })
          },
          dislike: async () => {
            return await setDoc(doc(firestore, coll, await getVisitorId), {
              [slug]: { isLiked: false, updated: serverTimestamp() }
            }, { merge: true })
          }
        }
      }
    },
    get: {
      post: (slug) => {
        return {
          isLiked: async () => {
            return (await getDoc(doc(firestore, coll, await getVisitorId))).get(slug)?.isLiked
          }
        }
      }
    }
  }
}

const post = (slug) => {
  const coll = envs.isDev ? `${pkg.name}-posts-dev` : `${pkg.name}-posts`
  return {
    get: {
      views: {
        increment: async () => {
          return await updateDoc(doc(firestore, coll, slug), {
            views: increment(1)
          })
          .then(() => ({
            ok: true,
            notFound: () => false
          }))
          .catch(error => ({
            ok: false,
            notFound: () => error.code === 'not-found'
          }))
        },
        data: async () => {
          const snap = await getDoc(doc(firestore, coll, slug))
          return snap.data()?.views || 1
        }
      }
    },
    add: async () => {
      await setDoc(doc(firestore, coll, slug), { views: 1 })
    }
  }
}

export const blog = { post }
