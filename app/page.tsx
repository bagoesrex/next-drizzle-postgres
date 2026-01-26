"use client";

import { getUsers, User } from "@/actions/users";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUsers() {
      const res = await getUsers();

      if (res.success) {
        setUsers(res.data!);
      } else {
        setError(res.message!);
      }
    }

    loadUsers();
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Next Drizzle Postgres</h1>

      {error && <p className="text-red-500">{error}</p>}

      {!error && users.length === 0 && <p className="text-gray-500">Belum ada data user</p>}

      {users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} – {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
