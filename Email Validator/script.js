console.log("This is my script");
const resultCont = document.querySelector("#resultCont");

submitBtn.addEventListener("click", async (e) => {
    e.preventDefault(); 
    console.log("Clicked!");
    resultCont.innerHTML = '<img width="125" src="loading.svg" alt="">'
    
    const email = document.getElementById("username").value;
    console.log(email);

    const key = "ema_live_viGdanJdLBFiFxJaHgJFel0CT2NWg9Ous7CFkspV";
    const url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${(email)}`; 

    try {
        let res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const result = await res.json();
        console.log(result);

        let str = ``;
        for (let key of Object.keys(result)) {
            if (result[key] !== "" && result[key] !== " ") { 
                str += `<div>${key}: ${result[key]}</div>`;
            }
        }

        resultCont.innerHTML = str;
    } catch (error) {
        console.error('Error fetching the email validation:', error);
        resultCont.innerHTML = `<div>Error loading email validation data.</div>`;
    }
});
