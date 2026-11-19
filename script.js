let poljeZaPretragu = document.getElementById("searchInput");

poljeZaPretragu.addEventListener("keydown", function(dogadjaj) {
    //console.log("radi");

    if (dogadjaj.key == "Enter") {
        let tekst = poljeZaPretragu.value.trim();

        if (tekst !== "") {
            alert("Tražiš pojmove za: ".concat(tekst));
        } else {
            alert("Unesi nešto za pretragu!");
        }
    }
});

// hamburger meni
let burgerDugme = document.getElementById("burgerBtn");
let burgerMeni = document.getElementById("burgerMeni");


burgerDugme.addEventListener("click", function() {
    let otvoren = burgerMeni.classList.toggle("open");
    burgerDugme.setAttribute("aria-expanded", otvoren);
});


document.addEventListener("click", function(dogadjaj) {
    if (!burgerMeni.contains(dogadjaj.target) && !burgerDugme.contains(dogadjaj.target)) {
        burgerMeni.classList.remove("open");
        burgerDugme.setAttribute("aria-expanded", "false");
    }
});

// popupovi
let dijalozi = document.querySelectorAll("dialog");


document.querySelectorAll("[data-open]").forEach(function(el) {
    el.addEventListener("click", function(dogadjaj) {
        dogadjaj.preventDefault();
        dijalozi.forEach(function(d) { d.close(); });
        burgerMeni.classList.remove("open");
        document.getElementById(el.dataset.open).showModal();
    });
});

// zatvaranje: X, klik na pozadinu ili Esc; kad se zatvori, forma se cisti
dijalozi.forEach(function(d) {
    d.addEventListener("click", function(dogadjaj) {
        if (dogadjaj.target === d || dogadjaj.target.hasAttribute("data-close")) d.close();
    });
    d.addEventListener("close", function() {
        let forma = d.querySelector("form");
        forma.reset();
        forma.lozinka.type = "password";
    });
});

// prikazi/sakrij lozinku
document.querySelectorAll(".prikazi").forEach(function(kvacica) {
    kvacica.addEventListener("change", function() {
        kvacica.form.lozinka.type = kvacica.checked ? "text" : "password";
    });
});

// ulogovan/neulogovan (za sad samo preko localStorage)
function osveziNavigaciju() {
    document.body.classList.toggle("ulogovan", localStorage.getItem("ulogovan") === "1");
}
osveziNavigaciju();

document.querySelectorAll("form").forEach(function(forma) {
    forma.addEventListener("submit", function(dogadjaj) {
        dogadjaj.preventDefault();
        // TODO: ovde ide Auth servis
        localStorage.setItem("ulogovan", "1");
        forma.closest("dialog").close();
        osveziNavigaciju();
    });
});

// odjava
document.querySelector("[data-logout]").addEventListener("click", function(dogadjaj) {
    dogadjaj.preventDefault();
    // TODO: odjava preko Auth servisa
    localStorage.removeItem("ulogovan");
    burgerMeni.classList.remove("open");
    osveziNavigaciju();
});