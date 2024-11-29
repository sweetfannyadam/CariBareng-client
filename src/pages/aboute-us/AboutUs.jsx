import React from 'react';

const AboutUs = () => {
  return (
    <article className="py-10 lg:px-20 2xl:px-36">
      <h1 className="text-center text-2xl lg:text-6xl font-bold py-5 pb-20 text-secondary-foreground">
        About <span className='text-primary'>CariBareng</span>
      </h1>
      <div className="flex flex-col-reverse lg:flex-row px-5">
        <div className="flex flex-col gap-5">
          <div className='mt-5 lg:mt-0'>
            <h2 className="text-secondary-foreground text-lg font-semibold pb-4">
            What is CariBareng?
            </h2>
            <p className="lg:pr-20 text-primary">
            CariBareng is a digital platform designed to facilitate the process of reporting and searching for lost items. Using the latest technology, we provide solutions to make finding lost items easier and faster.
            </p>
          </div>
          <div>
            <h2 className="text-secondary-foreground text-lg font-semibold pb-4">
            Why CariBareng?
            </h2>
            <p className="lg:pr-20 text-primary">
            In this digital age, losing an important item can be a stressful and inconvenient experience. Traditional search methods through social media or direct communication are often less effective. CariBareng is here to address this need by offering a solution that is practical and accessible online.
            </p>
          </div>
          <div>
            <h2 className="text-secondary-foreground text-lg font-semibold pb-4">
            What are the benefits of CariBareng for you?
            </h2>
            <p className="lg:pr-20 text-primary">
            CariBareng helps connect people who have lost items with those who have found them. With easy-to-use features, the platform aims to make the process of finding items simpler and more targeted, thereby reducing the anxiety that often comes with losing items.
            </p>
          </div>
          <div>
            <h2 className="text-secondary-foreground text-lg font-semibold pb-4">
            How does CariBareng work?
            </h2>
            <p className="lg:pr-20 text-primary">
            Users can enter reports of lost or found items through our platform. This information can then be accessed by others who want to search or help find the item. Cari Bareng acts as a bridge that speeds up the search process in a safe efficient way.
            </p>
          </div>
        </div>
        <img className='lg:w-1/3 lg:h-80 object-cover' src="Media-Digital.png" />
      </div>
    </article>
  );
};

export default AboutUs;
