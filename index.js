const inputItem = document.getElementById('inputItem');
const inputQuantidade = document.getElementById('inputQuantidade');
const inputPreco = document.getElementById('inputPreco');
const btAdicionar = document.getElementById('btAdicionar');
const btLimpar = document.getElementById('btLimpar');
const tableNew = document.getElementById('tableBody');
const totalPreco = document.getElementById('totalPreco');

let objectItens = [];

const redesenhaLista = (objectItens) => {
  tableNew.innerHTML = '';

  for (let index = 0; index < objectItens.length; ++index) {
    const item = objectItens[index];
    const tabelaTr = document.createElement('tr');
    const tabelaItem = document.createElement('th');
    const tabelaQuantidade = document.createElement('th');
    const tabelaPreco = document.createElement('th');

    tabelaItem.textContent = item.desc;
    tabelaQuantidade.textContent = item.qnt;
    tabelaPreco.textContent = item.preco;

    tabelaTr.appendChild(tabelaItem);
    tabelaTr.appendChild(tabelaQuantidade);
    tabelaTr.appendChild(tabelaPreco);
    tableNew.appendChild(tabelaTr);
  }
};

const calcularTotal = () => {
  let total = 0;
  for (let i = 0; i < objectItens.length; i++) {
    const quantidade = parseInt(objectItens[i].qnt);
    const preco = parseFloat(objectItens[i].preco.replace('R$ ', '').replace(',', '.'));
    total += quantidade * preco;
  }
  return total.toFixed(2).replace('.', ',');
}

const handleBtAdicionarClick = () => {
  const item = inputItem.value;
  const quantidade = inputQuantidade.value;
  let preco = inputPreco.value;
  if (!item) {
    alert('Necessário digitar um item!');
    return;
  } else if (!quantidade) {
    alert('Necessário digitar a quantidade!');
    return;
  } else if (!preco) {
    alert('Necessário digitar o preço!');
    return;
  }

  inputItem.value = '';
  inputQuantidade.value = '';
  inputPreco.value = '';
  inputItem.focus();

  preco = parseFloat(preco).toFixed(2).replace('.', ',');
  preco = `R$ ${preco}`;

  objectItens.push({
    desc: item,
    qnt: quantidade,
    preco: preco,
  });

  redesenhaLista(objectItens);
  const total = calcularTotal(); 
  totalPreco.textContent = total;
};

const handleBtLimparClick = () => {
  objectItens = [];
  redesenhaLista(objectItens);
  inputItem.focus();
  totalPreco.textContent = '';
};

btAdicionar.onclick = handleBtAdicionarClick;
btLimpar.onclick = handleBtLimparClick;
