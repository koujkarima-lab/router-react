import { useState } from "react";
import axios from "axios";

function AddUser() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [userrs, setUserrs] = useState (null);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("https://jsonplaceholder.typicode.com/users", {
        name: name,
        email: email
      })
      .then(response => {
        console.log(response.data);
        (setMessage("salma"))
        setUserrs(response.sata)

        // setMessage(`Utilisateur ajouté : ${response.data.name} (${response.data.email})`);
        // setName("");
        // setEmail("");  // Bonus: إعادة تعيين الفورم
      })
      .catch(error => console.log(error));
  };
  Const handldelete = (id) => {
    
  }

  return (
    <div>
      <h2>Ajouter un utilisateur</h2>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nom" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Envoyer</button>
      </form>
      <h5>{message}</h5>
      {userrs && (
        <div>
        <h1>{userrs.name}</h1>
        <h1>{userrs.email}</h1>
      </div>
      )}
      {/* {message && <p>{message}</p>} */}
    </div>
  );
}

export default AddUser;
