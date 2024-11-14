const dropDown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".exchange-btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const finalMsg = document.querySelector(".message");
let loader = document.querySelector(".loader");

// ------Accessing the whole country list in options----
for (let select of dropDown) {
    for (currCode in countryList) {
        let option = document.createElement("option");
        option.innerText = currCode;
        option.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            option.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            option.selected = "selected";
        }
        select.append(option);
    }
    select.addEventListener('change', (evt) => {
        updateFlag(evt.target);
    })
}

// ----Setting the flag image -----
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let flagSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img")
    img.src = flagSrc;
}

// ---Function perform when exchange btn clicks---
btn.addEventListener('click', async (e) => {
    e.preventDefault();
    let amountBox = document.querySelector(".amount input");
    let amount = amountBox.value;
    if (amount === "" || amount < 1) {
        alert("Enter Amount")
    }

    const URL = `https://v6.exchangerate-api.com/v6/6fcdc7386390fad2aed5d9e5/pair/${fromCurr.value}/${toCurr.value}`;
    loader.style.display = "block";
    finalMsg.innerText = "";
    const response = await fetch(URL);
    const data = await response.json()
    loader.style.display = "none"
    const conversionRate = data.conversion_rate;
    const finalAmount = amount * conversionRate;

    finalMsg.innerText = `${amount} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
    
})