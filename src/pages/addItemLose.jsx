import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InteractiveMap from '@/components/InteractiveMapTracker';
import { createMissingItem } from '@/utils/missings';
import { useAuth } from '@/context/AuthContext';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addMissingItemFormSchema } from '@/schema/AddMissingItemSchema';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { Calendar } from '@/components/ui/calendar';
import categories from '@/assets/data/categories';

const AddItemLose = () => {
  const [location, setLocation] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { token } = useAuth();
  const routeLocation = useLocation();
  const pathname = routeLocation.pathname;

  // Main Form for Missing Item
  const addMissingItemForm = useForm({
    resolver: zodResolver(addMissingItemFormSchema),
    defaultValues: {
      title: '',
      category: '',
      date_time: '',
      last_viewed: '',
      description: '',
      images: [], // Changed from file to images
      contact: '',
      reward: '',
    },
  });

  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = addMissingItemForm;

  const onSubmit = async (values) => {
    console.log('onSubmit: ', values);
    setIsUploading(true);
    setUploadStatus(null);

    setIsSubmitting(true);

    const formData = new FormData();

    // Append the required fields to FormData
    formData.append('status', 'Missing');
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('last_viewed', values.last_viewed);
    formData.append('date_time', values.date_time);
    formData.append('contact', values.contact);
    formData.append('category', values.category);
    formData.append('reward', values.reward);
    formData.append('location[lat]', location.lat);
    formData.append('location[lng]', location.lng);

    // Append each file to FormData (up to 3 images)
    if (values.images && values.images.length > 0) {
      values.images.forEach((file) => {
        formData.append('image', file); // Use 'images[]' to indicate an array
      });
    } else {
      setUploadStatus({ type: 'error', message: 'No images selected.' });
      setIsUploading(false);
      return;
    }

    try {
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      const response = await createMissingItem(token, formData);
      console.log('Response:', response);
      setUploadStatus({
        type: 'success',
        message: 'Item posted successfully!',
      });
      toast({
        title: 'Success',
        description: 'Item posted successfully!',
      });
      // addMissingItemForm.reset();
      // navigate('/profile');
    } catch (error) {
      console.error('Error creating notification:', error);
      toast({
        title: 'Error',
        description: 'Failed to create notification.',
        variant: 'destructive',
      });
      setUploadStatus({
        type: 'error',
        message: error.message || 'Failed to post item',
      });
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  // Handle file input change
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setValue('images', files); // Set the files in the form state
  };

  const handleClose = () => {
    console.log('Pathname: ', pathname);
    pathname !== '/browser' ? navigate('/browse') : navigate('/profile');
  };

  return (
    <div className="flex items-center justify-center min-h-screen lg:mt-10 transition-all ease-in-out">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
        aria-label="Close"
      >
        <X className="h-5 w-5 text-gray-700" />
      </button>
      <Card className="w-[1000px]">
        <CardHeader>
          <CardTitle>Post Your Lost Item</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...addMissingItemForm}>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              {/* Title Field */}
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title Item</FormLabel>
                    <FormControl>
                      <Input
                        name="title"
                        type="text"
                        id="title"
                        placeholder="Title of your item"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.title?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Category Field */}
              <FormField
                control={control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Item Categories</SelectLabel>
                          {categories.map((category) => (
                            <SelectItem
                              name="category"
                              id="category"
                              className="cursor-pointer"
                              key={category}
                              value={category}
                            >
                              {category}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage>{errors.category?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Date Field */}
              <FormField
                control={control}
                name="date_time"
                id="date_time"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date and Time</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(new Date(field.value), 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(date?.toISOString())
                          }
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage>{errors.date_time?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Last Viewed Location Field */}
              <FormField
                control={control}
                name="last_viewed"
                id="last_viewed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Viewed Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your last viewed location"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.last_viewed?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Description Field */}
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your item description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage>{errors.description?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Contact Field */}
              <FormField
                control={control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detail Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="Input your contact" {...field} />
                    </FormControl>
                    <FormMessage>{errors.contact?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Reward Field */}
              <FormField
                control={control}
                name="reward"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reward (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter reward (optional)" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Map Component */}
              <div className="rounded-lg">
                <Label className="mb-2">Pick Location on Map:</Label>
                <InteractiveMap location={location} setLocation={setLocation} />
              </div>

              {/* File Upload */}
              <FormField
                control={control}
                name="images"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Choose Files
                    </FormLabel>
                    <FormControl>
                      <Input
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

              {isUploading && (
                <Progress value={uploadProgress} className="w-full" />
              )}

              {uploadStatus && (
                <Alert
                  variant={
                    uploadStatus.type === 'success' ? 'default' : 'destructive'
                  }
                >
                  {uploadStatus.type === 'success' ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertTitle>
                    {uploadStatus.type === 'success' ? 'Success' : 'Error'}
                  </AlertTitle>
                  <AlertDescription>{uploadStatus.message}</AlertDescription>
                </Alert>
              )}
              <Button
                type="submit"
                onClick={() => {
                  handleSubmit(onSubmit(addMissingItemForm.getValues()));
                  console.log('values', addMissingItemForm.getValues());
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  'Post Item'
                )}
              </Button>
            </form>
          </Form>
          <CardFooter className="justify-end"></CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddItemLose;
