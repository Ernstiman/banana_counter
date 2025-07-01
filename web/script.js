// var my_button = document.getElementById("banana_button");
// var current_count = document.getElementById("count");
var players = document.getElementsByClassName("profile");
var total_count = document.getElementById("total count");

for (let player of players) {
  let button = player.querySelector("button");
  let count = player.querySelector("p");
  button.addEventListener("click", (e) => click(e));
  update_banana_count(player.id, count);
}

async function click(e) {
  let clicked_button = e.currentTarget;
  let parent_div = clicked_button.parentElement;
  let id = parent_div.id;
  let username = parent_div.querySelector("H2");
  let count = parent_div.querySelector("p");

  await fetch("/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ count: count, id: id }),
  });

  await update_banana_count(id, count);
}

async function update_banana_count(id, self) {
  const res = await fetch(`/count?id=${id}`);
  const data = await res.json();
  self.innerHTML = data.count;
  total_count.querySelector("h2").innerHTML = data.total_count;
}
