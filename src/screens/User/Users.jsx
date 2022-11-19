import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "../../firebaseConfig";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const colRef = collection(db, "app");
    const docsSnap = await getDocs(colRef);
    const data = [];
    if (docsSnap.docs.length > 0) {
      docsSnap.forEach((doc) => {
        data.push(doc.data());
      });
    }
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="utilities">
        <h2 className="text-center">Welcome to Users Table</h2>
      </div>
      {users?.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact No</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr>
                <td>
                  <img className="table-image" src={user?.photoUrl} alt={user.username} />
                </td>
                <td>
                  {user?.firstName} {user?.lastName}
                </td>
                <td>{user?.email}</td>
                <td>{user?.contactNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>Sorry, No Users found</h2>
      )}
    </div>
  );
}

export default Users;
