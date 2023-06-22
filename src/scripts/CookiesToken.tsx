import jwt_decode from "jwt-decode";
import {redirectToExternalSite} from "./utils";
import * as path from "path";

// Function to check if the token exists in cookies
// Function to check if the token exists in cookies
function checkToken(): string | null {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === "token") {
            return value;
        }
    }
    return null;
}

// Redirect function
function redirectToLogin(): void {
    // Redirect logic here
    console.log("Redirecting to login...");
    // Example redirect code:
    // window.location.href = "/login";
}

// Decode token and retrieve 'sub' field
function decodeToken(token: string): string {
    const decodedToken: { sub: string } = jwt_decode(token);
    return decodedToken.sub;
}

// Main function to handle the redirect or decoding


function handleToken(): string {
    const token = checkToken();
    let sub = "";
    if (window.location.pathname === "/login") {
        // If already on the login page, no need to redirect
        console.log("Already on login page");
        return "";
    } else if (!token) {
        redirectToLogin();
    } else {
        sub = decodeToken(token);
        console.log("Sub:", sub);
        // Continue with your logic using the 'sub' field
    }
    return sub;
}

// Call the main function to start the process
export default handleToken;
