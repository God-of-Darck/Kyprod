const API_URL = "https://api.baserow.io/api/database/rows/table/1141235/?user_field_names=true";
//const API_TOKEN = "9if2RRgZA3yBNJ2OExtNtszWOfcb9yeE";
const API_TOKEN = "ygro5VqzDxW6FMIf1WVYw10se06qhjum";

let dadosCompletos = [];

async function carregarDados() {
  dadosCompletos = [];
  let url = API_URL;

  while (url) {
    // 🔥 FORÇA HTTPS (corrige bug do Baserow)
    url = url.replace("http://", "https://");

    const res = await fetch(url, {
      headers: {
        Authorization: `Token ${API_TOKEN}`
      }
    });

    const json = await res.json();

    if (json.results && Array.isArray(json.results)) {
      dadosCompletos.push(...json.results);
    }

    url = json.next; // próxima página
  }

  console.log("Produtos:", dadosCompletos.length);
  renderizar(dadosCompletos);
}



function color(css1, css2) {
  const link = document.getElementById("theme-css");
  const button = document.getElementById("button-color");

  if (link.getAttribute("href") === css1) {
    link.setAttribute("href", css2);
    localStorage.setItem("tema", css2);

    if (button) button.textContent = "Light Mode";
  } else {
    link.setAttribute("href", css1);
    localStorage.setItem("tema", css1);

    if (button) button.textContent = "Dark Mode";
  }
}


function aplicarTemaSalvo() {
  const temaSalvo = localStorage.getItem("tema");
  const link = document.getElementById("theme-css");
  const button = document.getElementById("button-color");

  if (temaSalvo && link) {
    link.href = temaSalvo;

    if (button) {
      if (temaSalvo === "Style.css") {
        button.textContent = "Light Mode";
      } else {
        button.textContent = "Dark Mode";
      }
    }
  }
}

window.addEventListener("load", aplicarTemaSalvo);





function renderizar(lista) {
  const container = document.getElementById("lista");
  container.innerHTML = "";
  
  lista.forEach(r => {
    /*const div = document.createElement("div");
    div.className = "item";*/
    
    const div = document.createElement("div");
    div.className = "item";
    div.style.cursor = "pointer";
    
    div.addEventListener("click", () => {
      window.location.href = `produto.html?id=${r.id}`;
    });
    
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
document.addEventListener("DOMContentLoaded", aplicarTemaSalvo);

carregarDados();
