import PageHR from "../pages/Page-HR";
import PageCandidate from "../pages/Page-Candidate";
import React, {useEffect, useState} from "react";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

function MainPageByRole() {
    const [role, setRole] = useState("")

    const fetchData = () => {
        fetch("http://sovkombank-cheescake-hackathon.duckdns.org/api/userInfo/getUserInformation")
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