import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Loading } from "@/components/loading";
import { FaX } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";

export const Permissions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [usersWithAccess, setUsersWithAccess] = useState([]);
  const [changePermissions, setChangePermissions] = useState(true);
  const { pid } = useParams();

  useEffect(() => {
    fetch(`/api/db/handleAccess?projectId=${pid}`)
      .then((res) => res.json())
      .then((data) => {
        setUsersWithAccess(data);
        setIsLoading(false);
      });
  }, [changePermissions]);

  const removePermission = (accessId) => {
    setIsLoading(true);

    fetch(`/api/db/handleAccess?projectId=${pid}&accessId=${accessId}`, {
      method: "DELETE",
    }).then(() => {
      setChangePermissions(!changePermissions);
      setIsLoading(false);
    });
  };

  const givePermission = (email) => {
    setIsLoading(true);

    const form = new FormData();
    form.append("email", email);

    const data = new URLSearchParams(form);

    fetch(`/api/db/handleAccess?projectId=${pid}`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then(() => {
      setChangePermissions(!changePermissions);
      setIsLoading(false);
    });
  };

  if (isLoading) return <Loading />;
  if (usersWithAccess.error !== null)
    return <p>Error: {usersWithAccess.error}</p>;

  return (
    <div>
      <table className="text-center w-[70%] table-fixed">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Permissions</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {usersWithAccess.data.map((access) => (
            <tr key={access.id}>
              <td>{access.users.name}</td>
              <td>{access.users.email}</td>
              <td>{access.permissions.name}</td>
              <td>
                <button className="hover:cursor-pointer">
                  <FaX
                    className="text-red-600"
                    onClick={() => {
                      removePermission(access.id);
                    }}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="hover:cursor-pointer">
        <IoIosAddCircle
          className="text-green-600 scale-200"
          onClick={() => {
            givePermission(email);
          }}
        />
      </button>
    </div>
  );
};
