// import React, { useEffect, useState} from 'react';
// import axios from 'axios';

// const UserPut = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] =useState(true);
//     const [error, setError] = useState(nul);
    
//     useEffect(() => )
//   return (
//     <div>UserPut</div>
//   )
// }

// export default UserPut

// Save this as UsersCrud.jsx and import it in your app (e.g. <UsersCrud />)
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "https://jsonplaceholder.typicode.com/users";

export default function UsersCrud() {
  // State: list of users, form fields, which user we are editing, and loading flags
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", city: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 1) Fetch users on mount (GET)
  useEffect(() => {
    let cancelled = false;
    async function loadUsers() {
      try {
        const res = await axios.get(API_BASE);
        if (!cancelled) {
          setUsers(res.data);
        }
      } catch (err) {
        console.error("Failed to load users:", err);
        alert("Could not load users. Check console for details.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadUsers();
    return () => {
      cancelled = true;
    };
  }, []);

  // 2) When click "Edit" -> fill the form with that user's values and set editingId
  function handleEditClick(user) {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      city: (user.address && user.address.city) || "",
    });
    setEditingId(user.id);
    window.scrollTo({ top: 0, behavior: "smooth" }); // optional: bring form into view
  }

  // 3) Controlled form inputs update local formData state
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  // 4) Submit form: if editingId is set -> send PUT to API, update local users, show alert, reset form
  async function handleSubmit(e) {
    e.preventDefault();
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Please enter a name and an email.");
      return;
    }
    if (!editingId) {
      alert("No user selected for editing.");
      return;
    }

    setSaving(true);
    try {
      // Build payload: include updated fields and keep structure for address.city
      const payload = {
        name: formData.name,
        email: formData.email,
        address: { city: formData.city },
      };

      // Send PUT request
      const res = await axios.put(`${API_BASE}/${editingId}`, payload);

      // JSONPlaceholder returns the new object. We treat it as the updated user.
      const updatedUserFromServer = res.data;

      // Update local users state immutably:
      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.id === editingId
            ? {
                ...u,
                // merge server response but keep other fields that might exist
                ...updatedUserFromServer,
                // ensure address structure contains old fields plus new city
                address: { ...(u.address || {}), ...(updatedUserFromServer.address || {}), city: payload.address.city },
              }
            : u
        )
      );

      alert("User updated successfully!");
      // Bonus: reset form and editing state
      setFormData({ name: "", email: "", city: "" });
      setEditingId(null);
    } catch (err) {
      console.error("PUT failed:", err);
      alert("Failed to update user. See console for details.");
    } finally {
      setSaving(false);
    }
  }

  // 5) Option: Cancel editing (resets form)
  function handleCancel() {
    setFormData({ name: "", email: "", city: "" });
    setEditingId(null);
  }

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h2>{editingId ? `Edit User #${editingId}` : "Pick a user to edit"}</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ padding: 12, border: "1px solid #ddd", borderRadius: 6 }}>
        <div style={{ marginBottom: 8 }}>
          <label>
            Name: <br />
            <input name="name" value={formData.name} onChange={handleChange} style={{ width: "100%", padding: 8 }} />
          </label>
        </div>

        <div style={{ marginBottom: 8 }}>
          <label>
            Email: <br />
            <input name="email" value={formData.email} onChange={handleChange} style={{ width: "100%", padding: 8 }} />
          </label>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            City: <br />
            <input name="city" value={formData.city} onChange={handleChange} style={{ width: "100%", padding: 8 }} />
          </label>
        </div>

        <div>
          <button type="submit" disabled={saving} style={{ padding: "8px 12px", marginRight: 8 }}>
            {saving ? "Saving..." : editingId ? "Save Changes" : "Select a user first"}
          </button>
          <button type="button" onClick={handleCancel} disabled={saving} style={{ padding: "8px 12px" }}>
            Cancel
          </button>
        </div>
      </form>

      {/* Users list */}
      <h3 style={{ marginTop: 20 }}>Users</h3>
      {loading ? (
        <p>Loading users…</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #eee" }}>ID</th>
              <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #eee" }}>Name</th>
              <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #eee" }}>Email</th>
              <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #eee" }}>City</th>
              <th style={{ padding: 8, borderBottom: "1px solid #eee" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ background: editingId === u.id ? "#fcf8e3" : "transparent" }}>
                <td style={{ padding: 8 }}>{u.id}</td>
                <td style={{ padding: 8 }}>{u.name}</td>
                <td style={{ padding: 8 }}>{u.email}</td>
                <td style={{ padding: 8 }}>{u.address?.city || ""}</td>
                <td style={{ padding: 8 }}>
                  <button onClick={() => handleEditClick(u)} style={{ padding: "6px 10px" }}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
