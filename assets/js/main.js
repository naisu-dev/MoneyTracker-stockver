(async()=>{
  const next = document.getElementById("next");

  const data = await fetch("https://api.taka.cf/v1/money")
    .then(res=>res.json());

  data.data.sort((m1,m2)=>m2.amount - m1.amount);

  let count = 10;
  addRank(data.data,0,count);

  next.addEventListener("click",async()=>{
    addRank(data.data,count,count+10);
    count += 10;
  })
})();

async function addRank(data,start,end){
  const rank = document.querySelector(".rank");

  const money = data.slice(start,end);
  for(let i = 0;i < money.length;i++){
    const user = await fetchUser(money[i].id);
    await sleep(100);

    rank.insertAdjacentHTML("beforeend",
      `<div class="card mb-3">
        <div class="card-header"><strong>${i+start+1}位</strong></div>
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${user?.avatarURL||"https://cdn.discordapp.com/embed/avatars/0.png"}" class="icon" height="80">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h2 class="card-title"><strong>${user?.tag||"不明なユーザー"} - ${money[i].amount} 円</strong></h2>
              </div>
            </div>
        </div>
      </div>`
    )
  }
}

async function fetchUser(id){
  const data = await fetch(`https://api.taka.cf/v1/discord/user?id=${id}`)
    .then(res=>res.json())
    .catch(()=>{});

  return data.data;
}

function sleep(ms){
  return new Promise(resolve=>setTimeout(resolve,ms));
}