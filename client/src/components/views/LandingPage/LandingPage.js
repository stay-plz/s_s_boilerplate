import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
    useEffect(() => {
        axios
            .get("/api/axiosTest")
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    }, []);

    return <div>LandingPage</div>;
}

export default LandingPage;
