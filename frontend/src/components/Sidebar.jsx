import { CgProfile } from "react-icons/cg";
import SideProfile from './SideProfile';

const Sidebar = () => {
  return (
    <div className="h-full md:w-[300px] flex flex-col">
      <div className="md:p-3 p-1">
        {/* Header */}
        <div className="flex items-center gap-3 font-bold text-[18px]">
          <CgProfile /> <span className="md:table hidden">Contacts</span>
        </div>

        {/* Show Online Only Option */}
        <div className="flex items-center gap-3 pt-2">
          <input type="radio" className="accent-blue-500" />
          <span className="md:table hidden">Show Online Only</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-3">
        <SideProfile />
      </div>
    </div>
  );
};

export default Sidebar;
