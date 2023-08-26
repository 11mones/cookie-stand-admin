import Link from "next/link";
import { useAuth } from "@/contexts/auth";

export default function Header() {
  const { user, login, token, logout } = useAuth();

  return (
    <header className="bg-green-500 p-8">
      <h1 className="text-4xl text-black">Cookie Stand Admin</h1>
      <div className="flex mt-4 overflow-x-auto">
        {user ? (
          <div className="flex space-x-4">
            <button
              type="submit"
              className="p-2 text-xl text-black bg-green-500 rounded"
            >
              <Link href={"../"}>Home</Link>
            </button>
            <button
              type="submit"
              className="p-2 text-xl text-black bg-green-500 rounded"
            >
              <Link href={"assets/overview"}>Overview</Link>
            </button>
            <button
              onClick={() => logout()}
              type="submit"
              className="p-2 text-xl text-black bg-green-500 rounded"
            >
              Log Out
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
}
