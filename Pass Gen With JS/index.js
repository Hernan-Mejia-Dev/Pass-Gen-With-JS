/*creamos la constante contraseña generada 
  que tiene dentro suyo una funcion que la rellena de valores al azar*/
const generatePassword = (letras, length) => {
    let password = "";
    //creamos un ciclo que rellene la variable con contenido al azar
    for (let x = 0; x < length; x++) {
        let random = Math.floor(Math.random() * letras.length);
        password += letras.charAt(random);
    }
    return password;
};

/*creamos funcion constante que evalura los caracteres 
  que podran o no aparecer dentro dee la funcion generada*/
const generar = () => {
    //obtenemos el valor dentro del input del tamaño de la contraseña
    let length = parseInt(inputLength.value);
    //creamos las cadenas de texto a usar
    //letras del alfabeto(mayusculas y minusculas)
    let letras = "abcdefghijklmnopqrstuvwxyz";
    //numeros del 1 al 9
    const numeros = "0123456789";
    //simbolos
    const simbolos = ".?,;-_¡!¿*%&$/()[]{}|@><";
    //mayusculas
    const mayus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    /*evaluamos si el checbox de incluir numeros esta marcado
      para asi agregar los numeros dentro de las letras disponibles a usar
      dentro de la funcion al azar*/
    if (checkbox1.checked) letras += numeros;

    /*evaluamos si el checbox de incluir simbolos esta marcado
      para asi agregar los simbolos dentro de las letras disponibles a usar
      dentro de la funcion al azar*/
    if (checkbox2.checked) letras += simbolos;

     /*evaluamos si el checbox de incluir mayusculas esta marcado
      para asi agregar las mayusculas dentro de las letras disponibles a usar
      dentro de la funcion al azar*/
    if (checkbox3.checked) letras += mayus;

    /*invocamos la funcion de generar contraseña y añadimos el resultado 
      dentro del espacio creado por la etiqueta <span>*/
    generatedPassword.innerText = generatePassword(letras, length);
    /*Añadimos directamento un elemento html dentro de la segunda etiqueta <span>*/
    copiarTexto.innerHTML = '<br/><button class="btn btn-primary" id="copiar">Copiar Texto</button>'
};

/*
  Creamos la funcion para poder copiar la contraseña sin que el usuario lo sepa
*/
function CopiarTexto(texto) {
  //Recibibos como argumento el texto a copiar
  //Creamos un elemento en la memoria de preferencia un input o campo de texto
  let Texto = document.createElement("textarea");
  //Le agregamos algunos valores y atributos
  Texto.value = texto;
  Texto.setAttribute("readonly","");
  //Hacemos que el elemento en cuestion se encuentre en un punto donde el usuario no pueda verlo
  Texto.style.position = "absolute";
  Texto.style.left = "-999999999px";

  //Agregamos el elemento dentro del html (en el body)
  document.body.appendChild(Texto);

  //Seleccionamos el texto dentro del elemento
  Texto.select();
  //Copiamos el texto
  document.execCommand("copy");
  //Removemos el elemento dentro del html
  document.body.removeChild(Texto);
}

//Validamos si la ventana y sus componentes han cargado correctamente
window.addEventListener("DOMContentLoaded", () => {
    //añadimos el evento de click al boton de generar para disparar la funcion del mismo nombre
    boton.addEventListener("click", () => {
        generar();
        /*Como la funcion generar es la que genera el boton de copiar
        posterior a ella anidamos el evento del boton copiar texto*/
        copiar.addEventListener("click",()=> {
          /*enviamos el texto dentro de la etiqueta <span>
          donde colocamos la contraseña anteriormente
          y lo enviamos como argumento en la funcion CopiarTexto*/
          CopiarTexto(generatedPassword.textContent);
          /*Utilizando la libreria importada en el html
          creamos un alerta que informe que el texto fue copiado*/
          swal({
            title:"Texto copiado con exito",
            text:"Su contraseña ha sido copiada en el portapapeles de su dispositivo",
            icon:"success",
            button: false
          });
        });
    });
});