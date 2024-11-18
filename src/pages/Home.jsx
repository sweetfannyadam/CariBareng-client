import { Button } from '@/components/ui/button';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 md:px-10 xl:px-40">
      <section className="flex flex-col-reverse md:flex-row justify-center items-center ">
        <img className='w-[400px]' src='missing-found.jpg' alt='missing found' />
        <div className='xl:px-20'>
          <h1 className="text-2xl md:text-4xl font-bold mb-3">Welcome to <span className='text-sky-500'>CariBareng</span></h1>
          <p className="md:text-lg mb-10">Kami adalah platform yang membantu Anda menemukan barang yang hilang
            dan terhubung dengan orang-orang di sekitar Anda. Dengan mudah, Anda
            dapat melaporkan barang yang hilang dan mencari barang yang mungkin
            telah ditemukan oleh orang lain.</p>

          <Link to="/browse">
            <Button className="focus-visible:ring-transparent bg-sky-500" variant="default">
              Lihat Barang yang Hilang
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
