import MissingItemCard from '@/components/MissingItemCard'
import StatsCard from '@/components/StatsCard';
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Profile = () => {
    const [datas, setData] = useState([]);

    useEffect(() => {
        const getData = async () => {
        const response = await fetch('https://fakestoreapi.com/products');
        const raw_data = await response.json();
        const data = raw_data.slice(0, 5);
        setData(data);
        };
        getData();
    }, []);
  return (
    <>
        <section className='flex flex-col lg:flex-row items-center justify-between pt-20 px-5 lg:px-40 gap-10'>
            <div className='flex items-center gap-10 '>
                <div id="profile_img" className='rounded-full border-4 w-40 h-40 md:w-60 md:h-60 overflow-hidden'>
                    <img src="profile.jpg" alt="" />
                </div>
                <div id="profile_info" className='text-2xl flex flex-col gap-3'>
                    <p> [username] </p>
                    <p> [email]</p>
                    <p> [phone number] </p>
                    <Link to="/profile/edit">
                        <Button className="bg-primary border-2 border-primary text-white hover:bg-primary-foreground hover:text-primary">Edit Profile</Button>
                    </Link>
                </div>
            </div>
            <div className="flex gap-4">
                <StatsCard title={'Number of Posts'} value={'24'} />
                <StatsCard title={'Items Found'} value={'1'} />
                <StatsCard title={'Items Lost'} value={'2'} />
            </div>
        </section>
        <section>
            <div className='pt-20 px-5 lg:px-40'>
                <h3 className="mb-8 text-2xl font-semibold text-700">My Lost Items</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {datas.map((data) => (
                    <MissingItemCard
                    key={data.id}
                    title={data.title}
                    category={data.category}
                    image={data.image}
                    count={data.rating.count}
                    />
                ))}
                </div>
            </div>
        </section>
    </>
  )
}

export default Profile