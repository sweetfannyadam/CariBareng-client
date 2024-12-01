import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import MissingItemCard from '@/components/MissingItemCard';
import StatsCard from '@/components/StatsCard';
import { Plus } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Link } from 'react-router-dom';

export default function Dashboard() {
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
    <div className="pt-6 px-5 md:px-20 lg:px-40 mt-6">
      {/* Welcome Section */}
      <h2 className="mb-10 text-2xl font-semibold text-700">
        Welcome back, [User's Name]!
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-20">
        <StatsCard title={'Number of Posts'} value={'24'} />
        <StatsCard title={'Items Found'} value={'1'} />
        <StatsCard title={'Items Lost'} value={'2'} />
      </div>

      {/* List of Posts */}
      <h3 className="mb-5 text-2xl font-semibold text-700">My Posts</h3>

      <div className="flex justify-end mb-4">
        <Button className="bg-primary border-2 border-primary text-white hover:bg-primary-foreground hover:text-primary shadow-lg">
          <a href="/dashboard/post-item" className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            <span>Post Item</span>
          </a>
        </Button>
      </div>
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

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
