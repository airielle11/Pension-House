import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../api/api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"   
import { useState, useEffect } from "react"

// A functional component that accepts children (the protected content)
// isAuthorized is a state variable indicating whether the user is authorized or not
// null: Authorization is being checked
function ProtectedRoute({children}){
    const [isAuthorized, setIsAuthorized] = useState(null);

    // Runs auth() (a function to check the user's authentication status) after the component mounts
    // If auth() fails (e.g., token is invalid), setIsAuthorized(false) sets the user as unauthorized
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    // Refresh the access token automatically
    const refreshToken = async () => {
        // Fetches the refresh token from localStorage
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)

        // Sends a POST request to the backend to exchange the refresh token for a new access token
        // Otherwise, handles errors during the token refresh process (e.g., invalid refresh token) and sets isAuthorized to false
        try {
            // Send a request to the backend with the refresh token to get a new access token
            const response = await api.post("api/token/refresh", {
                refresh: refreshToken,
            });

            // If the request is successful (200), stores the new access token in localStorage and marks the user as authorized
            // Otherwise, sets isAuthorized to false
            if (response.status == 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else{
                setIsAuthorized(false)
            }
        } catch (error){
            console.log(error)
            setIsAuthorized(false)
        }
    }

    // Checks if we need to refresh the token or not
    // Fetches the access token from localStorage
    // If no token exists, the user is unauthorized
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return
        }

        // Decodes the JWT to extract the exp (expiration timestamp)
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        // Get date in seconds
        const now = Date.now() / 1000

        // If the token is expired, it attempts to refresh the token using refreshToken()
        // Otherwise, marks the user as authorized
        if (tokenExpiration < now){
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }

    if (isAuthorized === null){
        return <div>Loading...</div>
    }

    // If the user is authorized, renders the children (protected content)
    // Otherwise, redirects the user to the /login page using the Navigate component
    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute