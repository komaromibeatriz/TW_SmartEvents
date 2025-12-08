let loginForm = document.getElementById("loginForm");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let roleSelect = document.getElementById("role");

loginForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const role = roleSelect.value;

  const emailRegex = /^[a-z]+\.[a-z]+[0-9]{0,2}@e-uvt\.ro$/i;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{7,}$/;

  if (!emailRegex.test(email)) {
    alert("Email invalid (ex: mario.popescu01@e-uvt.ro)");
    return;
  }

  if (!passwordRegex.test(password)) {
    alert("The password must have at least 7 characters and include a symbol, an uppercase letter, a lowercase letter, and a digit.");
    return;
  }

  if (!role) {
    alert("Select a role!");
    return;
  }

  if (role === "organizer") {
    window.location.href = "organizerAccount.html";
    return;
  }
  else {

    window.location.href = "userHome.html";
    return;
  }

});
