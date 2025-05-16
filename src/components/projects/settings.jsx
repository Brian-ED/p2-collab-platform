import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Loading } from "@/components/loading";
import { FaX } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";

import { InfoModalButton } from "@/components/projects/infoModalButton";
import { Error } from "@/components/error";
import { settingsIntegration } from "@/lib/tutorial.json";

export const Settings = () => {
  const [permissionLoading, setPermissionLoading] = useState(true);
  const [githubLoading, setGithubLoading] = useState(true);
  const [usersWithAccess, setUsersWithAccess] = useState([]);
  const [githubUrl, setGithubUrl] = useState("");
  const [changePermissions, setChangePermissions] = useState(true);
  const { pid } = useParams();

  useEffect(() => {
    fetch(`/api/db/handleAccess?projectId=${pid}`)
      .then((res) => res.json())
      .then((data) => {
        setUsersWithAccess(data);
        setPermissionLoading(false);
      });

    fetch(`/api/github/setRepo?projectId=${pid}`)
      .then((res) => res.json())
      .then((data) => {
        setGithubUrl(data.data);
        setGithubLoading(false);
      });
  }, [changePermissions]);

  const removePermission = (accessId) => {
    setPermissionLoading(true);

    fetch(`/api/db/handleAccess?projectId=${pid}&accessId=${accessId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error !== null) {
          setUsersWithAccess({ error: data.error });
        } else {
          setChangePermissions(!changePermissions);
        }
        setPermissionLoading(false);
      });
  };

  const givePermission = () => {
    setPermissionLoading(true);

    const form = new FormData(document.querySelector("#email-form"));

    const data = new URLSearchParams(form);

    fetch(`/api/db/handleAccess?projectId=${pid}`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error !== null) {
          setUsersWithAccess({ error: data.error });
        } else {
          setChangePermissions(!changePermissions);
        }
        setPermissionLoading(false);
      });
  };

  const sendGithubURL = () => {
    setGithubLoading(true);

    const data = new URLSearchParams(
      new FormData(document.querySelector("#githubUrlForm"))
    );

    fetch(`/api/github/setRepo?projectId=${pid}`, {
      method: "PATCH",
      body: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setGithubUrl(data.data[1]);
        setGithubLoading(false);
      });
  };

  if (githubLoading || permissionLoading) return <Loading />;
  if (usersWithAccess.error !== null) {
    return <Error error={usersWithAccess.error} />;
  }

  return (
    <>
      <div className="flex justify-between">
        <InfoModalButton
          heading={settingsIntegration.heading}
          description={settingsIntegration.description}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl">Add user</h1>
        <form id="email-form" className="flex flex-row gap-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border-amber-50 border-2 rounded-sm w-100 text-center"
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
      <div className="flex flex-col gap-2 mt-5">
        <h1 className="text-3xl">Change GitHub integration URL</h1>
        <form id="githubUrlForm" className="flex flex-row gap-5">
          <input
            type="url"
            name="github-repo"
            placeholder={`${githubUrl}`}
            className="border-amber-50 border-2 rounded-sm w-100 text-center"
          />
          <button className="hover:cursor-pointer">
            <FaRegEdit
              className="scale-150"
              onClick={() => {
                sendGithubURL();
              }}
            />
          </button>
        </form>
      </div>
    </>
  );
};
