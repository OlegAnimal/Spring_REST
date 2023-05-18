'use strict';


let formAddNewUser = document.getElementById('addUserForm');

function createNewUser() {
    let options = formAddNewUser.getElementsByTagName('select')[0].children
    formAddNewUser.addEventListener("submit", ev => {
        ev.preventDefault();
        let roles = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) roles.push({
                id: options[i].value,
                roleName: "ROLE_" + options[i].text
            });
        }

        fetch("http://localhost:8080/admin/api", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formAddNewUser.querySelector('input#addName').value,
                age: formAddNewUser.querySelector('input#addAge').value,
                password: formAddNewUser.querySelector('input#addPassword').value,
                roles: roles
            })
        }).then(() => {
            formAddNewUser.reset();
            $('#home-tab').click();
            allUsers();
        });
    });
}
