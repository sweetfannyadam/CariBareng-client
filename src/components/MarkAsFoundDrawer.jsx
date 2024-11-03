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
import { SquareCheckBig } from 'lucide-react';

export function MarkAsFoundDrawer() {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button
          className="text-gray-700 transition-colors duration-300 ease-in-out hover:text-black"
          variant="ghost"
          size="sm"
        >
          <SquareCheckBig />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Mark this item as found?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Yes</Button>
            <Button variant="outline">Cancel</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
export default MarkAsFoundDrawer;
