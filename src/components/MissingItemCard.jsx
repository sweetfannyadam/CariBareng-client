import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Pencil, Edit, Delete } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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

export default function MissingItemCard({ title, category, image, count }) {
  console.log(title, category, image, count);
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <div className="mb-8">
      {/* Posts */}
      <Card>
        <CardContent className="flex flex-col justify-center items-center p-4">
          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-xs"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="border-none shadow-none">
                      <CardContent>
                        <div className="flex aspect-square rounded-md mb-2 items-center justify-center">
                          <img
                            src={image}
                            alt="item-image"
                            className="h-1/2 rounded-md"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">{category}</p>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            className="text-gray-700 transition-colors duration-300 ease-in-out hover:text-black"
            variant="ghost"
            size="sm"
          >
            <Link to="/edit-item">
              <Edit />
            </Link>
          </Button>
          <MarkAsFoundDrawer />
          <DeleteDrawer />
        </CardFooter>
      </Card>
    </div>
  );
}
