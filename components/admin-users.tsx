import React, { useEffect, useState } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  full_name?: string;
  phone?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

interface FormData {
  username: string;
  email: string;
  password?: string;
  role: string;
  full_name: string;
  phone: string;
  status: string;
}

const initialFormData: FormData = {
  username: "",
  email: "",
  password: "",
  role: "",
  full_name: "",
  phone: "",
  status: "active",
};

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({ ...initialFormData });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openAddModal = () => {
    setEditingUser(null);
    setFormData({ ...initialFormData });
    setShowModal(true);
    setError(null);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({
      username: user.username || "",
      email: user.email || "",
      password: "",
      role: user.role || "",
      full_name: user.full_name || "",
      phone: user.phone || "",
      status: user.status || "active",
    });
    setShowModal(true);
    setError(null);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const method = editingUser ? "PUT" : "POST";
      const url = editingUser ? `/api/users/${editingUser.id}` : "/api/users";
      const body: any = { ...formData };

      // Remove password if editing and left blank
      if (editingUser && !formData.password) {
        delete body.password;
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to save user");
        setLoading(false);
        return;
      }

      setShowModal(false);
      fetchUsers();
    } catch (err) {
      setError("Network or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Users</h2>
      <button onClick={openAddModal}>Add User</button>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.full_name}</td>
              <td>{user.phone}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => openEditModal(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <form onSubmit={handleSubmit}>
            <h3>{editingUser ? "Edit User" : "Add User"}</h3>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              name="full_name"
              placeholder="Full Name"
              value={formData.full_name}
              onChange={handleChange}
            />
            <input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <input
              name="password"
              type="password"
              placeholder={
                editingUser ? "New Password (leave blank to keep)" : "Password"
              }
              value={formData.password}
              onChange={handleChange}
              required={!editingUser}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
