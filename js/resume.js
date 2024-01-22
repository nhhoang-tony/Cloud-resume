// always move to top of page when reloads
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', function () {
    get_visit();
})

// get current visit numbers on site
async function get_visit() {
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    // make API call with parameters and use promises to get response
    let data = await fetch("https://lff8ghifme.execute-api.ap-southeast-2.amazonaws.com/prod", requestOptions)
        .then(response => response.text())
        .then(result => { return JSON.parse(result).body; })
        .catch(error => console.log('error', error));

    var count;
    var domains = JSON.parse(data);
    for (let i = 0; i < domains.length; i++) {
        if (domains[i].domain == 'resume.tonynguyen61.com') {

            count = domains[i].count;
        }
    }
    console.log(count + 1);

    increment_visit(count + 1);
}

// update visit numbers
function increment_visit(count) {
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({ "count": count, "domain": "resume.tonynguyen61.com" });
    // using built in JSON utility package turn object to string and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    // make API call with parameters and use promises to get response
    fetch("https://sspb2z8a24.execute-api.ap-southeast-2.amazonaws.com/prod", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            document.getElementById('count').innerHTML = `Views: ${count.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
        })
        .catch(error => console.log('error', error));
}