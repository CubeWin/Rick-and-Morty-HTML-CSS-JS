const pointe = document.querySelector("#result");
const messag = document.querySelector("#messageInfo");
const buscarPersonaje = document.querySelector("#searchCharacter");
let apiURL = "https://rickandmortyapi.com/api/character/?page=1";
let ultimoPersonaje;

const callmer = async () => {
    try {
        const persons = await fetch(apiURL);
        const data = await persons.json();
        if (!data.results || !data) {
            throw new Error("No se encontraron Resultados");
        }
        let response = "";
        data.results.map((p) => {
            const dataStatus =
                p.status == "Alive"
                    ? "text-success"
                    : p.status == "Dead"
                    ? "text-danger"
                    : "text-secondary";
            response += `
                <div class="cw__card cw__box--shadow g-col-6">
                    <div class="cw__card--content">
                        <div class="cw__card--title">
                            <h2>${p.name}</h2>
                        </div>
                        <div class="cw__card--description">
                            <h3>${p.species}</h3>
                            <small>${p.origin.name}</small>
                        </div>
                        <div class="cw__card--image">
                            <img src="${p.image}" alt="${p.name}" loading="lazy">
                        </div>
                        <div class="cw__card--lateral">
                            <p class="${dataStatus} text-uppercase">
                                <i class="fa fa-heartbeat"></i> ${p.status}
                            </p>
                        </div>
                        <div class="cw__card--id">${p.id}</div>
                        <a href="http://192.168.0.8:5500/personaje/?id=${p.id}" class="cw__card--btn">
                            <i class="fa fa-search"></i>
                        </a>
                    </div>
                </div>`;
        });
        pointe.innerHTML += response;
        apiURL = data.info.next;

        if (ultimoPersonaje) {
            observador.unobserve(ultimoPersonaje);
        }

        const allCharacters = document.querySelectorAll(".cw__card");
        ultimoPersonaje = allCharacters[allCharacters.length - 1];
        observador.observe(ultimoPersonaje);
    } catch (error) {
        console.error(error);
        messag.innerHTML = `${error}`;
    }
};

const observerOptions = {
    rootMargin: "0px 0px 250px 0px",
    threshold: 1.0,
};

const loadContent = ([entradas]) => {
    if (apiURL && entradas.isIntersecting) callmer();
};

const realizarBusqueda = async (e) => {
    let personaje = e.target.value;
    pointe.innerHTML = "";
    messag.innerHTML = `cargando...`;
    apiURL = `https://rickandmortyapi.com/api/character/?page=1&name=${personaje}`;
    console.log(apiURL);
    callmer();
};

let observador = new IntersectionObserver(loadContent, observerOptions);
buscarPersonaje.addEventListener("keyup", realizarBusqueda);
