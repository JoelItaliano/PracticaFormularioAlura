import { valida } from "./validaciones.js";

const inputs = document.querySelectorAll("input");
//recorre todos los input, cuando sale de foco de alguno seleccionado llama ala funcion
inputs.forEach( (input) => {
    input.addEventListener("blur", (input) => {
        valida(input.target);
    })
})