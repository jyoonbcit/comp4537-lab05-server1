import message from "..en/lang/user.js";
import patients from "../en/lang/patient.js";

const endPointRoot = "https://comp4537-lab04-server.vercel.app/api/server.js/"; // replace with server's endpoint


class Query {

    executeQuery() {

    }

    postQuery() {
        const insertQuery = `INSERT INTO patient (name, dateOfBirth) VALUES ${patients.map(patient => `('${patient.name}', '${patient.dateOfBirth}')`).join(', ')}`;
        xhr.open("POST", endPointRoot, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                console.log(response);
                document.getElementById("response").innerHTML = message.insertSuccess;
            } else {
                console.log("Error: " + xhr.status);
                document.getElementById("response").innerHTML = message.insertFail;
            }
        }

        xhr.send(JSON.stringify({ query: insertQuery }));

    }

}


const xhr = new XMLHttpRequest();