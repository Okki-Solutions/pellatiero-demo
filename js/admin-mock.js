/* =========================================================
   admin-mock.js — painel administrativo mockado
   ========================================================= */
function renderAdminTable() {
  const tbody = document.querySelector("#admin-table-body");
  if (!tbody) return;
  tbody.innerHTML = IMOVEIS.map(
    (i) => `<tr>
      <td><img class="mini-thumb" src="${i.imagem}" alt=""></td>
      <td><strong>${i.titulo}</strong><br><span style="color:var(--ink-soft);font-size:12.5px">${i.codigo}</span></td>
      <td><span class="tag ${i.negociacao}">${i.negociacao === "venda" ? "Venda" : "Locação"}</span></td>
      <td>${money(i.preco, i.negociacao).replace(/<small.*?<\/small>/, "")}</td>
      <td>${i.posicao || "—"}</td>
      <td>
        <div class="row-actions">
          <button class="icon-btn" title="Editar">✏️</button>
          <button class="icon-btn" title="Remover">🗑️</button>
        </div>
      </td>
    </tr>`
  ).join("");
}

function initPlacementSelector() {
  const slots = document.querySelectorAll(".placement-slot");
  if (!slots.length) return;
  slots.forEach((slot) =>
    slot.addEventListener("click", () => {
      slots.forEach((s) => s.classList.remove("is-selected"));
      slot.classList.add("is-selected");
    })
  );
}
