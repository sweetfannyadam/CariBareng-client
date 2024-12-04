import MissingItemCard from '@/components/MissingItemCard';
import StatsCard from '@/components/StatsCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserMissingItems } from '../../utils/user';
import { Plus } from 'lucide-react';

const Profile = () => {
  const { user, token, logout, isAuthenticated } = useAuth();
  const [userMissingItems, setUserMissingItems] = useState([]);
  const navigate = useNavigate();

  // Fetch user missing items
  useEffect(() => {
    const loadUserMissingItems = async () => {
      if (isAuthenticated && token) {
        try {
          const data = await fetchUserMissingItems(token);
          console.log('Data:', data);
          if (
            data?.status === 'fail' &&
            data?.message?.toLowerCase().includes('token tidak valid')
          ) {
            console.log('Token is not valid or has expired.');
            logout();
            navigate('/auth');
          } else {
            setUserMissingItems(data || []);
          }
        } catch (error) {
          console.error('Error fetching user missing items:', error);
        }
      } else {
        console.log('User is not authenticated or token is missing.');
      }
    };

    loadUserMissingItems();
  }, [isAuthenticated, token, logout, navigate]);

  console.log(userMissingItems);

  return (
    <>
      <section className="flex flex-col lg:flex-row items-center justify-between pt-20 px-5 lg:px-40 gap-10">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div
            id="profile_img"
            className="rounded-full border-4 w-40 h-40 md:w-60 md:h-60 overflow-hidden"
          >
            <img src="profile.jpg" alt="User Profile" />
          </div>
          <div id="profile_info" className="text-2xl flex flex-col gap-3">
            <p>{user?.fullname || 'Loading...'}</p>
            <p>{user?.gmail || 'Loading...'}</p>
            <p>{user?.about_me || 'Ceritakan tentang Anda'}</p>
            <Link to="/profile/edit">
              <Button className="bg-sky-500">Edit Profile</Button>
            </Link>
          </div>
        </div>
        <div className="flex gap-4">
          <StatsCard title="Number of Posts" value={userMissingItems.length} />
          <StatsCard title="Items Found" value="1" />
          <StatsCard title="Items Lost" value="2" />
        </div>
      </section>
      <section>
        <div className="pt-20 px-5 lg:px-40">
          <h3 className="mb-8 text-2xl font-semibold text-700">
            My Missing Items
          </h3>

          <Link to="/post-item">
            <Button className="bg-sky-500 mb-4">
              <Plus />
              <span>Add Item</span>
            </Button>
          </Link>

          {userMissingItems.length === 0 ? (
            <p className="text-center m-16">You have no missing items.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userMissingItems.map((data) => (
                <MissingItemCard
                  key={data.id}
                  id={data.id}
                  title={data.title}
                  category={data.category}
                  image={data.image}
                  status={data.status}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Profile;
