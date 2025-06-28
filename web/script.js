

var my_button = document.getElementById("banana_button");
var current_count = document.getElementById("count");

my_button.addEventListener("click", click);

fetch("/count").then((json_data) => json_data.json()).then((data) => current_count.innerHTML = data.count);


async function click(){
    console.log(current_count.innerHTML);
    let banana_count = Number(current_count.innerHTML);
    console.log(banana_count);
    banana_count ++;
    
    await fetch("/", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({count: banana_count})
    })
    const res = await fetch("/count");
    const data = await res.json();
    current_count.innerHTML = data.count;
}