var login_container = document.getElementById("login container");
var login_button = login_container.querySelector("#login");
var create_profile_button = login_container.querySelector("#create_profile");
var login_msg = login_container.querySelector("#login_msg")
login_button.addEventListener("click", () => {
  login(true);
});
create_profile_button.addEventListener("click", () => {
  login(false);
});

async function login(con) {
  let username = login_container.querySelector("#username").value;
  let password = login_container.querySelector("#password").value;
  let res = await fetch(`/api/login/post?login=${con}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  });
  res = await res.json();
  if (res.success && con) {
    window.location.href = "main.html";
  } else {
    login_container.querySelector("#username").value = "";
    login_container.querySelector("#password").value = "";
    login_msg.innerHTML = res.message;
  }
}
