import axios from "axios";

const setAuthToken = function (token) {
    if (token) {
        // Füge den Token in das Headerfeld "Authorization" ein für jedes Request das gestellt wird
        axios.defaults.headers.common["Authorization"] = "token";
    } else {
        // lösche den authheader
        delete axios.defaults.headers.common["Authorization"];
    }
}

export default setAuthToken;