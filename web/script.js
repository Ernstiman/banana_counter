var players = document.getElementsByClassName("profile");
var total_count = document.getElementById("total_count");
var submit_banananas_button = document.getElementById("submit_button");
var back_to_login_button = document.getElementById("go_back_to_login");

submit_banananas_button.addEventListener("click", () => {
  for (let player of players) {
    submit_bananas(player);
  }
});

for (let player of players) {
  get_username().then((username) => {
    player.querySelector("#username").innerHTML = username;
    let count_elem = player.querySelector("#count");
    update_banana_count(username, count_elem);
  });
  let sub_button = player.querySelector("#subtract_banana");
  let add_button = player.querySelector("#add_banana");
  add_button.addEventListener("click", () => click(player, true));
  sub_button.addEventListener("click", () => click(player, false));
  back_to_login_button.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

async function get_username() {
  let res = await fetch("/api/me");
  let data = await res.json();
  return data.username;
}

function click(obj, add) {
  let current_count = obj.querySelector("p").innerHTML;
  if (add) current_count++;
  else current_count--;
  obj.querySelector("p").innerHTML = current_count;
}

async function submit_bananas(obj) {
  let parent_div = obj;
  let id = parent_div.id;
  let username = parent_div.querySelector("#username").innerHTML;
  let count = parent_div.querySelector("p").innerHTML;

  await fetch("/api/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ count: Number(count), username: username }),
  });

  await update_banana_count(username, count);
}

async function update_banana_count(username, self) {
  const res = await fetch(`/api/count?username=${username}`);
  const data = await res.json();
  self.innerHTML = data.count;
  total_count.querySelector("h2").innerHTML = data.total_count;
}
