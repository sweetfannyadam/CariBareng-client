import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Archive, Pencil, Edit } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function MissingItemCard({ title, category, image, count }) {
  console.log(title, category, image, count);
  return (
    <div className="mb-8">
      {/* Posts */}
      <Card>
        <CardContent className="p-4">
          <div className="flex aspect-square rounded-md mb-2 items-center justify-center">
            <img src={image} alt="item-image" className="h-1/2 rounded-md" />
          </div>
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
          <Button
            className="text-gray-700 transition-colors duration-300 ease-in-out hover:text-black"
            variant="ghost"
            size="sm"
          >
            <Archive />
          </Button>

          <Button
            className="text-gray-700 transition-colors duration-300 ease-in-out hover:text-black"
            variant="ghost"
            size="sm"
          >
            <Trash2 />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
