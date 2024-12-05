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
import { useNavigate } from 'react-router-dom';
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
import { CalendarIcon } from 'lucide-react';
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

  // Calendar Schema and Form
  const calendarSchema = z.object({
    date: z.date({ required_error: 'Date is required.' }),
  });

  const calendarForm = useForm({
    resolver: zodResolver(calendarSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Main Form for Missing Item
  const addMissingItemForm = useForm({
    resolver: zodResolver(addMissingItemFormSchema),
    defaultValues: {
      title: '',
      category: '',
      date_time: '',
      last_viewed: '',
      description: '',
      file: null,
      contact: '',
      reward: '',
    },
  });

  const onSubmit = async (values) => {
    console.log('Button Clicked', values);
    setIsUploading(true);
    setUploadStatus(null);
    setUploadProgress(0);
    setIsSubmitting(true);

    try {
      // Check if files are selected
      if (!values.file || values.file.length === 0) {
        setUploadStatus({ type: 'error', message: 'No images selected.' });
        setIsUploading(false);
        return;
      }

      // Prepare FormData
      const formData = new FormData();
      Array.from(values.file).forEach((file) => {
        formData.append('images', file);
      });

      // Ensure location is available
      if (!location || !location.lat || !location.lng) {
        setUploadStatus({
          type: 'error',
          message: 'Please pick a location on the map.',
        });
        setIsUploading(false);
        return;
      }

      // Construct payload
      const payload = {
        title: values.title,
        category: values.category,
        date_time: values.date_time,
        last_viewed: values.last_viewed,
        description: values.description,
        contact: values.contact,
        reward: values.reward,
        location: {
          lat: location.lat.toString(),
          lng: location.lng.toString(),
        },
        status: 'missing',
      };

      // Add the rest of the form data fields
      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key]);
      });

      // Call API
      const response = await createMissingItem(token, formData);
      console.log('API Response:', response);

      // Handle success
      setUploadStatus({
        type: 'success',
        message: 'Item posted successfully!',
      });

      // Reset form and navigate
      addMissingItemForm.reset();
      navigate('/profile');
    } catch (error) {
      console.error(error);
      setUploadStatus({
        type: 'error',
        message: error.message || 'Failed to post item',
      });
    } finally {
      setIsUploading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen lg:mt-10 transition-all ease-in-out">
      <Card className="w-[1000px]">
        <CardHeader>
          <CardTitle>Post Your Lost Item</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...addMissingItemForm}>
            <form
              onSubmit={addMissingItemForm.handleSubmit(onSubmit)}
              className="grid gap-4"
            >
              {/* Title Field */}
              <FormField
                control={addMissingItemForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title Item</FormLabel>
                    <FormControl>
                      <Input placeholder="Title of your item" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category Field */}
              <FormField
                control={addMissingItemForm.control}
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date Field */}
              <FormField
                control={addMissingItemForm.control}
                name="date_time"
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Viewed Location Field */}
              <FormField
                control={addMissingItemForm.control}
                name="last_viewed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Viewed Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your last viewed location"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description Field */}
              <FormField
                control={addMissingItemForm.control}
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contact Field */}
              <FormField
                control={addMissingItemForm.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detail Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="Input your contact" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Reward Field */}
              <FormField
                control={addMissingItemForm.control}
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
                control={addMissingItemForm.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="file"
                      className="text-sm font-medium"
                      style={{ color: '#2C3E50' }}
                    >
                      Choose Files
                    </FormLabel>
                    <FormControl>
                      <Input
                        name="file"
                        id="file"
                        type="file"
                        multiple
                        {...register('file', {
                          required: 'Please select a file',
                          validate: {
                            lessThan2MB: (files) =>
                              files[0]?.size < 2000000 || 'Max 2MB',
                            acceptedFormats: (files) =>
                              ['image/jpeg', 'image/png'].includes(
                                files[0]?.type
                              ) || 'Only JPEG and PNG files are allowed',
                          },
                        })}
                        className="mt-1"
                        disabled={isUploading}
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
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
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit" onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              'Post Item'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddItemLose;
