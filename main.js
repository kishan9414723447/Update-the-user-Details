let container = document.getElementById("container");
let submitItem = document.getElementById("submitBtn");

window.addEventListener("DOMContentLoaded", myOnloadFun);

async function getData() {
  let res = await axios.get(
    "https://crudcrud.com/api/19abd7d036ea4927bed1c154f9748761/appointmentData"
  );
  return res;
}
// console.log(getData().then(resl => console.log(resl)));

function showDetails(userName, userEmail, userPhone, id) {
  var li = document.createElement("li");
  var textNode = document.createTextNode(
    `${userName}-${userEmail}-${userPhone}`
  );
  var button = document.createElement("button");
  var deleteText = document.createTextNode("Delete");
  var span = document.createElement("span");
  var editBtn = document.createElement("button");
  var editText = document.createTextNode("EDIT");

  li.appendChild(textNode);
  button.appendChild(deleteText);
  editBtn.appendChild(editText);
  span.appendChild(li);
  span.appendChild(button);
  span.appendChild(editBtn);
  container.appendChild(span);

  button.addEventListener("click", (e) => deleteFun(e, button, id));
  editBtn.addEventListener("click", (e) =>
    editFun(e, editBtn, userName, userEmail, userPhone, id)
  );
}

function myOnloadFun() {
  getData().then((res) => {
    for (let i = 0; i < res.data.length; i++) {
      var userName = res.data[i].name;
      var userEmail = res.data[i].Email;
      var userPhone = res.data[i].Age;
      var id = res.data[i]._id;
      showDetails(userName, userEmail, userPhone, id);
    }
  });
}

submitItem.addEventListener("click", (e) => {
  e.preventDefault();
  // console.log("click");
  let userName = document.getElementById("name").value;
  let userEmail = document.getElementById("email").value;
  let userPhone = document.getElementById("phone").value;

  let userObj = {
    name: userName,
    Email: userEmail,
    Age: userPhone
  };
  
  axios
    .post(
      "https://crudcrud.com/api/19abd7d036ea4927bed1c154f9748761/appointmentData",
      userObj
    )
    .then((temp) => showDetails(userName, userEmail, userPhone, temp.data._id))
    .catch((err) => console.log(err));
});

function deleteFun(e, button, myid) {
  e.preventDefault();
  var parentEle = button.parentElement;
  parentEle.remove();
  axios
    .delete(
      `https://crudcrud.com/api/19abd7d036ea4927bed1c154f9748761/appointmentData/${myid}`
    )
    .catch((err) => console.error(err));
}

function editFun(e, editBtn, userName, userEmail, userPhone, myid) {
  e.preventDefault();
  document.getElementById("name").value = userName;
  document.getElementById("email").value = userEmail;
  document.getElementById("phone").value = userPhone;

  userName = document.getElementById("name").value;
  userEmail = document.getElementById("email").value;
  userPhone = document.getElementById("phone").value;
}

