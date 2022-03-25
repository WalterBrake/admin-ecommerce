

import axios from 'axios'
import Cookies from 'js-cookie'



console.log('process.env.API_URL',process.env.API_URL)
/** Default config for axios instance */
const config = {
    baseURL: `${process.env.API_URL}`
}




export default function ({ $axios,redirect,store }, inject) {
    /** Creating the instance for axios */
    const httpClient = axios.create(config)

    /** Auth token interceptors */
    const authInterceptor = config => {
        /** TODO: Add auth token */
        try {
            const token = Cookies.get('tokenSession')

            console.log(token)
            if (token && token.tokenSession) {
                config.headers.common.Authorization = `Bearer ${token.tokenSession}`
            }
        } catch (e) {
            console.log(e)
        }
        console.log(config)

        return config
    }


    /** Adding the request interceptors */
    httpClient.interceptors.request.use(authInterceptor)

    /** Adding the response interceptors */
    httpClient.interceptors.response.use(
        response => {
            /** TODO: Add any response interceptors */
            console.log(response.data)
            // if (response.data.code === 1000) { return response } else { return Promise.reject(new Error(response.data.message)) }
            return response.data
        },
        error => {
            console.log(error)
            if (error.response.status === 401 && error.response.config && !error.response.config.__isRetryRequest) {
                // if you ever get an unauthorized, logout the user
                // this.$store.dispatch(AUTH_LOGOUT)
                console.log('error voy a direccionar')
                // you can also redirect to /login if needed !
                // router.push({ name: 'login' })

                store.dispatch(`auth/LOGOUT`)
                    .then((response) => {
                        console.log('se perdió la sessión')
                        redirect('/login')
                    })
                    .catch((reason) => {
                        console.log('error')
                    })
            }

            return Promise.reject(error)
        }
    )
    // Inject to context as $api
    inject('httpClient', httpClient)
}
