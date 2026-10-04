// Esperamos a que el HTML esté cargado antes de buscar elementos
document.addEventListener("DOMContentLoaded", () => {
  // Año actual en el pie de página
  document.getElementById("anio").textContent = new Date().getFullYear();

  const formulario = document.getElementById("formulario-contacto");
  const mensajeExito = document.getElementById("mensaje-exito");
  const botonEnviar = formulario.querySelector("button[type='submit']");

  // Reglas de validación: cada campo tiene una función que devuelve
  // un texto de error, o una cadena vacía si el valor es válido.
  const reglas = {
    nombre: (valor) => {
      if (valor === "") return "Por favor escribe tu nombre.";
      if (valor.length < 2) return "El nombre debe tener al menos 2 letras.";
      return "";
    },
    correo: (valor) => {
      if (valor === "") return "Por favor escribe tu correo.";
      const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!patron.test(valor)) return "El correo no parece válido.";
      return "";
    },
    telefono: (valor) => {
      if (valor === "") return ""; // Es opcional
      const patron = /^[0-9+\s-]{7,15}$/;
      if (!patron.test(valor)) return "Escribe solo números (7 a 15 dígitos).";
      return "";
    },
    mensaje: (valor) => {
      if (valor === "") return "Por favor escribe un mensaje.";
      if (valor.length < 10) return "El mensaje debe tener al menos 10 caracteres.";
      return "";
    },
  };

  // Valida un campo, muestra u oculta su error y devuelve true si es válido
  function validarCampo(nombreCampo) {
    const input = formulario.elements[nombreCampo];
    const error = reglas[nombreCampo](input.value.trim());

    document.getElementById(`error-${nombreCampo}`).textContent = error;
    input.parentElement.classList.toggle("invalido", error !== "");

    return error === "";
  }

  // Validar cada campo cuando el usuario sale de él
  Object.keys(reglas).forEach((nombreCampo) => {
    formulario.elements[nombreCampo].addEventListener("blur", () => {
      validarCampo(nombreCampo);
    });
  });

  // Al enviar el formulario
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault(); // Evita que la página se recargue
    mensajeExito.hidden = true;

    // Validamos todos los campos (map en lugar de every para mostrar todos los errores)
    const resultados = Object.keys(reglas).map(validarCampo);
    if (resultados.includes(false)) return;

    const datos = Object.fromEntries(new FormData(formulario));

    // Simulamos el envío. Aquí iría una llamada real a un servidor
    // o a un servicio como Formspree.
    botonEnviar.disabled = true;
    botonEnviar.textContent = "Enviando...";

    setTimeout(() => {
      console.log("Datos del formulario:", datos);

      mensajeExito.textContent = `¡Gracias, ${datos.nombre}! Recibimos tu mensaje y te responderemos pronto.`;
      mensajeExito.hidden = false;

      formulario.reset();
      botonEnviar.disabled = false;
      botonEnviar.textContent = "Enviar mensaje";
    }, 1000);
  });
});
