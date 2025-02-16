import { useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { SlPicture } from "react-icons/sl";
import { useMessageStore } from "../store/useMessageStore";
import { useAuthStore } from "../store/useAuthStore";

const Send = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("")
  const imageRef = useRef(null)
  const {sendMessageUser} = useMessageStore();
  const {authUser} = useAuthStore();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if(file){
      setImage(file)
      const reader = new FileReader()
      reader.readAsDataURL(file);

      reader.onload = async () =>{
        const Base64Image = reader.result;
        setImage(Base64Image);
      }
    }

  }

  const sendMessage = async(e) => {
    e.preventDefault();
    if(!text.trim() && !image) return
    try {
      const res = await sendMessageUser({text: text.trim(), image: image}, authUser);
      if(res?.data.success){
        setImage(null);
        setText('')
      }
    } catch (error) {
      console.log(error)
    } 
  }

  return (
    <>
     {image && <div className=" rounded-lg overflow-hidden relative w-[128px] h-[128px]">
            <img alt="" src={image} className=" size-28 overflow-hidden object-cover"/>
            <button type="button" onClick={() => setImage(null)} className=" absolute top-0 right-0">x</button>
        </div>}
    <div className="w-full flex items-center md:gap-3 gap-1 md:px-3 px-1 pt-3   border-t border-gray-300">
      {/* Input Field */}
      <input 
        type="text" 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..." 
        className="flex-1 md:px-4 px-2 md:py-2 py-1 w-full border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Picture Icon */}
      <input type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImage}
          ref={imageRef}/>
      <button onClick={() => imageRef.current?.click()} className="md:p-2 p-1 rounded-full hover:bg-gray-200 bg-gray-400 transition">
        <SlPicture className="text-gray-600 md:size-[24px] size-[18px]" />
      </button>

      {/* Send Button */}
      <button onClick={sendMessage} className="bg-blue-500 text-white rounded-full md:p-3 p-1 hover:bg-blue-600 transition">
        <IoIosSend className="md:size-[24px] size-[18px]" />
      </button>
    </div>
    </>
  );
};

export default Send;
