import React from 'react';
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

export function DeleteDrawer() {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button
          className="bg-primary-foreground text-primary hover:bg-primary border-2 border-primary-foreground py-[1.13rem]"
          variant="ghost"
          size="sm"
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
            <Button>Delete</Button>
            <Button variant="outline">Cancel</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
export default DeleteDrawer;
