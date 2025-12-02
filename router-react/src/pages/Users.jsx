import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
    const [Users, setUsers] = useState([]);
    const getUsers = () =>{
         axios.get("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
               setUsers(response.data)
            })
            .catch((err) =>{
                console.log(err)
            });
    }

    useEffect(() => {
       getUsers()
    }, []);

return(
<div>
    {Users.map((User) =>(
    <h1 key = {Users.id}  style={{
    color: "blue",
    fontSize: "28px",
    borderBottom: "2px solid black",
    padding: "10px"
  }}> 
    {User.name} -
    {User.username} -
    {User.email} -
    {User.address.street} -
    </h1>))}
</div>
)
};
export default Users;