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
import { updateMissingItem } from '@/utils/missings'; // Path harus disesuaikan
import { useAuth } from '@/context/AuthContext';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addMissingItemFormSchema } from '@/schema/AddMissingItemSchema';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const UpdateItemLose = ({ tableId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(addMissingItemFormSchema),
    defaultValues: {
      title: '',
      category: '',
      date_time: '',
      last_viewed: '',
      description: '',
      image: [],
      contact: '',
      reward: '',
    },
  });

  const [location, setLocation] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();
  const { token } = useAuth();

  const categories = [
    'Electronics',
    'Clothing',
    'Documents',
    'Accessories',
    'Others',
  ];

  const onSubmit = async (values) => {
    setIsLoading(true);
    setIsUploading(true);
    setUploadStatus(null);
    setUploadProgress(0);

    try {
      const payload = {
        title: values.title,
        category: values.category,
        date_time: values.date_time,
        last_viewed: values.last_viewed,
        description: values.description,
        images: values.image, // Pastikan input image benar
        contact: values.contact,
        reward: values.reward,
        location: location ? { lat: String(location.lat), lng: String(location.lng) } : null,
        status: 'missing',
      };

      const response = await updateMissingItem(token, tableId, payload);
      console.log('Response:', response);

      setIsLoading(false);
      setIsUploading(false);
      setUploadStatus({
        type: 'success',
        message: 'Item updated successfully!',
      });

      toast({
        title: 'Success',
        description: 'The missing item has been updated successfully.',
        variant: 'success',
      });

      reset();
      navigate('/profile');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsUploading(false);
      setUploadStatus({
        type: 'error',
        message: 'Failed to update the item.',
      });

      toast({
        title: 'Error',
        description: 'Failed to update the item. Please try again later.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen lg:mt-10 transition-all ease-in-out">
      <Card className="w-[1000px]">
        <CardHeader>
          <CardTitle>Update Your Lost Item</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div>
                {/* Title */}
                <div>
                <Label htmlFor="title">Title Item</Label>
                <Input
                    id="title"
                    placeholder="Title of your item"
                    {...register('title')}
                />
                {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
                </div>

                {/* Category */}
                <div>
                <Label htmlFor="category">Category</Label>
                <select
                    id="category"
                    className="border border-gray-300 rounded-md p-2 w-full"
                    {...register('category')}
                >
                    <option value="" disabled>
                    Select a category
                    </option>
                    {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                    ))}
                </select>
                {errors.category && (
                    <p className="text-red-500 text-sm">{errors.category.message}</p>
                )}
                </div>

                {/* Date and Time */}
                <div>
                <Label htmlFor="date_time">Date and Time</Label>
                <Input
                    id="date_time"
                    type="datetime-local"
                    {...register('date_time')}
                />
                {errors.date_time && (
                    <p className="text-red-500 text-sm">{errors.date_time.message}</p>
                )}
                </div>
            </div>

            {/* Last Viewed */}
            <div>
              <Label htmlFor="last_viewed">Last Viewed Location</Label>
              <Input
                id="last_viewed"
                placeholder="Enter last viewed location"
                {...register('last_viewed')}
              />
              {errors.last_viewed && (
                <p className="text-red-500 text-sm">{errors.last_viewed.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Item Description</Label>
              <Textarea
                id="description"
                placeholder="Enter item description"
                {...register('description')}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message}</p>
              )}
            </div>

            {/* Contact */}
            <div>
              <Label htmlFor="contact">Contact Details</Label>
              <Input
                id="contact"
                placeholder="Your contact details"
                {...register('contact')}
              />
              {errors.contact && (
                <p className="text-red-500 text-sm">{errors.contact.message}</p>
              )}
            </div>

            {/* Reward */}
            <div>
              <Label htmlFor="reward">Reward (Optional)</Label>
              <Input id="reward" placeholder="Enter reward" {...register('reward')} />
            </div>

            {/* Map */}
            <div>
              <Label>Pick Location on Map:</Label>
              <InteractiveMap location={location} setLocation={setLocation} />
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Item'
              )}
            </Button>

            {/* Status Alert */}
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
                <AlertTitle>{uploadStatus.message}</AlertTitle>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateItemLose;
