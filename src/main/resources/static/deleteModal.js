const id_delete = document.getElementById('deleteId')
const name_delete = document.getElementById('deleteName')
const age_delete = document.getElementById('deleteAge')
let role_delete = document.getElementById('deleteUserRoles')
const deleteForm = document.getElementById('formDeleteUser');

function clearDeleteModalTable() {
    id_delete.value = ''
    name_delete.value = ''
    age_delete.value = ''
    $(role_delete).find('option').remove()
}

function fillDeleteModalTable(id) {
    clearDeleteModalTable()
    $('deleteModal').modal('show');
    getUserById(id).then(user => {
        id_delete.value = `${user.id}`;
        name_delete.value = `${user.name}`;
        age_delete.value = `${user.age}`;
        user.roles.forEach(role => role_delete.add(new Option(role.name.replace("ROLE_", ""))))

    })
}

function deleteUser() {
    deleteForm.addEventListener("submit", ev => {
        ev.preventDefault();
        let id = id_delete.value
        fetch("http://localhost:8080/admin/api/" + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            $('#buttonCloseDelete').click();
            allUsers();
        })
    });
}