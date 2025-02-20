import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface User {
  id: number;
  name: string;
  email: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data: User[]) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Xatolik yuz berdi:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-primary text-center">Foydalanuvchilar</h2>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Ism</th>
            <th>Email</th>
            <th>Profil</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td>
                    <Skeleton width={30} />
                  </td>
                  <td>
                    <Skeleton width={150} />
                  </td>
                  <td>
                    <Skeleton width={200} />
                  </td>
                  <td>
                    <Skeleton width={100} height={30} />
                  </td>
                </tr>
              ))
            : users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link
                      to={`/cabinet/${user.id}`}
                      className="btn btn-warning"
                    >
                      Kabinet
                    </Link>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
