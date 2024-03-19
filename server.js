import patients from '../en/lang/messages/patient.js';
import message from '../en/lang/messages/user.js';

const endPointRoot = "https://comp4537-lab05-server2.vercel.app/";
const xhr = new XMLHttpRequest();

class Query {
    executeQuery() {
        const query = document.getElementById('queryInput').value.trim();
        const method = this.determineMethod(query);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const response = JSON.stringify(xhr.responseText);
                console.log(response);
                document.getElementById("response").innerHTML = response;
            } else {
                console.log("Error: " + xhr.status);
                document.getElementById("response").innerHTML = message.queryFail;
            }
        }
        if (method === 'POST') {
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify({ query: query }));
        } else if (method === 'GET') {
            xhr.open(method, endPointRoot + encodeURIComponent(query));
            xhr.setRequestHeader("Content-Type", "application/json");
            console.log("Sending GET request");
            xhr.send();
        } else {
            console.log("This is not a Post or Get request")
            document.getElementById("response").innerHTML = message.sqlError;
        }
    }

    determineMethod(query) {
        if (query.toLowerCase().startsWith('insert')) {
            return 'POST';
        } else if (query.toLowerCase().startsWith('select')) {
            return 'GET';
        } else {
            return message.invalidQuery;
        }
    }

    postQuery() {
        const insertQuery = `INSERT INTO patient (name, dateOfBirth) VALUES ${patients.map(patient => `('${patient.name}', '${patient.dateOfBirth}')`).join(', ')}`;
        xhr.open("POST", endPointRoot);
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

const query = new Query();
document.getElementById("executeQueryBtn").addEventListener("click", () => {
    query.executeQuery();
});
document.getElementById("postQueryBtn").addEventListener("click", () => {
    query.postQuery();
});
export default Query;
