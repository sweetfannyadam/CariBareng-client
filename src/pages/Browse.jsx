import { useEffect, useState } from 'react';
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

import categories from '@/assets/data/categories';
import Loading from '@/components/Loading';

const Browse = () => {
  const [datas, setDatas] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingLocations, setLoadingLocations] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://cari-barengbackend-production.up.railway.app/missings'
      );
      const raw_data = await response.json();
      setDatas(raw_data.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const fetchLocations = async () => {
    try {
      const query = `
      [out:json];
      area["name"="Indonesia"]->.searchArea;
      relation["admin_level"="5"](area.searchArea);
      out tags;
      `;
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `data=${encodeURIComponent(query)}`,
      });
      const data = await response.json();
      const locationNames = (data.elements || [])
        .filter((element) => element.tags && element.tags.name)
        .map((element) => element.tags.name);
      setLocations(locationNames);
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setLoadingLocations(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchLocations();
  }, []);

  return (
    <div className="pt-10 px-5 md:px-20 xl:px-40">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <Input className="w-full" placeholder="Search" />
        <Select>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {loadingLocations ? (
              <SelectItem disabled value="loading">
                Loading locations...
              </SelectItem>
            ) : (
              locations.map((location, index) => (
                <SelectItem key={index} value={location.toLowerCase()}>
                  {location}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category, index) => (
              <SelectItem key={index} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button>
          <Search className="h-4 w-4 mr-2" />
          <span>Search</span>
        </Button>
      </div>

      {/* List of Posts */}
      <h3 className="mb-8 text-2xl font-semibold text-gray-700">Lost Items</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {loadingData ? (
          <Loading  />
        ) : (
          datas.map((data) => (
            <MissingItemCard
              key={data.tableId}
              title={data.title}
              category={data.category}
              images={data.images}
            />
          ))
        )}
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
