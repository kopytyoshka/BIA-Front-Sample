import jwt_decode from "jwt-decode";
import {redirectToExternalSite} from "./utils";
import * as path from "path";

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
    console.log("Redirecting to login...");
}

function decodeToken(token: string): string {
    const decodedToken: { sub: string } = jwt_decode(token);
    return decodedToken.sub;
}

function handleToken(): string {
    const token = checkToken();
    let sub = "";
    if (window.location.pathname === "/login") {
        console.log("Already on login page");
        return "";
    } else if (!token) {
        redirectToLogin();
    } else {
        sub = decodeToken(token);
    }
    return sub;
}

export default handleToken;
