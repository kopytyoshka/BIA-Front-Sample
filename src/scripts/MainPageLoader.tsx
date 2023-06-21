import PageHR from "../pages/hr-pages/Page-HR";
import PageCandidate from "../pages/candidate-pages/Page-Candidate";
import React, {useEffect, useState} from "react";
import Login from "../pages/login-pages/Login";
import Registration from "../pages/login-pages/Registration";

function MainPageByRole() {
    const [role, setRole] = useState("")
    const [userId, SetUserId] = useState("")
    useEffect(() => {
        const getUserIdFromCookie = (): string => {
            const name = 'userId=';
            const decodedCookie = decodeURIComponent(document.cookie);
            const cookieArray = decodedCookie.split(';');

            for (let i = 0; i < cookieArray.length; i++) {
                let cookie = cookieArray[i];
                while (cookie.charAt(0) === ' ') {
                    cookie = cookie.substring(1);
                }
                if (cookie.indexOf(name) === 0) {
                    return cookie.substring(name.length, cookie.length);
                }
            }

            return "Error to get UserId";
        };

        // Get the user ID from the cookie
        const userId = getUserIdFromCookie();
        SetUserId(userId)

        // Use the user ID as needed
        console.log(userId);
    }, []);

    const fetchData = () => {
        fetch("/api/userInfo/getUserInformation?userId=" + userId)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setRole(data.role)
            })
    }

    useEffect(  () => {
        fetchData();
    })

    if (role == "HR") {
        return <PageHR/>;
    }
    else if (role == "USER") {
        return <PageCandidate/>;
    }
    else {
        return <Registration/>
    }



}


export default MainPageByRole;