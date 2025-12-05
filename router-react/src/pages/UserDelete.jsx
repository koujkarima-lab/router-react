import { useEffect, useState } from "react";
import axios from "axios";

function DeleteUsers() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id)); // نحذف من الواجهة
        alert("Utilisateur supprimé !");
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Liste des utilisateurs</h2>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}

            <button onClick={() => deleteUser(user.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DeleteUsers;
