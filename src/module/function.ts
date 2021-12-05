// import redis from 'redis';
import mongoose from 'mongoose'

export const convertToMongoID = (id:string) => {
  return mongoose.Types.ObjectId(id)
}

// const clientRedis = redis.createClient()

// export const saveStorage = (key: string, value: any) => {
//   clientRedis.set(key, JSON.stringify(value))
// }

// export const getStorage = async (key: string) => {
//   return new Promise((resolve, reject) => {
//     clientRedis.get(key, (err, data) => {
//       if (err) {
//         resolve(null)
//       } else {
//         resolve(data ? JSON.parse(data) : null)
//       }
//     })
//   })
// }