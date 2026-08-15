/* =========================================================
   auth-mock.js — simulação de login/cadastro com localStorage
   (via storage-safe.js). NENHUM dado sai do seu navegador.
   Na versão real, este arquivo é substituído por auth.js,
   que fala de verdade com o Supabase Auth.
   ========================================================= */
const AUTH_KEY = "pellatiero_demo_usuario";

function authMockCadastrar(nome, email) {
  storageSafe.set(AUTH_KEY, JSON.stringify({ nome, email, logadoEm: new Date().toISOString() }));
}

function authMockLogin(email) {
  const nome = email.split("@")[0];
  storageSafe.set(AUTH_KEY, JSON.stringify({ nome, email, logadoEm: new Date().toISOString() }));
}

function authMockUsuarioAtual() {
  const raw = storageSafe.get(AUTH_KEY);
  return raw ? JSON.parse(raw) : null;
}

function authMockSair() {
  storageSafe.remove(AUTH_KEY);
}

function initFormsMock() {
  const formLogin = document.querySelector("#form-login");
  formLogin?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = formLogin.querySelector('[name="email"]').value;
    authMockLogin(email);
    window.location.href = "index.html";
  });

  const formCadastro = document.querySelector("#form-cadastro");
  formCadastro?.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = formCadastro.querySelector('[name="nome"]').value;
    const email = formCadastro.querySelector('[name="email"]').value;
    authMockCadastrar(nome, email);
    window.location.href = "index.html";
  });
}
