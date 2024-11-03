import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MissingItemCard from '@/components/MissingItemCard';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

const Browse = () => {
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
    <div>
      {/* Search Bar */}
      <div className="flex flex-row justify-between p-4">
        <Input className="m-2 w-[250px]" placeholder="Search" />
        <Select>
          <SelectTrigger className="m-2 w-full md:w-[200px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jakarta">Jakarta</SelectItem>
            <SelectItem value="bandung">Bandung</SelectItem>
            <SelectItem value="surabaya">Surabaya</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="m-2 w-full md:w-[200px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
          </SelectContent>
        </Select>
        <Button className="m-2">
          <Search className="h-4 w-4 mr-2" />
          <span>Search</span>
        </Button>
      </div>

      {/* List of Posts  */}
      <h3 className="mb-10 text-2xl font-semibold text-700">My Posts</h3>

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
  );
};
export default Browse;
