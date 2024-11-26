import React from 'react';
import { Bell, UserRound, UserRoundPen, Settings, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Link } from 'react-router-dom';
import { CardDemo } from '../Notifications';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const UserMenu = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    console.log('Logged out');
    navigate('/auth');
  };

  return (
    <ul className="flex justify-between gap-5">
      <li>
        <div className="group flex items-center text-gray-700 transition-colors duration-300 ease-in-out hover:text-black cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className="relative">
                <UserRound className="w-6 h-6 text-white" />
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="text-gray-700 transition-colors duration-300 ease-in-out hover:text-black">
                <UserRoundPen className="w-4 h-4" />
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-700 transition-colors duration-300 ease-in-out hover:text-black">
                <Settings className="w-4 h-4" />
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-700 transition-colors duration-300 ease-in-out hover:text-black">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 transition-colors duration-300 ease-in-out hover:text-black"
                >
                  <LogOut />
                  <span>Logout</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </li>
      <li>
        <div className="group flex items-center text-gray-700 transition-colors duration-300 ease-in-out hover:text-black cursor-pointer">
          <Popover>
            <PopoverTrigger>
              <Bell className="w-6 h-6 text-white" />
            </PopoverTrigger>
            <PopoverContent
              className={'relative top-0 bottom-0 right-0 left-0'}
            >
              <CardDemo className={'w-full'} />
            </PopoverContent>
          </Popover>
        </div>
      </li>
    </ul>
  );
};

export default UserMenu;
