



var loggedInUser = {
    username: "",
    fullName: "",
    email: "",
    experience: "",
    credits: "",
    pfp: ""
};

function changePP() {
    var input = document.getElementById("changeProfilePicture");
    var file = input.files[0]; // Get the selected file

    if (file) {

        if (file.type !== "image/jpeg") {
            alert("Error: Please select a JPEG image file.");
            return;
        }
        var formData = new FormData(); // Create FormData object
        formData.append("token", "code37"); // Add token parameter
        formData.append("id",localStorage.getItem('id')); // Add id parameter (replace "123456" with actual user id)
        formData.append("Image", file, file.name); // Add file parameter

        // Send data to the API endpoint
        fetch("http://monsterballgo.com/api/setpfp.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Handle API response
            if (data.error) {
                alert("Error: " + data.error);
            } else {
                // Success response
                alert("Profile picture updated successfully! New URL: " + data.pfp_url);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        });
    }
}








function displayInfo() {
    // Retrieve user details from localStorage
    var username = localStorage.getItem('username');
    var fullName = localStorage.getItem('fullName');
    var email = localStorage.getItem('email');
    var experience = localStorage.getItem('experience');
    var credits = localStorage.getItem('credits');
    var pfpurl = localStorage.getItem('pfp');

    // Populate the HTML elements with user details
    document.getElementById("username").textContent = username;
    document.getElementById("fullName").textContent = fullName;
    document.getElementById("email").textContent = email;
    document.getElementById("experience").textContent = experience;
    document.getElementById("credits").textContent = credits;
    document.getElementById("profilePicture").src=pfpurl;
    
}
    


function login(){
    //alert("entra a la funcion")
    var user= document.getElementById("loginUsername").value;
    var password= document.getElementById("loginPassword").value;

    

    document.getElementById("loginForm").addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent the default form submission
        const hashedPassword = await sha256(password); // You need to implement this function to hash the password


        // Get form data
        const formData = new FormData();

        // Add token to form data
        formData.append("token", "code37");
        formData.append("user",user);
        formData.append("pass",hashedPassword);


        // Hash the password using SHA256
        //const password = formData.get("password");
        //const hashedPassword = sha256(password); // You need to implement this function to hash the password

        // Replace the plain password with the hashed password
        //formData.set("password", hashedPassword);

        // Send data to the API endpoint
        fetch("http://monsterballgo.com/api/login.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Handle API response
            if (data.error) {
                alert("Error: " + data.error);
            } else {
                // Registration successful, display success loggedInUser.username = data.Username;
                loggedInUser.fullName = data.firstname + " " + data.lastname;
                loggedInUser.email = data.email;
                loggedInUser.experience = data.xp;
                loggedInUser.credits = data.credits;

                localStorage.setItem('username',data.username);
                localStorage.setItem('fullName',data.firstname+" "+data.lastname);
                localStorage.setItem('pfp',data.pfp_url);
                localStorage.setItem('email',data.email);
                localStorage.setItem('experience',data.xp);
                localStorage.setItem('credits',data.credits);
                localStorage.setItem('id',data.id);
                


                //alert("Login successful! Username: " + data.username + ", XP: " + data.xp + ", Email: " + data.email + ", credits: "+data.credits+",nombre: " + data.firstname + "apellido: "+data.lastname+"pfp url"+data.pfp_url);


               window.location.replace( "display.html");
                

            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        });
    });

 
}

function Regg(){
    //alert("Entramos a la funcion.");
    var username = document.getElementById("username").value;

    var nombre = document.getElementById("username").value;
    var apellido= document.getElementById("apellido").value;
    var Email= document.getElementById("correo").value;
    var password= document.getElementById("password").value;
    var id= document.getElementById("ID").value;
    token = "code37";
    //alert("Variables guardadas");

    document.getElementById("registrationForm").addEventListener("submit", async function(event) {
        event.preventDefault(); // Prevent the default form submission
        const hashedPassword = await sha256(password); // You need to implement this function to hash the password



        // Get form data
        const formData = new FormData();
        formData.append("token", token);
        formData.append("id",id);
        formData.append("username",username);
        formData.append("pass",hashedPassword);
        formData.append("firstname",nombre);
        formData.append("lastname",apellido);
        formData.append("email",Email);

        // Hash the password using SHA256
        //const password = formData.get("password");
        //const hashedPassword = sha256(password); // You need to implement this function to hash the password

        // Replace the plain password with the hashed password

        // Send data to the API endpoint
        fetch("http://monsterballgo.com/api/register.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            // Handle API response
            if (data.error) {
                alert("Error: " + data.error);
            } else {
                // Registration successful, display success message
                alert("Registro Exitoso! Username: " + data.username + ", ID: " + data.id + ", Email: " + data.email);
                window.location.href = 'login.html';

            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred. Please try again later.");
        });
    });

    // Function to hash password using SHA256 (You need to implement this function)
   



}
async function sha256(plainText) {
    // Implement SHA256 hashing algorithm here
    const buffer = new TextEncoder("utf-8").encode(plainText);
    const hash = await crypto.subtle.digest("SHA-256",buffer);
    return hex(hash)
}

function hex(buffer){
    var hexCodes=[];
    var view = new DataView(buffer);
    for ( var i=0;i<view.byteLength;i+=4){
        var value = view.getUint32(i);
        var stringValue = value.toString(16);
        var padding = '00000000';
        var paddedValue = (padding + stringValue).slice(-padding.length);
        hexCodes.push(paddedValue);
    }
    return hexCodes.join("");
}

