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
import { useNavigate } from 'react-router-dom';

const DeleteDrawer = ({ id, token, onDeleted }) => {
  const [open, setOpen] = useState(false); // State untuk mengontrol status Drawer
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteMissingItem(token, id);
      console.log(`Item with ID: ${id} deleted successfully`);
      navigate('/profile');
      if (onDeleted) onDeleted();
      setOpen(false); // Tutup Drawer setelah penghapusan berhasil
    } catch (error) {
      console.error('Failed to delete item:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
      <Button
          className="bg-primary-foreground text-primary hover:text-primary-foreground hover:bg-primary border-2 border-primary-foreground py-[1.13rem] shadow-lg"
          onClick={() => setOpen(true)}
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
              className="bg-primary text-primary-foreground hover:bg-primary-foreground border-2 border-primary hover:text-primary"
            >
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DeleteDrawer;
