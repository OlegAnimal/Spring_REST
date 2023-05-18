$(async function() {
    await thisUser();
});
async function thisUser() {
    fetch("http://localhost:8080/userView")
        .then(res => res.json())
        .then(data => {

            let roles = data.roles.map(role => " " + role.name.substring(5));

            //Добавляем информацию в таблицу
            let user = `$(
            <tr>
                <td>${data.id}</td>
                <td>${data.username}</td>
                <td>${data.age}</td>
                <td>${roles}</td>)`;
            $('#userPanelBody').append(user);
        })
}