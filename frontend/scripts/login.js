document.getElementById("loginForm").addEventListener("submit", async function (event) {
  event.preventDefault(); // Previene el envío tradicional del formulario

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost/Actividad_Unidad_4/backend/panther/rest/useraction/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: email,
        password: password
      })
    });

    const data = await response.json();
      if (response.ok && data.code === 200) {
      const keyAPI = data.data.keyAPI;
      const nombreUsuario = data.data.user;
      localStorage.setItem("KeyAPI", keyAPI);
      localStorage.setItem("nombreUsuario", nombreUsuario);
      //---------------------------------------------------------
             // login: API externa de ClariSACloud
      //---------------------------------------------------------      
      const loginExterno = await fetch("https://pru.clarisacloud.com:8443/seguridad/rest/api/v1/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario: "Demo_api",
          contrasenia: "12345678"
        })
      });

      if (!loginExterno.ok) throw new Error("Error al hacer login en ClariSACloud");
      //------------- Guardar token clarisa ---------------------------
      const datosExternos = await loginExterno.json();
      const clarisaToken = datosExternos.data.token; 
      localStorage.setItem("clarisaToken", clarisaToken);

      alert("¡Inicio de sesión exitoso!");
      setTimeout(() => {
      window.parent.postMessage("loginSuccess", "*");
      }, 500);
    } else {
      alert("Error al iniciar sesión \n Correo o contraseña incorrectors");
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("message").innerText = "Error de red o del servidor.";
  }
});
