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

  const rate = await getExchangeRate(currency.value)
}

async function getExchangeRate(currency) {

  try {
    const response = await fetch(`https://economia.awesomeapi.com.br/last/${currency}-BRL`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })

    const data = await response.json()
    const currencyKey = `${currency}BRL`
    const rate = Number(data[currencyKey].bid)

    return rate

  } catch {
      alert('Não foi possível realizar a conversão. Por favor, tente novamente mais tarde.')
      window.location.reload()
  }
}
