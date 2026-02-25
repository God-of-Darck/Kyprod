async function carregarProduto() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) return;

    const res = await fetch(
        `https://api.baserow.io/api/database/rows/table/763804/${id}/?user_field_names=true`,
        {
            headers: {
                Authorization: `Token ${API_TOKEN}`
            }
        }
    );

    const r = await res.json();

    document.getElementById("nomeProduto").textContent = r.Nome || "";
    document.getElementById("codigoProduto").textContent = r.Cogido || "";
    document.getElementById("vendaProduto").textContent = r["Valor de vendav"] || "";
    document.getElementById("sfmProduto").textContent = r["Valor Sem F/M"] || "";
    document.getElementById("compraProduto").textContent = r["Valor de compra"] || "";

    const imgElement = document.getElementById("imagemProduto");

    if (r.Imagem && Array.isArray(r.Imagem) && r.Imagem.length > 0) {
        imgElement.src = r.Imagem[0].url;
        imgElement.style.display = "block";
    } else {
        imgElement.style.display = "none";
    }
}

function voltar() {
    window.history.back();
}

carregarProduto();