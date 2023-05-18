$(async function() {
    await allUsers();
});
const table = $('#tbodyAllUserTable');
async function allUsers() {
    table.empty()
    fetch("http://localhost:8080/admin/api/")
        .then(res => res.json())
        .then(data => {
            data.forEach(user => {
                let tableWithUsers = `$(
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.username}</td>           
                            <td>${user.age}</td>
                            <td>${user.roles.map(role => " " + role.name.substring(5))}</td>
                                             
                                               <!--Кнопка редактирования Edit-->
                                    <td>
                                        <button type="button" class="btn btn-info" data-toggle="modal" 
                                        data-target="#editModal" onclick="fillEditModalTable(${user.id})">Edit
                                        </button>

                                    </td>

                                                            <!--Кнопка удаления Delete-->
                                    <td>
                                        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal"
                                        onclick="fillDeleteModalTable(${user.id})">Delete
                                        </button>
                                    </td>
                        </tr>)`;
                table.append(tableWithUsers);
            })
        })
}