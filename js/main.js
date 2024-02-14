function init() {
    let res_elm = document.createElement("div");
    res_elm.innerHTML = "Hi, How can I help you?";
    res_elm.setAttribute("class", "left");
    document.getElementById('msg').appendChild(res_elm);

    // Add event listener for the reply button
    document.getElementById('reply').addEventListener("click", async (e) => {
        e.preventDefault();
        var req = document.getElementById('msg_send').value.trim(); // Get the user input and remove leading/trailing spaces
        if (!req) {
            // Handle empty input case
            return;
        } else {
            var res = "";
            // Check if the user input is "can you help me"
            if (req.toLowerCase() === "can you help me") {
                res = "Sure!";
            } else {
                try {
                    // Make an API call to get the response using CORS Anywhere proxy
                    const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://jsonplaceholder.typicode.com/posts?userId=${req}`);
                    res = JSON.stringify(response.data);
                } catch (error) {
                    console.error('Error fetching response:', error);
                    res = "Error: Failed to fetch response.";
                }
            }

            // Create elements for the request and response
            let data_req = document.createElement('div');
            let data_res = document.createElement('div');
            let container1 = document.createElement('div');
            let container2 = document.createElement('div');

            // Add classes to the containers
            container1.setAttribute("class", "msgCon1");
            container2.setAttribute("class", "msgCon2");

            // Set the innerHTML of request and response elements
            data_req.innerHTML = req;
            data_res.innerHTML = res;

            // Add classes to the request and response elements
            data_req.setAttribute("class", "right");
            data_res.setAttribute("class", "left");

            // Get the message container
            let message = document.getElementById('msg');

            // Append request and response elements to their respective containers
            message.appendChild(container1);
            message.appendChild(container2);
            container1.appendChild(data_req);
            container2.appendChild(data_res);

            // Clear the input field after sending the message
            document.getElementById('msg_send').value = "";

            // Scroll to the bottom of the message container
            function scroll() {
                var scrollMsg = document.getElementById('msg');
                scrollMsg.scrollTop = scrollMsg.scrollHeight;
            }
            scroll();
        }
    });
}


