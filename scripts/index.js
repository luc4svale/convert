//Cotação de moedas do dia
const USD = 5.97
const EUR = 6.34
const GBP = 7.60


//Obtendo elementos do formulário
const form = document.querySelector("form")
const amount = document.querySelector("#amount")
const currency = document.querySelector("#currency")
const footer = document.querySelector("main footer")
const description = document.querySelector("#description")
const result = document.querySelector("#result")



//Manipulando input amount para aceitar apenas números
amount.oninput = () => {
  const noNumberRegex = /[^0-9]/g;
  amount.value = amount.value.replace(noNumberRegex, "");
}

//Capturando o evento de submit (enviar) do formulário
form.onsubmit = (event) => {
  event.preventDefault();

  switch(currency.value){
    case "USD":
      convertCurrency(amount.value, USD, "US$");
      break;
    case "EUR":
      convertCurrency(amount.value, EUR, "€");
      break;
    case "GBP":
      convertCurrency(amount.value, GBP, "£");
      break;
  }
  
  
}

//Função de conversão de moedas
function convertCurrency(amount, price, symbol){

  try {

    //Validando se o valor digitado é um número
    if(isNaN(amount)){
      throw new Error("Por favor, digite o valor corretamente para converter");
    }

    //Manipulando a descrição da conversão conforme moeda selecionada
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

    //Caculando o valor total convertido
    let total = amount * price;

    //Formatando o valor total para real brasileiro sem o "R$"
    total = formatCurrencyBRL(total).replace("R$", "");

    //Mostrando o valor total
    result.textContent = `${total} Reais`;

    //Adicionando classe que torna o footer visível
    footer.classList.add('show-result');

  } catch (error) {
    //Removendo classe que torna o footer visível
    footer.classList.remove('show-result');

    //Exibindo alerta de erro dinâmico
    alert(`Não foi possível realizar a conversão. ${error.message}`)
  }
  
}

//Formata a moeda para real brasileiro
function formatCurrencyBRL(value){
  return Number(value).toLocaleString('pt-BR', 
    {
      style: "currency",
      currency: "BRL"
    }
  )
}
