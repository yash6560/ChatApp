import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useMessageStore } from '../store/useMessageStore';

const Navbar = () => {

  const {authUser, userLogout} = useAuthStore();
  const {getUsers} = useMessageStore();

  const handleLogout = async() => {
    userLogout();
    await getUsers();
  }

  return (
    <nav>
      <div className='flex justify-between items-center p-4 bg-gray-800 text-white'>
        <div className='font-bold text-[25px]'><Link to='/'>Logo</Link></div>
        <div className='flex items-center gap-4'>
          {authUser ? 
          ( <><Link to="/profile" className="font-bold hover:underline">Profile</Link>
          <button onClick={handleLogout} className="bg-red-300 rounded font-bold px-4 py-2 cursor-pointer text-black">Logout</button></>
          ) 
          : 
          (
            <>
            <Link to="/login" className="bg-blue-300 rounded font-bold px-4 py-2 text-black">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
