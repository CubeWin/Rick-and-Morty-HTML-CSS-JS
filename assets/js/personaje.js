const personajeRAM = document.querySelector("#result-personaje");
const cPrev = document.querySelector("#charactPrev");
const cNext = document.querySelector("#charactNext");
let characterNumber = findGetParameter("id") || 1;

const getCharacter = async (id) => {
    try {
        const apiURL = `https://rickandmortyapi.com/api/character/${id}`;
        const response = await fetch(apiURL);
        if (!response || response.status == 404) {
            throw new Error("Error 404");
        }
        const data = await response.json();
        const reg = `
                <div class="col-12">
                    <div class="my-5 text-center cw__personaje--text fa-2x">
                        Personaje de rick y Morty
                    </div>
                </div>
                <div class="col-12 col-lg-6 d-flex justify-content-center align-items-center">
                    <div>
                        <div class="my-5 p-1 cw__box--shadow rounded-circle" style="max-width: 300px;">
                            <img src="${data.image}" alt="" loading="lazy" class=" img-fluid rounded-circle">
                        </div>
                        <div class="m-0 cw__personaje--text small">
                            <span>Personaje # ${data.id}</span>
                        </div>
                        <div class="m-0 cw__personaje--text">
                            <span>Nombre:</span>
                            ${data.name}
                        </div>
                    </div>
                </div>
                <div class="col-12 col-lg-6 d-flex justify-content-center align-items-center">
                    <div>
                        <div class="my-5 cw__personaje--text">
                            <span>Especie:</span>
                            ${data.species}
                        </div>
                        <div class="my-5 cw__personaje--text">
                            <span>Origen:</span>
                            ${data.origin.name}
                        </div>
                        <div class="my-5 cw__personaje--text">
                            <span>Genero:</span>
                            ${data.gender}
                        </div>
                        <div class="my-5 cw__personaje--text p-lg-0 pb-5">
                            <span>Estado:</span>
                            ${data.status}
                        </div>
                    </div>
                </div>`;
        personajeRAM.innerHTML = reg;

        if (characterNumber == 826) {
            cNext.disabled = true;
            cNext.classList.add("cw__disable--arrow");
        } else {
            cPrev.disabled = false;
            cNext.classList.remove("cw__disable--arrow");
        }

        if (characterNumber == 1) {
            cPrev.disabled = true;
            cPrev.classList.add("cw__disable--arrow");
        } else {
            cPrev.disabled = false;
            cPrev.classList.remove("cw__disable--arrow");
        }
    } catch (error) {
        personajeRAM.innerHTML = `
                <div class="col-12">
                    <div class="my-5 cw__personaje--text fa-4x">
                        Personaje no encontrado
                    </div>
                    <p class="my-5 cw__personaje--text text-danger" >${error}</p>
                </div>`;
    }
};

const initCharacter = () => {
    getCharacter(characterNumber);
};

cPrev.addEventListener("click", () => {
    if (!cPrev.disabled) {
        characterNumber--;
        initCharacter();
    } else {
        console.log("⛔️ No hay mas personajes");
    }
});

cNext.addEventListener("click", () => {
    if (!cNext.disabled) {
        characterNumber++;
        initCharacter();
    } else {
        console.log("⛔️ No hay mas personajes");
    }
});

initCharacter();
