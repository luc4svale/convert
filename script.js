const form = document.querySelector('form')
const amountToConvert = form.querySelector('#amount')

amountToConvert.oninput = () => {
  const notDigitsRegex = /\D+/g
  amountToConvert.value = amountToConvert.value.replace(notDigitsRegex, '')
}
