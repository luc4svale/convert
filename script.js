const form = document.querySelector('form')
const amountToConvert = form.querySelector('#amount')
const currency = form.querySelector('#currency')

amountToConvert.oninput = () => {
  const notDigitsRegex = /\D+/g
  amountToConvert.value = amountToConvert.value.replace(notDigitsRegex, '')
}

form.onsubmit = async (event) => {
  event.preventDefault()

  if (isNaN(amountToConvert.value)) {
    return alert('Não foi possível realizar a conversão. Por favor, informe um valor válido.')
  }

  const validCurrencies = ['USD', 'EUR', 'GBP']
  if (!validCurrencies.includes(currency.value)) {
    return alert('Não foi possível realizar a conversão. Por favor, escolha uma moeda válida.')
  }
}
