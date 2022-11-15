//array que tiene los nombres de tipos de errores de los inputs
const tipoDeErrores = ["valueMissing", "typeMismatch", "aaaapatternMismatch", "customError"];

export function valida(input) {
    // dataset obtiene la coleccion de todos los tios da data- en el dom,
    // .tipo es el tipo de data- que quiero obtener
    const tipoDeInput =  input.dataset.tipo 

    //verifica si en cada tipo de input exite en los validadores
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    //si hay un error aplica una clase al padre el input que pone el campo en rojo
    //se manad  llmr cad vez que el usuario sale del input que esta usando (blur)
    if(input.validity.valid) {
        input.parentElement.classList.remove("input-container--ivalid");
        //si no existe error muestra un string vacio
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--ivalid")
        //si existe error muestra um msj segun el input selec, que se encuentra en la funcion
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }

}




//dentro de este objeto definimos que tipo de errores presenta los input
const mensajeDeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacio" // tipo de error con mensaje
    },
    email: {
        valueMissing: "Este campo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, debe tener mayusculas, minusculas y un numero, no puede tener caracteres especiales"
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formato requerido es: xxxxxxxxxx 10 números"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La direccion debe contener enrtre 10 a 40 caracteres"
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La ciudad debe contener enrtre 10 a 40 caracteres"
    },
    estado: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El estado debe contener enrtre 10 a 40 caracteres"
    }
}



//objeto
const validadores = { 
    nacimiento: (input) => validarNacimiento(input)
};


//afunciaon quea recorre aun arreglo y trae el tipo de erro de los inputs 
function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach(error => {

        if(input.validity[error]) {
            console.log(mensajeDeError[tipoDeInput][error])
            mensaje = mensajeDeError[tipoDeInput][error]
        }

    })
    
    return mensaje;
}

function validarNacimiento(input) { 
    const fechaCliente = new Date(input.value);
    let mensaje = ""


    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años de edad"
    }

    input.setCustomValidity(mensaje)
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    //obtengo la fecha que brinda el usuario y le agrego 18 años
    //si la fecha es mayor que la fecha actual returna false, por lo que no tiene 18 años
    const diferenciasFechas = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate())
    return diferenciasFechas <= fechaActual
}