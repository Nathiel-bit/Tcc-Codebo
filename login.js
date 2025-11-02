var botaoEntrar = document.querySelector("#entrar-btn");
var botaoCadastrar = document.querySelector("#cadastrar-btn");

var corpo = document.querySelector("body");

if (botaoEntrar) {
  botaoEntrar.addEventListener("click", function () {
    corpo.className = "entrar-js";
  });
}

if (botaoCadastrar) {
  botaoCadastrar.addEventListener("click", function () {
    corpo.className = "cadastrar-js";
  });
}
