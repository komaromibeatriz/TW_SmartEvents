let registerForm = document.getElementById("registerForm");

let roleInput = document.getElementById("role");
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let descInput = document.getElementById("desc");

let users = JSON.parse(localStorage.getItem("users")) || [];
let organizers = JSON.parse(localStorage.getItem("organizers")) || [];

registerForm.addEventListener("submit", function(e){
    e.preventDefault();

    const role = roleInput.value;
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const desc = descInput.value.trim();

   
    const emailRegex = /^[a-z]+\.[a-z]+[0-9]{0,2}@e-uvt\.ro$/i;

    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{7,}$/;

    if(!role){
        alert("Selectează tipul de cont!");
        return;
    }

    if(name.length < 3){
        alert("Numele este prea scurt!");
        return;
    }

    if(!emailRegex.test(email)){
        alert("Email invalid (ex: mario.popescu01@e-uvt.ro)");
        return;
    }

    if(!passwordRegex.test(password)){
        alert("Parola trebuie să aibă minim 7 caractere, o literă mare, una mică, cifră și simbol!");
        return;
    }

    if(username.length < 3){
        alert("Username prea scurt!");
        return;
    }

    if(usernameExists(username, role)){
        alert("Username deja folosit!");
        return;
    }

    if(emailExists(email, role)){
        alert("Email deja folosit!");
        return;
    }

    
    const account = {
        name,
        email,
        username,
        password,
        desc
    };

    if(role === "user"){
        users.push(account);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Cont utilizator creat ✅");
        window.location.href = "login.html";
    }
    else {
        organizers.push(account);
        localStorage.setItem("organizers", JSON.stringify(organizers));
        alert("Cont organizator creat ✅");
        window.location.href = "login.html";
    }

});

function usernameExists(u, role){
    const list = (role === "user") ? users : organizers;
    return list.some(a => a.username === u);
}

function emailExists(e, role){
    const list = (role === "user") ? users : organizers;
    return list.some(a => a.email === e);
}
