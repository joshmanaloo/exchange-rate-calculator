//create variables to grab
// const currencyEl_one = document.getElementById('currency-one');
// const currencyEl_one = $("#currency_one");
// const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');
const clear = document.getElementById('clear');

// called on everything! Fetch exchange rates and update the DOM
function calculate() {
  // console.log("CHANGE");
  // const currency_one = currencyEl_one.value; //take the value available in the select tag
  const currency_one = $("#currency-one").val();

  const currency_two = $("#currency-two").val();

  amountEl_one.value = (parseFloat(amountEl_one.value.replace(/,/g, ''))).toLocaleString();  //add commas on values
  oneNumber = parseFloat(amountEl_one.value.replace(/,/g, ''));  //var for calculations.. Remove's commas and returns number


  //Use exchangeRate-API
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`) //gives promise background
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const rate = data.rates[currency_two];
      // console.log(rate);

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`; //For displaying the current rate

      //Calculate for amount two then return a string with commas and decimal to 2 places
      amountEl_two.value = (Number(oneNumber * rate)).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    });

}


//Event listeners
// currencyEl_one.addEventListener('change', calculate);
$('#currency-one').on('change', calculate);
$('#currency-two').on('change', calculate);
amountEl_one.addEventListener('input', calculate);
amountEl_two.addEventListener('input', calculate);
clear.addEventListener('click', () =>{
  amountEl_one.value = "0";
  amountEl_two.value = "0";
  calculate();
});
swap.addEventListener('click', () => { //how to update select2?
  const fromcurrency = $('#currency-one').val(); //Change with Jquery
  const tocurrency = $('#currency-two').val();
  $('#currency-one').val(tocurrency).trigger('change');
  $('#currency-two').val(fromcurrency).trigger('change');
  calculate();
})

calculate();
