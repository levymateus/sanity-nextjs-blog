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
  async function getUserVisitorId() {
    const fp = await FingerprintJS.load()
    const { visitorId } = await fp.get()
    return visitorId
  }
  const getVisitorId = getUserVisitorId()
  return {
    set: {
      post: function(slug) {
        return {
          like: async function() {
            return await setDoc(doc(firestore, coll, await getVisitorId), {
              [slug]: { isLiked: true, updated: serverTimestamp() }
            }, { merge: true })
          },
          dislike: async function() {
            return await setDoc(doc(firestore, coll, await getVisitorId), {
              [slug]: { isLiked: false, updated: serverTimestamp() }
            }, { merge: true })
          }
        }
      }
    },
    get: {
      post: function(slug) {
        return {
          isLiked: async function() {
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
        increment: async function() {
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
        data: async function() {
          const snap = await getDoc(doc(firestore, coll, slug))
          return snap.data()?.views || 1
        }
      }
    },
    add: async function() {
      await setDoc(doc(firestore, coll, slug), { views: 1 })
    }
  }
}

export const blog = { post }
