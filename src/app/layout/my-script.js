var settingsBtn = document.getElementById("button");
var menu = document.getElementById("menu");

    settingsBtn.addEventListener("click", function() {
    if (menu.style.display === "none") {
        menu.style.display = "block";
    } else {
        menu.style.display = "none";
    }
   });