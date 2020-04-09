//create variables to grab
// const currencyEl_one = document.getElementById('currency-one');
// const currencyEl_one = $("#currency_one");
// const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// called on everything! Fetch exchange rates and update the DOM
function calculate() {
  // console.log("CHANGE");
  // const currency_one = currencyEl_one.value; //take the value available in the select tag
  const currency_one = $("#currency-one").val();

  const currency_two = $("#currency-two").val();

  //Use exchangeRate-API
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`) //gives promise background
    .then(res => res.json())
    .then(data => {
       console.log(data);
      const rate = data.rates[currency_two];
      // console.log(rate);

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`; //For displaying the current rate

      amountEl_two.value = (amountEl_one.value*rate).toFixed(2); //toFixed method is for 2 decimal places
    });
}

//Event listeners
// currencyEl_one.addEventListener('change', calculate);
$('#currency-one').on('change', calculate);
$('#currency-two').on('change', calculate);
amountEl_one.addEventListener('input', calculate);
amountEl_two.addEventListener('input', calculate);
swap.addEventListener('click', () => { //how to update select2?
  const fromcurrency =  $('#currency-one').val(); //Change with Jquery
  const tocurrency = $('#currency-two').val();
  $('#currency-one').val(tocurrency).trigger('change');
  $('#currency-two').val(fromcurrency).trigger('change');
  calculate();
})

calculate();
