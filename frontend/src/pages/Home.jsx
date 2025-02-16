import Sidebar from '../components/Sidebar';
import RightSide from '../components/RightSide';
import { useMessageStore } from '../store/useMessageStore';
import UnsetRight from '../components/UnsetRight';

const Home = () => {
  const {selectedUser} = useMessageStore();

  return (
    <div className="h-[80vh] bg-black text-white">
      <div className="md:py-5 md:px-10 px-3 py-3 h-full">
        <div className="bg-gray-600 rounded md:p-4 p-2 flex h-full">
          {/* Sidebar - Fixed Width */}
          <div className="w-1/4 h-full border-r border-gray-400 md:pr-4 pr-2">
            <Sidebar />
          </div>
          
          {/* Right Side - Takes Remaining Space */}
          <div className="flex-1 md:p-4 p-2 h-full">
            {!selectedUser ? <UnsetRight/> : <RightSide/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
