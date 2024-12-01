//Cotação de moedas do dia
const USD = 5.97
const EUR = 6.34
const GBP = 7.60


//Obtendo elementos do formulário
const form = document.querySelector("form");
const amount = document.querySelector("#amount");
const currency = document.querySelector("#currency");



//Manipulando input amount para aceitar apenas números
amount.oninput = () => {
  const noNumberRegex = /[^0-9]/g;
  amount.value = amount.value.replace(noNumberRegex, "");
}

