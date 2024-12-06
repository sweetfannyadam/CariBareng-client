import { Button } from '@/components/ui/button';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 md:px-10 xl:px-36">
      <section className="flex flex-col-reverse md:flex-row justify-between items-start">
        <div className='mt-5 lg:mt-0 xl:pr-20'>
          <h1 className="text-2xl md:text-4xl font-bold mb-3">Welcome to <span className='text-primary'>CariBareng</span></h1>
          <p className="md:text-lg mb-10">We are a platform that helps you find lost items and connect with people around you. With ease, you can report lost items and search for items that may have been found by someone else.</p>
          <Link to="/browse-missing">
            <Button className="focus-visible:ring-transparent bg-primary hover:bg-primary-foreground hover:text-primary border border-primary" variant="default">
            View Missing Items
            </Button>
          </Link>
        </div>
        <img className='lg:w-1/2 rounded-2xl' src='missing-found.png' alt='missing found' />
      </section>
    </div>
  );
};

export default Home;
