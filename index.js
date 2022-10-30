const bill = document.querySelector("#user-bill");
const numberOfPerson = document.querySelector("#user-number");
const tips = document.querySelectorAll(".tips");
const tipPerPerson = document.querySelector("#tipPerson");
const totalPerPerson = document.querySelector("#totalPerson");
const botones = document.querySelector(".button-interactive");
const tipCustom = document.querySelector("#custom");
const resetBtn = document.querySelector(".button-reset");
const menssageError = document.querySelector(".insert-zero");

bill.addEventListener("input", billInput);
numberOfPerson.addEventListener("input", peopleInput);
tips.forEach(function (val) {
  val.addEventListener("click", handleClick);
});
tipCustom.addEventListener("input", calculateCustom);
resetBtn.addEventListener("click", resetFunction);

//valores iniciales
bill.value = "";
numberOfPerson.value = "";
tipPerPerson.innerHTML = "$" + (0.0).toFixed(2);
totalPerPerson.innerHTML = "$" + (0.0).toFixed(2);

let billValue = 0.0;
let tipValue = 0.15;
let peopleValue = 1;

//1. Recibimos el valor total ingresado para calcular propina

function billInput() {
  billValue = parseFloat(bill.value);
  calculateTip();
}

//3.Recibimos el numero de personas para calcular propinas, ingresamos un mensaje de advertencia si el numero de personas es igual a 0

function peopleInput() {
  peopleValue = parseFloat(numberOfPerson.value);
  if (peopleValue < 1) {
    menssageError.classList.add("is-warn");
    numberOfPerson.style.border = "thick solid red";
  } else {
    menssageError.classList.remove("is-warn");
    numberOfPerson.style.border = "none";
  }
  calculateTip();
}
// 2. Destacamos el porcentaje de propina seleccionado y recibimos su equivalente.

function handleClick(event) {
  tips.forEach(function (val) {
    val.classList.remove("active-tip");
    //usará event.target para obtener el elemento del clic y destacarlo.
    if (event.target.innerHTML == val.innerHTML) {
      val.classList.add("active-tip");
      //Que el valor agregado en HTML lo analice la funcion parseFloat y devuelva el valor para despues dividirlo.
      tipValue = parseFloat(val.innerHTML) / 100;
    }
  });
  calculateTip();
}

//2.1 recibiendo el monto de propina ingresado por el usuario para convertirlo.

function calculateCustom() {
  tipValue = parseFloat(tipCustom.value / 100);
  calculateTip();
}

//4.calculamos el monto de propina a pagar respecto al monto ingresado

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let total = (billValue + tipAmount) / peopleValue;
    tipPerPerson.innerHTML = "$" + tipAmount.toFixed(2);
    totalPerPerson.innerHTML = "$" + total.toFixed(2);
  }
}

//4. Reiniciamos la app
function resetFunction() {
  bill.value = "";
  numberOfPerson.value = "";
  tipPerPerson.innerHTML = "$" + (0.0).toFixed(2);
  totalPerPerson.innerHTML = "$" + (0.0).toFixed(2);
}
