import React from 'react';
import { Edit } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import DeleteDrawer from './DeleteDrawer';
import MarkAsFoundDrawer from './MarkAsFoundDrawer';

export default function MissingItemCard({id, title, category, images = [], status, }) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="mb-8 shadow-xl rounded-xl relative">
      <Card className="rounded-xl">
        {/* Card Content: Carousel */}
        <CardContent className="flex flex-col justify-center items-center p-0 rounded-xl">
          {images.length > 0 ? (
            <Carousel
              plugins={[plugin.current]}
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
              className="rounded-xl "
            >
              <CarouselContent className="rounded-xl">
                {images.map((item, index) => (
                  <CarouselItem key={index} className="rounded-xl">
                    <div className="h-[20rem] w-full rounded-xl">
                      <img
                        src={item.image_url || '/placeholder.jpg'}
                        alt={`item-image-${index}`}
                        className="h-full w-full object-cover rounded-t-xl"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : (
            <div className="h-[20rem] w-full flex justify-center items-center bg-gray-200 rounded-t-xl">
              <p className="text-gray-500">No images available</p>
            </div>
          )}
        </CardContent>

        {/* Card Footer */}
        <CardFooter className="bg-primary grid p-5 rounded-b-xl text-white">
          <div className='flex justify-between'>
            <h3 className="font-semibold truncate">{title}</h3>
            <p className='border-2 rounded-xl border-primary-foreground px-2'>{status}</p>
          </div>
          <p className="text-sm text-gray-100">{category}</p>
          <div className="mt-4 flex justify-end gap-2">
            {/* link detail */}
            <Link to={`/missing-items/${id}`}>
              <Button className="bg-primary-foreground text-primary px-10 shadow-xl hover:bg-primary border-2 hover:text-primary-foreground border-primary-foreground">
                View
              </Button>
            </Link>

            {/* Delete */}
            <DeleteDrawer />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
