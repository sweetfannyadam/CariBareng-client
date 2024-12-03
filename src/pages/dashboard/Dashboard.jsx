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
import Loading from '@/components/Loading';
import axiosInstance from '@/api/axios';
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
  const [datas, setDatas] = useState([]);
  const [user, setUser] = useState(null);
  const { token } = useAuth();
  const [loadingData, setLoadingData] = useState(true);

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

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get('/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.data);
    } catch (error) {
      console.error(
        'Error fetching user:',
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchData();
    fetchUser();
  }, []);

  console.log(user);

  return (
    <div className="pt-6 px-5 md:px-20 lg:px-40 mt-6">
      {/* Welcome Section */}
      <h2 className="mb-10 text-2xl font-semibold text-700">
        Welcome back, {user?.fullname || 'Loading...'}!
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        {loadingData ? (
          <Loading  />
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
