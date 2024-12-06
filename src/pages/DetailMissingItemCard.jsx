import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';
import MapComponent from '@/components/MapComponent';
import { Label } from '@/components/ui/label';
import Loading from '@/components/Loading';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FoundThisItem from '@/components/FoundThisItem';
import { Edit } from 'lucide-react';
import DeleteDrawer from '@/components/DeleteDrawer';
import { useAuth } from '@/context/AuthContext';

// Adjust the import path as needed

const DetailMissingItemCard = () => {
  const [datas, setData] = useState(null);
  const { id } = useParams();
  const { user, token } = useAuth(null);
  const navigate = useNavigate()


  useEffect(() => {
    if (!user) {
      navigate('/auth'); // Ganti "/auth" dengan path halaman login Anda
      return;
    }

    const getData = async () => {
      const response = await fetch(
        'https://cari-barengbackend-production.up.railway.app/missings/' + id
      );
      const dataJson = await response.json();
      const data = dataJson.data;
      setData(data);
    };
    getData();
  }, []);

  return (
    <div className="px-5 md:px-10 lg:px-10 xl:px-20 2xl:px-60 pt-10 relative">
      {datas ? (
        <div className="flex flex-col lg:flex-row gap-10">
          {datas.missing_images.length > 0 ? (
          <Carousel className="relative bg-primary p-2 lg:mb-[29rem] xl:mb-52 2xl:mb-44 rounded-xl shadow-xl">
            <CarouselContent className="h-[350px] lg:w-[350px] lg:h-[250px] xl:w-[500px] xl:h-[400px] flex items-center">
              {datas.missing_images.map((_, index) => (
                <CarouselItem  key={index}>
                    <img
                      className="object-cover object-center"
                      src={_.image_url}
                      alt={datas.title}
                    />
                  </CarouselItem>
                ))}
            </CarouselContent>
            <div className="mt-20 lg:hidden"></div>
            <div className="flex justify-center ml-[9%] lg:-mt-14 xl:-mt-16 2xl:mt-10 relative">
              <div>
                <CarouselPrevious className='px-10 rounded-xl -top-12 lg:top-20 -left-5' />
                <CarouselNext className="px-10 rounded-xl -top-12 left-56 md:left-[32rem] lg:top-20 lg:left-52 xl:left-80 xl:ml-3" />
              </div>
            </div>
          </Carousel>
          ) : (
            <div className="h-[20rem] w-full flex justify-center items-center bg-gray-200 rounded-xl">
              <p className="text-gray-500">No images available</p>
            </div>
          )}
          <div className="mt-5 flex-col flex gap-5 text-base w-full">
            <div className="grid md:grid-flow-col gap-10">
              <div className="flex flex-col gap-5">
                <p className="font-semibold">
                  Item Categories: {datas.category}
                </p>
                <h1 className="text-2xl 2xl:text-3xl">{datas.title}</h1>
                <p className="text-xl 2xl:text-2xl font-bold">Reward: {datas.reward}</p>
                <p >Date : {datas.date_time}</p>
                <hr className="text-primary" />
                <p>{datas.description}</p>
              </div>
              <div className="grid gap-5 mt-5">
                <div className="flex flex-col gap-3 bg-primary text-white p-5 rounded-lg">
                  <Label>
                    Missing Person :{' '}
                    <span className="font-bold text-lg">
                      {datas.users.username}
                    </span>
                  </Label>
                  <Label>
                    City :{' '}
                    <span className="font-bold text-lg">{datas.cordinate}</span>
                  </Label>
                  <Label>
                    Reward :{' '}
                    <span className="font-bold text-lg">{datas.reward}</span>
                  </Label>
                  <Label>
                    Status :{' '}
                    <span className="font-bold text-lg">{datas.status}</span>
                  </Label>
                </div>
                <div className="w-full grid grid-flow-col content-center gap-5">
                  {user.id === datas.user_id ? (
                    <>
                      <Button className="bg-primary-foreground text-primary hover:text-primary-foreground hover:bg-primary border-2 border-primary-foreground py-[1.13rem] w-full shadow-lg">
                        <Link to="/edit-item">
                          <Edit
                            className="h-4 w-4"
                            id={datas.id}
                            title="aku orang"
                            category={datas.category}
                            reward={datas.reward}
                            date={datas.date_time}
                            description={datas.description}
                            lat={datas.locations[0].lat}
                            lng={datas.locations[0].lng}
                          />
                        </Link>
                      </Button>
                      <DeleteDrawer id={datas.id} />
                    </>
                  ) : (
                    <FoundThisItem missingItem={datas} token={token} />
                  )}
                </div>
              </div>
            </div>
            <div className="mt-5 border-2 border-primary p-5 rounded-xl shadow-xl mb-20">
              <p className="mb-2">
                Was last seen :{' '}
                <span className="font-bold">{datas.last_viewed}</span>
              </p>
              <MapComponent
                lat={datas.locations[0].lat}
                lng={datas.locations[0].lng}
              />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default DetailMissingItemCard;
