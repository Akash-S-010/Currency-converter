const dropDown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".exchange-btn");

// ------Accessing the whole country list in options----
for (let select of dropDown){
    for(currCode in countryList){
        let option = document.createElement("option");
        option.innerText = currCode;
        option.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            option.selected = "selected";
        }else if(select.name === "to" && currCode === "INR"){
            option.selected = "selected";
        }
        select.append(option);
    }
    select.addEventListener('change', (evt) =>{
        updateFlag(evt.target);
    })
}

// ----Setting the flag image -----
const updateFlag =(element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let flagSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img")
    img.src = flagSrc;
}

btn.addEventListener('click',(e) => {
    e.preventDefault();
    let amountBox = document.querySelector(".amount input");
    let amount = amountBox.value;
    if(amount === "" || amount<1){
        alert("Enter Amount")
    }
})