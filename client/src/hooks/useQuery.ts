// import { useEffect, useState } from 'react'
// import { useSession } from '@pages/_app'

// const { NEXT_PUBLIC_API_URL } = process.env

// export const useQuery = <T>(fetchFn: () => Promise<any>) => {
//   const { user } = useSession()

//   const [data, setData] = useState<T | null>(null)
//   const [error, setError] = useState(null)
//   const [isLoading, setIsLoading] = useState(false)

//   useEffect(() => {
//     const queryData = async () => {
//       setIsLoading(true)
//       try {
//         const response = await fetchFn()
//         setData(response?.data)
//         setIsLoading(false)
//       } catch (error) {
//         setError(error)
//       }
//     }

//     queryData()
//   }, [])

//   return { data, isLoading, error }
// }
// // export const useQuery = (url: RequestInfo, config?: RequestInit) => {
// //   const { user } = useSession()

// //   const [data, setData] = useState(null)
// //   const [error, setError] = useState(null)
// //   const [isLoading, setIsLoading] = useState(false)

// //   useEffect(() => {
// //     const queryData = async () => {
// //       setIsLoading(true)

// //       // This will make sure that we always have an updated token before
// //       // sending the request. If the token is not outdated, this will not hurt performance
// //       const token = user ? await user.getIdToken() : null

// //       try {
// //         const response = await fetch(`${NEXT_PUBLIC_API_URL}${url}`, {
// //           headers: {
// //             'Content-Type': 'application/json',
// //             Authorization: `Bearer ${token}`,
// //           },
// //           ...config,
// //         })
// //         setData(await response.json())
// //         setIsLoading(false)
// //       } catch (error) {
// //         setError(error)
// //       }
// //     }

// //     queryData()
// //   }, [])

// //   return { data, isLoading, error }
// // }
