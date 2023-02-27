{
  document.addEventListener("DOMContentLoaded", () => {


    // Creamos un div y le agregamos el id --> contenedor 
    const contenedor = document.createElement('div');
    contenedor.setAttribute('id', 'contenedor');

    //  Le agregamos ancho, margen, fonde de color, padding y borde redondeado
    contenedor.style.width = '400px';
    contenedor.style.margin = 'auto';
    contenedor.style.backgroundColor = '#eee';
    contenedor.style.padding = '20px';
    contenedor.style.borderRadius = '10px';

    // Creamos la barra de resultado de tipo text con el id resultado y por defecto esta deshabilitado
    const resultado = document.createElement('input');
    resultado.setAttribute('type', 'text');
    resultado.setAttribute('id', 'resultado');
    resultado.setAttribute('disabled', 'true');
    resultado.value = 0;


    // A la barra de resultado le agregamos estilo css
    resultado.style.width = '100%';
    resultado.style.height = '50px';
    resultado.style.fontSize = '20px';
    resultado.style.textAlign = 'right';
    resultado.style.marginBottom = '20px';

    // agregramos a la contenedor la barra de resultado
    contenedor.appendChild(resultado);

    // Creamos un array con todos los valores de la contenedor
    const buttons = ['CE', '←', '%', '+', 7, 8, 9, '-', 4, 5, 6, '*', 1, 2, 3, '/', 0, '±', '.', '='];

    // recorremos el array creando un boton por cada elemento con su estilo correspondiente y le agregamos a la contenedor 
    buttons.forEach((value) => {
      const button = document.createElement('button');
      button.textContent = value;
      button.style.margin = '10px';
      button.style.width = '20%';
      button.style.height = '50px';
      button.style.fontSize = '20px';
      contenedor.appendChild(button);

      button.addEventListener('click', () => {
        calculadora(button);
      });
    });

    // Agregamos la contenedor al body del html
    document.body.appendChild(contenedor);

    function calculadora(button) {
      switch (button.textContent) {
        case 'CE':
          borrarTodo();
          break;

        case '=':
          calcular();
          break;

        case '←':
          borrar();
          break;

        case '%':
          porcentaje();
          break;

        case '±':
          opuesto();
          break;

        case '.':
          decimales(button);
          break;

        default:
          actualizar(button);
          break;
      }
    };

    function actualizar(button) {
      if ((resultado.value.search(/[\+\-\*\//]/) != "-1" && (button.textContent == "+" || button.textContent == "/" || button.textContent == "*" || button.textContent == "-"))) {
        if (button.textContent == "-" && resultado.value.match(/-/g).length < 2) {
          resultado.value += button.textContent;
        }
        return;
      };


      if (resultado.value == 0 && (button.textContent == "+" || button.textContent == "/" || button.textContent == "*")) {
        console.log("a");
        return;
      };

      if (resultado.value == 0 && button.textContent != '-') {
        resultado.value = '';
      };

      resultado.value += button.textContent;
    };

    function decimales(button) {
      let cadena = resultado.value.toString();
      if (!cadena.includes(".")) {
        resultado.value += button.textContent;
        return;
      };

      let index = resultado.value.search(/[\+\-\*\/]/); // Encuentra la posición del primer signo de "+", "-", "*", o "/"
      let restOfString = resultado.value.substring(index + 1); // Obtiene la subcadena que comienza después del primer signo
      if (!restOfString.includes(".")) {
        resultado.value += button.textContent;
        return;
      };
    };

    function calcular() {
      resultado.value = eval(resultado.value);
    };

    function opuesto() {
      if (!isNaN(resultado.value)) {
        resultado.value = (resultado.value * -1);
      };
    };

    function borrarTodo() {
      resultado.value = 0;
    };

    function borrar() {
      resultado.value.toString().length === 1 ? resultado.value = 0 : resultado.value = resultado.value.toString().slice(0, -1);
    };

    function porcentaje() {
      !isNaN(resultado.value) ? resultado.value /= 100 : resultado.value = 0;
    };

    document.addEventListener("keydown", function (evento) {
      if (evento.key == "Backspace") {
        borrar();
      }
      if (evento.key == "Delete") {
        borrarTodo();
      }
    });
  });
}