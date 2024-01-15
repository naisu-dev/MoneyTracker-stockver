(async()=>{
  const rank = document.querySelector(".rank");
  const next = document.getElementById("next");

  const data = await fetch("https://api.taka.cf/v1/money")
    .then(res=>res.json());

  data.data.sort((m1,m2)=>m2.amount - m1.amount);

  let count = 10;
  const money = await getHtml(data.data,0,count);

  rank.insertAdjacentHTML("beforeend",money.join(""));

  next.addEventListener("click",async()=>{
    const money = await getHtml(data.data,count,count+10);
    count += 10;
    rank.insertAdjacentHTML("beforeend",money.join(""));
  })
})();

async function getHtml(data,start,end){
  return await Promise.all(data.slice(start,end).map(async(money,i)=>{
    const user = await fetchUser(money.id);

    return `<div class="card mb-3">
      <div class="card-header"><strong>${i+start+1}位</strong></div>
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
}

async function fetchUser(id){
  const data = await fetch(`https://api.taka.cf/v1/discord/user?id=${id}`)
    .then(res=>res.json())
    .catch(()=>{});

  return data.data;
}