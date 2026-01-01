const API_URL = "https://api.baserow.io/api/database/rows/table/763804/?user_field_names=true";
const API_TOKEN = "9if2RRgZA3yBNJ2OExtNtszWOfcb9yeE";

let dadosCompletos = [];

async function carregarDados() {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Token ${API_TOKEN}`
    }
  });

  const json = await res.json();
  dadosCompletos = json.results || [];
  renderizar(dadosCompletos);
}

function renderizar(lista) {
  const container = document.getElementById("lista");
  container.innerHTML = "";

  lista.forEach(r => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <strong>${r.Cogido || ""} | ${r.Nome || ""}</strong>
      <div class="valores">
        Venda: R$ ${r["Valor de vendav"] || ""}<br>
        S/F-M: R$ ${r["Valor Sem F/M"] || ""}<br>
        Compra: R$ ${r["Valor de compra"] || ""}
      </div>
    `;

    container.appendChild(div);
  });
}

function filtrar() {
  const texto = document.getElementById("busca").value.toLowerCase();
  const campo = document.getElementById("campoFiltro").value;

  if (!texto) {
    renderizar(dadosCompletos);
    return;
  }

  const filtrado = dadosCompletos.filter(r =>
    String(r[campo] || "").toLowerCase().includes(texto)
  );

  renderizar(filtrado);
}

document.getElementById("busca").addEventListener("input", filtrar);
document.getElementById("campoFiltro").addEventListener("change", filtrar);

carregarDados();
