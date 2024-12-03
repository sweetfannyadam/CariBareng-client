import React, { useState } from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { deleteMissingItem } from '@/utils/missings';

const DeleteDrawer = ({ id, token, onDeleted }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteMissingItem(token, id);
      console.log(`Item with ID: ${id} deleted successfully`);
      if (onDeleted) onDeleted();
    } catch (error) {
      console.error('Failed to delete item:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <Button
          className="bg-primary-foreground text-primary hover:text-primary-foreground hover:bg-primary border-2 border-primary-foreground py-[1.13rem] w-full shadow-lg"
        >
          <Trash2 />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Want to remove this item?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
            <Button variant="outline">Cancel</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DeleteDrawer;
