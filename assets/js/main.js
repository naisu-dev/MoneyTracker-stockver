(async()=>{
  const data = await fetch("https://api.taka.cf/v1/money")
    .then(res=>res.json());

  let money = data.data.toSorted((m1,m2)=>m2.amount - m1.amount);

  money.length = 10

  money = await Promise.all(money.map(async(money,i)=>{
    const user = await fetchUser(money.id);

    return `<div class="card mb-3">
      <div class="card-header">${i+1}位</div>
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${user.avatarURL}" class="icon" height="80">
          </div>
            <div class="col-md-8">
              <div class="card-body">
                <h2 class="card-title"><strong>${user.tag} - ${money.amount} 円</strong></h2>
              </div>
            </div>
        </div>
      </div>`
  }));

    const rank = document.querySelector(".rank");

    rank.insertAdjacentHTML("beforeend",money.join(""));
})();

async function fetchUser(id){
  const data = await fetch(`https://api.taka.cf/v1/discord/user?id=${id}`)
    .then(res=>res.json())
    .catch(()=>{});

  return data.data;
}