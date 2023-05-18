const id_edit = document.getElementById('idEdit')
const name_edit = document.getElementById('nameEdit')
const age_edit = document.getElementById('ageEdit')

"use strict"

async function getUserById(id) {
    let response = await fetch("http://localhost:8080/admin/api/" + id);
    if (response.ok) {
        return await response.json();
    } else {
        alert(`Error, ${response.status}`)
    }
}

function fillEditModalTable(id) {
    $('editModal').modal('show')
    getUserById(id).then(user => {
            id_edit.value = `${user.id}`;
            name_edit.value = `${user.name}`;
            age_edit.value = `${user.age}`;
        })
}

const formEdit = document.getElementById('formEdit');
editUser();

function editUser() {
    let optionsEdit = formEdit.getElementsByTagName('select')[0].children
    formEdit.addEventListener("submit", ev => {
        ev.preventDefault();
        let roles = [];
        for (let i = 0; i < optionsEdit.length; i++) {
            if (optionsEdit[i].selected) roles.push({
                id: optionsEdit[i].value,
                roleName: "ROLE_" + optionsEdit[i].text
            });
        }

        fetch("http://localhost:8080/admin/api/" + id_edit.value, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: formEdit.querySelector('input#idEdit').value,
                name: formEdit.querySelector('input#nameEdit').value,
                age: formEdit.querySelector('input#ageEdit').value,
                password: formEdit.querySelector('input#passwordEdit').value,
                roles: roles
            })
        }).then(() => {
            $('#closeEdit').click();
            allUsers();
        });
    });
}