import React, { useState } from 'react'
import UserSection from './User'
import AddForm from './AddForm'
import EditForm from './EditForm'

const App = () => {

  const userData = [
    { id:1, name:'John Doe', username:'johndoe' },
    { id:2, name:'Dicka Ismaji', username:'dicka88' },
    { id:3, name:'Malik Nur Hidayat', username:'kurnin' }
  ]

  const [users,setUsers] = useState(userData)

  const addUser = user => {
    user.id = users.length + 1
    setUsers([...users, user])
  }

  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id))
  }

  const [editing, setEditing] = useState(false)
  const initialFormState = { id: null, name: '', username: '' }
  const [currentUser, setCurrentUser] = useState(initialFormState)
  const editRow = user => {
    setEditing(true)

    setCurrentUser({ id: user.id, name: user.name, username: user.username })
  }
  const updateUser = (id, updatedUser) => {
  setEditing(false)

  setUsers(users.map(user => (user.id === id ? updatedUser : user)))
  }

  return (
    <div className="container">
      <h1> Hook vs State</h1>
      <div className="flex-row">
      <div className="flex-large">
        {editing ? (
          <div>
            <h2>Edit user</h2>
            <EditForm
              editing={editing}
              setEditing={setEditing}
              currentUser={currentUser}
              updateUser={updateUser}
            />
          </div>
        ) : (
          <div>
            <h2>Add user</h2>
            <AddForm addUser={addUser} />
          </div>
        )}
      </div>
        <div className="flex-large">
          <h2>View users</h2>
          <UserSection users={users} deleteUser={deleteUser} editRow={editRow} setEditing={setEditing} />
        </div>
      </div>
    </div>
  )
}

export default App
