import jwt_decode from "jwt-decode";
import {redirectToExternalSite} from "./utils";

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
    redirectToExternalSite('/login')
    console.log("Redirecting to login...");
}

// Decode token and retrieve 'sub' field
function decodeToken(token: string): string {
    const userId: { sub: string } = jwt_decode(token);
    return userId.sub;
}

function handleToken(): string {
    const token = checkToken();
    let sub = "";
    if (!token) {
        redirectToLogin();
    } else {
        sub = decodeToken(token);
        console.log("Sub:", sub);
    }
    return sub;
}

// Call the main function to start the process
export default handleToken;
