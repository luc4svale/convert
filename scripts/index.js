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
    description.textContent = `${symbol} 1 = R$ ${price}`;

    //Adicionando a classe que torna o footer visível
    footer.classList.add('show-result');
  } catch (error) {
    footer.classList.remove('show-result');
    console.log(error)
    alert("Não foi possível realizar a conversão. Por favor, tente novamente mais tarde")
  }
  
}
