console.log("✅ app.js cargado correctamente");

document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault(); 

  // los  valores
  const nombres = document.getElementById("nombres").value.trim();
  const apellidos = document.getElementById("apellidos").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();
  const confirmacion = document.getElementById("confirmacion");

  // Validaciones
  if (!nombres || !apellidos || !correo || !telefono || !mensaje) {
    confirmacion.textContent = "Por favor completa todos los campos.";
    confirmacion.style.color = "red";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    confirmacion.textContent = "El correo no es válido.";
    confirmacion.style.color = "red";
    return;
  }

  if (!/^[0-9]{6,15}$/.test(telefono)) {
    confirmacion.textContent = "El teléfono debe tener entre 6 y 15 dígitos.";
    confirmacion.style.color = "red";
    return;
  }

  // Crear objeto con los datos
  const datos = { nombres, apellidos, correo, telefono, mensaje };

  // para enviar a json-server
  fetch("http://localhost:3000/contactos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  })
    .then(res => res.json())
    .then(data => {
      confirmacion.textContent = "¡Formulario enviado correctamente!";
      confirmacion.style.color = "lightgreen";
      document.getElementById("contactForm").reset(); // Limpia el formulario
    })
    .catch(err => {
      confirmacion.textContent = "Error al enviar los datos.";
      confirmacion.style.color = "red";
      console.error(err);
    });
});
