import { CgProfile } from "react-icons/cg";
import { useMessageStore } from "../store/useMessageStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

const SideProfile = () => {
  const { userSelectForMessage, selectedUser, usersList, getUsers } = useMessageStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (authUser) {
      getUsers();
    }
  }, [getUsers, authUser]);

  return (
    <div>
      {usersList.map((usres) => (
        <button
          key={usres._id}
          onClick={() => userSelectForMessage(usres)}
          className={`w-full flex items-center gap-3 md:px-3 md:py-4 px-0 py-0 cursor-pointer hover:bg-gray-900 rounded transition duration-200 ${selectedUser ? "bg-gray-900" : ""}`}
        >
          <CgProfile size={45} className="text-gray-300" />
          <div className="flex-1 hidden md:table">
            <h1 className="font-bold text-left truncate">{usres.fullname}</h1>
            <p className="text-left text-sm text-green-400">Online</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default SideProfile;
