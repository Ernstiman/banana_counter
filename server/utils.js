
function rövarencrypt(pass) {
  let kons = [
    "q",
    "w",
    "r",
    "t",
    "p",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
  ];
  let new_pass = "";
  let i = 0;
  for (let letter of pass) {
    letter = String(letter);
    if (kons.includes(letter.toUpperCase()) || kons.includes(letter)) {
      new_pass += letter + "o" + letter;
      continue;
    }
    new_pass += letter;
    i++;
  }
  return new_pass;
}

function error(err, res) {
  console.log(err)
  return res.status(500).json("Something went wrong err: ", err);
}

module.exports = {rövarencrypt, error}