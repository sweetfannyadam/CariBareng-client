import MissingItemCard from '@/components/MissingItemCard';
import StatsCard from '@/components/StatsCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserMissingItems } from '../../utils/user';

const Profile = () => {
  const { user, token, isAuthenticated } = useAuth();
  const [userMissingItems, setUserMissingItems] = useState([]);

  useEffect(() => {
    if (isAuthenticated && token) {
      const loadUserMissingItems = async () => {
        const data = await fetchUserMissingItems(token);
        const userMissingItems = data.data || [];
        setUserMissingItems(userMissingItems);
      };
      loadUserMissingItems();
    } else {
      console.log('User is not authenticated or token is missing.');
    }
  }, []);

  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await fetch('https://fakestoreapi.com/products');
  //     const raw_data = await response.json();
  //     const data = raw_data.slice(0, 5);
  //     setData(data);
  //   };
  //   getData();
  // }, [token]);

  return (
    <>
      <section className="flex flex-col lg:flex-row items-center justify-between pt-20 px-5 lg:px-40 gap-10">
        <div className="flex items-center gap-10 ">
          <div
            id="profile_img"
            className="rounded-full border-4 w-40 h-40 md:w-60 md:h-60 overflow-hidden"
          >
            <img src="missing-found.jpg" alt="" />
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
          <StatsCard
            title={'Number of Posts'}
            value={userMissingItems.length}
          />
          <StatsCard title={'Items Found'} value={'1'} />
          <StatsCard title={'Items Lost'} value={'2'} />
        </div>
      </section>
      <section>
        <div className="pt-20 px-5 lg:px-40">
          <h3 className="mb-8 text-2xl font-semibold text-700">
            My Missing Items
          </h3>

          {userMissingItems.length === 0 ? (
            <p className="text-center">You have no missing items.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userMissingItems.map((data) => (
                <MissingItemCard
                  key={data.id}
                  title={data.title}
                  category={data.category}
                  image={data.image}
                  count={data.rating.count}
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
