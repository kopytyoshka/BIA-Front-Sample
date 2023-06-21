import PageHR from "../pages/hr-pages/Page-HR";
import PageCandidate from "../pages/candidate-pages/Page-Candidate";
import React, {useEffect, useState} from "react";
import Login from "../pages/login-pages/Login";
import Registration from "../pages/login-pages/Registration";

function MainPageByRole() {
    const [role, setRole] = useState("")
    const fetchData = () => {
        fetch("/api/userInfo/getUserInformation/")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setRole(data.role.name)
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