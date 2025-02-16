import {useAuthStore} from "../store/useAuthStore";
import { MdEdit } from "react-icons/md";
import { useState } from "react";

const Profile = () => {
  const {authUser, UpdateProfilePic} = useAuthStore();
  const [profile, setProfile] = useState(authUser?.image || "")

  const handleImageChange = async(e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image",file)

    const res = await UpdateProfilePic(formData);
    if (res?.data?.imageUrl) {
      setProfile(res.data.imageUrl);
  }
  }

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 text-center justify-center grid">
        <div className="relative flex justify-center">
        <img
            src={profile || authUser.image || "/avatar.png"}
            alt="profile"
            className=" size-32 rounded-full overflow-hidden"
          />
        <label htmlFor="avatar-pic"
            className=" cursor-pointer absolute bottom-0 right-0 rounded-full bg-base-200 p-2">
        <input
              type="file"
              id="avatar-pic"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <MdEdit className="bg-gray-400 rounded-full p-1 size-[30px]"/>
            </label>
            </div>
        <h1 className="text-2xl font-bold mt-3">{authUser.fullname}</h1>
        <p className="text-gray-400">{authUser.email}</p>
        <p className="text-green-400 mt-2">status</p>
        <button
          className="mt-4 bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Profile