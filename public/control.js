let users = [];
let list = document.getElementById('list');



let xhttp = new XMLHttpRequest();
xhttp.open("GET", "http://localhost:3005/api/users", false);
xhttp.onload = function() {
    users = JSON.parse(this.responseText);
    console.log(users);
    if (this.readyState == 4 && this.status == 200) {



        users.filter((u, i) => i < 10).forEach(user => {
            list.innerHTML += `
                <li class="list-group-item clearfix" style="
                  width: 400px;
                  border: 3px dotted rgb(120, 238, 42);
                  background-color: rgba(60, 120, 120, 0.97);
                  margin-bottom: 15px;
                ">
                    <div class="float-left mr-auto">
                        <h4 class="list-group-item-heading">${user.first_name} ${user.last_name}</h4>
                    </div>
                    <span class="float-right ml-auto">
                  <p class="list-group-item-text">${user.email}</p>
                </span>
                </li>`
        });
    }
};

xhttp.send();