document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.clear();  // Elimina token y nombre
  window.location.href = "index.html";  // O donde esté tu login
});

let inactivityTime = () => {
  let timer;

  function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      alert("Sesión cerrada por inactividad.");
      localStorage.clear();
      window.location.href = "index.html";  // O tu página de login
    }, 600000); // 10 minutos
  }

  // Eventos que reinician el temporizador
  window.onload = resetTimer;
  document.onmousemove = resetTimer;
  document.onkeypress = resetTimer;
  document.onclick = resetTimer;
  document.onscroll = resetTimer;
};

inactivityTime();
