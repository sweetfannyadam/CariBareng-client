import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createNotification } from '@/utils/notification';
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { CardFooter } from '@material-tailwind/react';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FoundThisItem = ({ missingItem }) => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Define the validation schema
  const foundThisItemFormSchema = z.object({
    description: z.string().nonempty('Item Description is required.'),
    location: z.string().nonempty('Where did you find this item is required.'),
    no_hp: z.string().nonempty('Phone Number is required.'),
    images: z
      .array(z.instanceof(File))
      .max(3, 'You can upload up to 3 images.'),
  });

  // Initialize the form with react-hook-form
  const foundThisItemForm = useForm({
    resolver: zodResolver(foundThisItemFormSchema),
    defaultValues: {
      description: '',
      location: '',
      no_hp: '',
      images: [],
    },
  });

  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = foundThisItemForm;

  const sendNotification = async (values) => {
    setIsLoading(true);
    const formData = new FormData();

    // Append the required fields to FormData
    formData.append('location', values.location);
    formData.append('description', values.description);
    formData.append('no_hp', values.no_hp);
    formData.append('missing_id', missingItem.id);
    formData.append('title', missingItem.title);

    // Append each file to FormData (up to 3 images)
    values.images.forEach((file) => {
      formData.append('image', file); // Use 'images[]' to indicate an array
    });

    try {
      console.log('Form Data: ', formData);
      const response = await createNotification(
        token,
        missingItem.users.username,
        formData
      );

      // for (let [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }
      console.log('Response:', response);
      navigate('/browse-missing');
    } catch (error) {
      console.error('Error creating notification:', error);
      toast({
        title: 'Error',
        description: 'Failed to create notification.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file input change
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setValue('images', files); // Set the files in the form state
  };

  const toggleDrawer = () => {
    console.log('Toggle Drawer');
    setIsOpen(!isOpen); // Toggle the drawer state
    console.log('Is Open: ', isOpen);
  };

  return (
    <Drawer open={isOpen} onOpenChange={toggleDrawer} className="z-50">
      <DrawerTrigger>
        <Button
          className="w-full bg-primary text-primary-foreground hover:bg-primary-foreground border-2 border-primary hover:text-primary shadow-lg"
          onClick={toggleDrawer}
        >
          I FOUND THIS ITEM
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <button
            onClick={toggleDrawer}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
          <DrawerHeader>
            <DrawerTitle>Have you really found this item?</DrawerTitle>
            <DrawerDescription className="mb-2">
              Please fill out the form below to indicate that you have found the
              right item.
            </DrawerDescription>
          </DrawerHeader>
          <Form {...foundThisItemForm}>
            <form
              onSubmit={handleSubmit(sendNotification)}
              className="flex flex-col gap-5"
            >
              <FormField
                control={control}
                name="location"
                render={({ field }) => (
                  <FormItem className="space-y-1 ">
                    <FormLabel>Where did you find this item?</FormLabel>
                    <FormControl>
                      <Input
                        id="location"
                        type="text"
                        placeholder="Please enter a location"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.location?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="no_hp"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        id="no_hp"
                        type="text"
                        placeholder="Enter your phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.no_hp?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Item Description</FormLabel>
                    <FormControl>
                      <Textarea
                        id="description"
                        placeholder="Describe the item"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.description?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="images"
                render={() => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-medium">
                      Upload Images
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="images"
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="mt-1"
                      />
                    </FormControl>
                    <FormMessage>{errors.images?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <CardFooter className="flex px-0 -mt-5 mb-5 justify-end w-full">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Processing...' : 'Report'}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FoundThisItem;
