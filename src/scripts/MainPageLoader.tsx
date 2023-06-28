import PageHR from "../pages/hr-pages/Page-HR";
import PageCandidate from "../pages/candidate-pages/Page-Candidate";
import React, {useEffect, useState} from "react";
import handleToken from "./CookiesToken";

function MainPageByRole() {
    const [role, setRole] = useState("")
    const userId = handleToken();

    const fetchData = () => {
        fetch("/api/userInfo/getUsersInfo?userId=" + userId)
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
    else {
        return <PageCandidate/>;
    }



}


export default MainPageByRole;