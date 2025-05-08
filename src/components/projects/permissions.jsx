import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Loading } from "@/components/loading";
import { FaX } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";

import { InfoModalButton } from "@/components/projects/infoModalButton";
import { permissionsIntegration } from "@/lib/test.json";

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

  const givePermission = () => {
    setIsLoading(true);

    const form = new FormData(document.querySelector("#email-form"));

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
    <>
      <div className="flex justify-between">
        <InfoModalButton
          heading={permissionsIntegration.heading}
          description={permissionsIntegration.description}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl">Add user</h1>
        <form id="email-form" className="flex flex-row gap-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border-amber-50 border-2 rounded-sm"
          />
          <button className="hover:cursor-pointer">
            <IoIosAddCircle
              className="text-green-600 scale-200"
              onClick={() => {
                givePermission();
              }}
            />
          </button>
        </form>
        <table className="text-center w-[70%] table-fixed mt-10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Permissions</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{usersWithAccess.data.owner.users.name}</td>
              <td>{usersWithAccess.data.owner.users.email}</td>
              <td>Project owner</td>
              <td></td>
            </tr>
            {usersWithAccess.data.users.map((access) => (
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
      </div>
    </>
  );
};
