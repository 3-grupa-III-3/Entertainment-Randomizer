let poljeZaPretragu = document.getElementById("searchInput");

poljeZaPretragu.addEventListener("keydown", function(dogadjaj) {
    if (dogadjaj.key == "Enter") {
        let tekst = poljeZaPretragu.value.trim();

        if (tekst !== "") {
            alert("Tražiš pojmove za: ".concat(tekst));
        } else {
            alert("Unesi nešto za pretragu!");
        }
    }
});

// BURGER MENI
let burgerDugme = document.getElementById("burgerBtn");
let burgerMeni = document.getElementById("burgerMeni");

// otvori/zatvori meni klikom na dugme
burgerDugme.addEventListener("click", function() {
    let otvoren = burgerMeni.classList.toggle("open");
    burgerDugme.setAttribute("aria-expanded", otvoren);
});

// zatvori meni kad se klikne bilo gde van njega
document.addEventListener("click", function(dogadjaj) {
    if (!burgerMeni.contains(dogadjaj.target) && !burgerDugme.contains(dogadjaj.target)) {
        burgerMeni.classList.remove("open");
        burgerDugme.setAttribute("aria-expanded", "false");
    }
});

// POPUP-OVI
// oba popup-a u jednoj listi
let dijalozi = document.querySelectorAll("dialog");

// OTVARANJE: svaki element sa data-open="id" otvara popup sa tim id-jem
document.querySelectorAll("[data-open]").forEach(function(el) {
    el.addEventListener("click", function(dogadjaj) {
        dogadjaj.preventDefault();                                 // link href="#" ne sme da skoči na vrh strane
        dijalozi.forEach(function(d) { d.close(); });              // zatvori otvoreni popup (ovako radi i prebacivanje log in <-> sign up)
        burgerMeni.classList.remove("open");                       // zatvori burger meni ako je bio otvoren
        document.getElementById(el.dataset.open).showModal();      // dataset.open = vrednost data-open; showModal() otvara popup sa zatamnjenjem i Esc
    });
});

// ZATVARANJE I ČIŠĆENJE
dijalozi.forEach(function(d) {
    d.addEventListener("click", function(dogadjaj) {
        // zatvori ako je kliknuta pozadina (target je sam <dialog>) ili dugme sa data-close
        if (dogadjaj.target === d || dogadjaj.target.hasAttribute("data-close")) d.close();
    });
    d.addEventListener("close", function() {                       // "close" se desi uvek kad se popup zatvori (X, pozadina, Esc, uspešna prijava)
        let forma = d.querySelector("form");
        forma.reset();                                             // obriši ono što je uneto
        forma.lozinka.type = "password";                           // forma.lozinka = polje sa name="lozinka"; vrati ga u skriveni režim
    });
});

// PRIKAŽI / SAKRIJ LOZINKU
document.querySelectorAll(".prikazi").forEach(function(kvacica) {
    kvacica.addEventListener("change", function() {                // "change" = korisnik štriklirao ili odštriklirao
        kvacica.form.lozinka.type = kvacica.checked ? "text" : "password";   // kvacica.form = forma u kojoj je kvačica
    });
});

// ULOGOVAN / NEULOGOVAN
function osveziNavigaciju() {
    // dodaje klasu "ulogovan" na <body> ako je sačuvano da je korisnik ulogovan, inače je skida; CSS radi ostalo
    document.body.classList.toggle("ulogovan", localStorage.getItem("ulogovan") === "1");
}
osveziNavigaciju();                                                // pozovi odmah pri učitavanju strane

// SLANJE FORMI (log in i sign up rade isto, zato jedna petlja)
// "submit" se dešava tek kad je browser potvrdio da su polja ispravna (required, email, minlength)
document.querySelectorAll("form").forEach(function(forma) {
    forma.addEventListener("submit", function(dogadjaj) {
        dogadjaj.preventDefault();                                 // spreči osvežavanje stranice
        localStorage.setItem("ulogovan", "1");                     // TODO: ovde ide poziv Auth servisa
        forma.closest("dialog").close();                           // zatvori popup u kome se nalazi ova forma
        osveziNavigaciju();
    });
});

// ODJAVA
document.querySelector("[data-logout]").addEventListener("click", function(dogadjaj) {
    dogadjaj.preventDefault();
    localStorage.removeItem("ulogovan");                           // TODO: ovde ide odjava preko Auth servisa
    burgerMeni.classList.remove("open");
    osveziNavigaciju();
});