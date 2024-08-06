// AdminUsers.js

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllUsersAsync, selectAllUsers } from '../../user/userSlice';

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchAllUsersAsync())
  }, [dispatch]);

  return (
    <div className="container max-w-3xl px-4 mx-auto sm:px-8">
      <div className="py-8">
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                    Email
                  </th>
                  <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                    Role
                  </th>
                  <th scope="col" className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      <p className="text-gray-900 whitespace-no-wrap">{user.role}</p>
                    </td>
                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                      {/* Thêm các action tương ứng */}
                      <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                      {/* Thêm các action khác nếu cần */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
