const form = document.querySelector('form')
const amountToConvert = form.querySelector('#amount')
const currency = form.querySelector('#currency')

const footer = document.querySelector('footer')
const footerDescription = footer.querySelector('#description')
const footerResult = footer.querySelector('#result')

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

  const currencySymbol = getCurrencySymbol(currency.value)
  const rate = await getExchangeRate(currency.value)
  const amountConverted = Number(amountToConvert.value) * rate

  return showConversionResult(currencySymbol, rate, amountConverted)
}


function getCurrencySymbol(currency) {
  let symbol

  switch (currency) {
    case 'USD':
      symbol = 'US$'
      break
    case 'EUR':
      symbol = '€'
      break
    case 'GBP':
      symbol = '£'
      break
  }

  return symbol
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

function showConversionResult(currencySymbol, rate, convertedValue) {
  footerDescription.textContent = `${currencySymbol} 1 = ${formatToBRLCurrencyStyle(rate)}`
  footerResult.textContent = `${formatToBRLCurrencyStyle(convertedValue).replace('R$', '')} Reais`

  footer.classList.add('show-result')
}

function formatToBRLCurrencyStyle(value) {
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2
  })
}