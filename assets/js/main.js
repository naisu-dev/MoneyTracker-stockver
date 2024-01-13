(async()=>{
    let money = await fetch("https://api.taka.cf/v1/money")
        .then(res=>res.json());

    money = money.sort((m1,m2)=>m1.mount - m2.mount);
})();