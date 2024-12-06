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
import { Plus, Search } from 'lucide-react';

import categories from '@/assets/data/categories';
import Loading from '@/components/Loading';
import { Link } from 'react-router-dom';

const Browse = () => {
  const [datas, setDatas] = useState([]);
  const [allData, setAllData] = useState([]); // Untuk menyimpan semua data tanpa filter
  const [locations, setLocations] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingLocations, setLoadingLocations] = useState(true);

  // State untuk pencarian
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://cari-barengbackend-production.up.railway.app/missings?status=found"
      );
      const raw_data = await response.json();
      setDatas(raw_data.data || []);
      setAllData(raw_data.data || []); // Simpan data asli
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

  const handleSearch = () => {
    setLoadingData(true);

    // Jika semua input kosong, tampilkan semua data
    if (!searchQuery && !selectedLocation && !selectedCategory) {
      setDatas(allData);
    } else {
      // Filter data berdasarkan input
      const filteredData = allData.filter(
        (item) =>
          (!searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
          (!selectedLocation || item.location.toLowerCase().includes(selectedLocation.toLowerCase())) &&
          (!selectedCategory || item.category === selectedCategory)
      );

      setDatas(filteredData);
    }

    // Kosongkan inputan
    setSearchQuery('');
    setSelectedLocation('');
    setSelectedCategory('');
    setLoadingData(false);
  };

  useEffect(() => {
    fetchData();
    fetchLocations();
  }, []);

  console.log(datas);

  return (
    <div className="pt-10 px-5 md:px-20 xl:px-40">
      {/* Search Bar */}
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <Input
          className="w-full"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select onValueChange={setSelectedLocation}>
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
                <SelectItem key={index} value={location}>
                  {location}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
        <Select onValueChange={setSelectedCategory}>
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
        <Button
          onClick={handleSearch}
          className="bg-primary hover:bg-primary-foreground hover:text-primary border border-primary"
        >
          <Search className="h-4 w-4 mr-2" />
          <span>Search</span>
        </Button>
      </div>

      {/* List of Posts */}
      <h3 className="mb-8 text-2xl font-semibold text-gray-700">Found Items</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {loadingData ? (
          <Loading />
        ) : (
          datas.map((data) => (
            <MissingItemCard
              key={data.tableId}
              id={data.tableId}
              title={data.title}
              category={data.category}
              images={data.images}
              status={data.status}
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
