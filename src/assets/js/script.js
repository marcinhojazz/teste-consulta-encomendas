const inputSearch = document.querySelector(".input-search");
const submitSearch = document.querySelector(".input-submit");
const resultContent = document.querySelector(".result-content");

const getData = async () =>
  await fetch("mocks/dados.json", {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  }).then((item) => item.json());

submitSearch.addEventListener("click", async function () {
  const jsonData = await getData();
  const resultData = jsonData?.encomendas?.find(
    (e) => e?.id === Number(inputSearch.value)
  );

  if (!!resultData) {
    resultContent.innerHTML = `
      <div class="list-results">
        <p class="results">${resultData?.cliente?.id} - ${resultData?.cliente?.nome}</p>
        <p class="results">R$ ${resultData?.valor},00</p>
      </div>
      <div class="list-results">
        <p class="results">
          ${
            resultData?.data
              ? new Intl.DateTimeFormat("pt-BR").format(new Date(resultData?.data))
              : "Sem data"
          }
        </p>
        <p class="results">${resultData?.entregue ? "Entregue" : "Entregar"}</p>
      </div>
    `;
  } else {
    resultContent.innerHTML = '<p class="error">Encomenda não encontrada</p>';
  }
});
