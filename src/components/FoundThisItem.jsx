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

const FoundThisItem = ({ missingItem }) => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

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

    console.log('Images:', values.images);
    // formData.append('image', values.images);
    // Append each file to FormData (up to 3 images)
    values.images.forEach((file) => {
      formData.append('image', file); // Use 'images[]' to indicate an array
    });

    // Prepare the images array
    // const imagesArray = values.images.map((file) => {
    //   return file; // Create an object for each file
    // });

    // console.log('Images Array:', imagesArray);

    // // Append the images array to FormData
    // imagesArray.forEach((image) => {
    //   formData.append('images[]', JSON.stringify(image)); // Use 'images[]' to indicate an array
    // });

    try {
      console.log('Form Data: ', formData);
      const response = await createNotification(
        token,
        missingItem.users.username,
        formData
      );

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      console.log('Response:', response);
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

  return (
    <Drawer className="z-50">
      <DrawerTrigger>
        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary-foreground border-2 border-primary hover:text-primary shadow-lg">
          I FOUND THIS ITEM
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
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
              className="space-y-8"
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
              <CardFooter className="justify-end">
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
