import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [form, setForm] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const initialUsers = [
      { name: 'John Doe', age: 30, phone: '1234567890', address: '123 Main St', editing: false },
      { name: 'Jane Smith', age: 25, phone: '9876543210', address: '456 Elm St', editing: false },
      { name: 'Alice Johnson', age: 35, phone: '5551234567', address: '789 Oak St', editing: false },
      { name: 'Bob Brown', age: 40, phone: '7778889999', address: '101 Pine St', editing: false },
      { name: 'Loreyn Davis', age: 28, phone: '3334445555', address: '202 Maple St', editing: false }
    ];

    setUsers(initialUsers);
    setOriginalUsers(initialUsers);
    setFilteredUsers(initialUsers);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
      
    const isExistingUser = users.some((user) => (
      user.name === form.name && user.age === form.age && user.phone === form.phone && user.address === form.address
    ));
      
    if (!isExistingUser) {
      const newUser = { ...form, id: nanoid(), editing: false };
      if (editIndex !== null) {
        const updatedUsers = [...users];
        updatedUsers[editIndex] = newUser;
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
        setEditIndex(null);
      } else {
        setUsers([...users, newUser]);
        setFilteredUsers([...users, newUser]);
      }
    }
    setForm({});
    event.target.reset();
  };

  const deleteUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(value) ||
      user.phone.toLowerCase().includes(value) ||
      user.address.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  const resetSearch = () => {
    setFilteredUsers(users);
    document.getElementById("searchInput").value = ""; 
  };

  const handleEdit = (index) => {
    const updatedUsers = users.map((user, i) => ({
      ...user,
      editing: i === index ? !user.editing : false,
    }));
    setUsers(updatedUsers);
    setForm(updatedUsers[index]);
    setEditIndex(index);
  };  
  
  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-8">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <td>T/R</td>
                  <td>Name</td>
                  <td>Age</td>
                  <td>Phone</td>
                  <td>Address</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((item, index) => {
                  return (
                    <tr key={index} style={{ backgroundColor: item.editing ? 'lightgray' : 'inherit' }}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.age}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td>
                      <td>
                        <button type="button" className="btn btn-danger m-2" onClick={() => deleteUser(index)}>
                          Delete
                        </button>
                        <button type="button" className="btn btn-primary ml-2 m-2" onClick={() => handleEdit(index)}>
                          Edit
                        </button>
                        {item.editing && (
                          <button type="button" className="btn btn-success ml-2 m-2" onClick={() => handleEdit(index)}>
                            Update
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-12">
                <input id="searchInput" type="text" placeholder="Search users" className="form-control " onChange={handleSearch} />
                <button className="btn btn-secondary btn-sm my-2" onClick={resetSearch}>Reset Search</button>
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-header">
                <h1>Add User</h1>
              </div>
              <div className="card-body">
                <form id="form" onSubmit={handleSubmit}>
                  <input type="text" placeholder="Enter name" className="form-control my-2" onChange={handleChange} required name="name" value={form.name || ''} />
                  <input type="number" placeholder="Enter age" className="form-control my-2" onChange={handleChange} required name="age" value={form.age || ''} />
                  <input type="tel" placeholder="Enter phone" className="form-control my-2" onChange={handleChange} required name="phone" value={form.phone || ''} />
                  <input type="text" placeholder="Enter address" className="form-control my-2" onChange={handleChange} required name="address" value={form.address || ''} />
                </form>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-success" form="form">
                  Add user
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
