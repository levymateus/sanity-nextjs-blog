import { initializeApp } from "firebase/app";
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { doc, getDoc, getFirestore, updateDoc, increment, setDoc, serverTimestamp } from "firebase/firestore"
import { getDatabase, ref, set, onValue } from "firebase/database"
import * as envs from '../envs'

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
const db = getDatabase(app)

export const database = () => {
  return {
    getPosts: async function() {
      return new Promise((resolve, reject) => {
        const path = envs.isDev ? 'blog-dev/posts/' : 'blog/posts/'
        const blogRef = ref(db,  path);
        onValue(blogRef, (snapshot) => {
          let data = snapshot.val()
          if (data) {
            data = Object.entries(data).map(([key, props]) => {
              return {
                slug: key,
                ...props
              }
            })
            resolve(data)
          }
          reject()
        });
      })
    },
    addPost: async function(slug, data) {
      const path  = isDev ? 'blog-dev/posts/' : 'blog/posts/'
      return await set(ref(db, path + slug), data);
    },
  }
}

export const user = () => {
  const coll = envs.isDev ? 'users-dev' : 'users'
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
  const coll = envs.isDev ? 'posts-dev' : 'posts'
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
