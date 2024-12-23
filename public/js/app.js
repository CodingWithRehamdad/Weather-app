console.log('the server side page is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const Location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    messageOne.classList.remove('success', 'error');
    messageTwo.classList.remove('success', 'error');

    fetch('http://localhost:4000/weather?address=' + Location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error

                messageOne.classList.add('error');
            } else {

                messageOne.textContent = data.Location
                messageTwo.textContent = data.forecast
                messageOne.classList.add('success');
                messageTwo.classList.add('success');
            }
        })
    })
})