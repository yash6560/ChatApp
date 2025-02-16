import { CgProfile } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
import { useMessageStore } from "../store/useMessageStore";

const RightHead = () => {
  const {removeSelectForMessage, selectedUser} = useMessageStore();

  const handleRemove = () => {
    removeSelectForMessage();
  }

  return (
    <div className='w-full flex gap-3 items-center'>
      <div><CgProfile size={45}/></div>
      <div className="flex-1">
        <h1 className="font-bold text-left truncate">{selectedUser.fullname}</h1>
        <p className="text-left text-sm text-green-400">Online</p>
      </div>
      <div>
        <button onClick={handleRemove}><IoClose size={25}/></button>
      </div>
    </div>
  )
}

export default RightHead