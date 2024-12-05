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
import { createMissingItem } from '@/utils/missings'; // Pastikan path sesuai
import { useAuth } from '@/context/AuthContext';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addMissingItemFormSchema } from '@/schema/AddMissingItemSchema';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import categories from "@/assets/data/categories.js"

const AddItemLose = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [location, setLocation] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const { toast } = useToast();
  const { user, token, logout, isAuthenticated } = useAuth();

  const addMissingItemForm = useForm({
    resolver: zodResolver(addMissingItemFormSchema),
    defaultValues: {
      title: '',
      category: '',
      date_time: '',
      last_viewed: '',
      description: '',
      image: ['', '', ''],
      contact: '',
      reward: '',
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    setIsSubmitting(true);
    setIsUploading(true);
    setUploadStatus(null);
    setUploadProgress(0);

    const images = data.file[0];
    if (!images) {
      setUploadStatus({ type: 'error', message: 'No images selected.' });
      setIsUploading(false);
      return;
    }

    // Create FormData
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    formData.append('images', images);

    try {
      const payload = {
        title: values.title,
        category: values.category,
        date_time: values.date_time,
        last_viewed: values.last_viewed,
        description: values.description,
        images: formData,
        contact: values.contact,
        reward: values.reward,
        location: {
          lat: String(location.lat),
          lng: String(location.lng),
        },
        status: 'missing',
      };

      const response = await createMissingItem(token, payload);
      console.log('image', images);
      console.log('Response:', response);
      setIsLoading(false);
      setIsSubmitting(false);
      setIsUploading(false);
      setUploadStatus({
        type: 'success',
        message: 'File uploaded successfully!',
      });

      reset();
      navigate('/profile');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
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
          <div className="grid gap-2">
            <div className="grid md:grid-cols-3 gap-5">
              {/* Title */}
              <div>
                <Label htmlFor="title">Title Item</Label>
                <Input
                  name="title"
                  id="title"
                  placeholder="Title of your item"
                  value={addMissingItemForm.title}
                  onChange={(e) =>
                    setFormData({
                      ...addMissingItemForm,
                      title: e.target.value,
                    })
                  }
                />
                {errors.title && (
                  <span className="text-red-500">{errors.title}</span>
                )}
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  name="category"
                  id="category"
                  value={addMissingItemForm.category}
                  onChange={(e) =>
                    setFormData({
                      ...addMissingItemForm,
                      category: e.target.value,
                    })
                  }
                  className="border border-gray-300 rounded-md p-2 w-full"
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
                  <span className="text-red-500">{errors.category}</span>
                )}
              </div>

              {/* Date and Time */}
              <div>
                <Label htmlFor="date_time">Date and Time</Label>
                <Input
                  name="date_time"
                  type="datetime-local"
                  id="date_time"
                  value={addMissingItemForm.date_time}
                  onChange={(e) =>
                    setFormData({
                      ...addMissingItemForm,
                      date_time: e.target.value,
                    })
                  }
                />
                {errors.date_time && (
                  <span className="text-red-500">{errors.date_time}</span>
                )}
              </div>
            </div>

            {/* Last Viewed Location */}
            <div>
              <Label htmlFor="last_viewed">Last Viewed Location</Label>
              <Input
                name="last_viewed"
                id="last_viewed"
                placeholder="Enter your last viewed location"
                value={addMissingItemForm.last_viewed}
                onChange={(e) =>
                  setFormData({
                    ...addMissingItemForm,
                    last_viewed: e.target.value,
                  })
                }
              />
              {errors.last_viewed && (
                <span className="text-red-500">{errors.last_viewed}</span>
              )}
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Item Description</Label>
              <Textarea
                name="description"
                id="description"
                placeholder="Enter your item description"
                value={addMissingItemForm.description}
                onChange={(e) =>
                  setFormData({
                    ...addMissingItemForm,
                    description: e.target.value,
                  })
                }
              />
              {errors.description && (
                <span className="text-red-500">{errors.description}</span>
              )}
            </div>

            {/* Images */}
            <div className="flex flex-col">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label
                    htmlFor="file"
                    className="text-sm font-medium"
                    style={{ color: '#2C3E50' }}
                  >
                    Choose a file
                  </Label>
                  <Input
                    name="file"
                    id="file"
                    type="file"
                    {...register('file', {
                      required: 'Please select a file',
                      validate: {
                        lessThan10MB: (files) =>
                          files[0]?.size < 10000000 || 'Max 10MB',
                        acceptedFormats: (files) =>
                          [
                            'image/jpeg',
                            'image/png',
                            'application/pdf',
                          ].includes(files[0]?.type) ||
                          'Only JPEG, PNG, or PDF files are allowed',
                      },
                    })}
                    className="mt-1"
                    disabled={isUploading}
                  />
                  {errors.file && (
                    <p className="mt-1 text-sm" style={{ color: '#e74c3c' }}>
                      {errors.file.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isUploading}
                    style={{
                      backgroundColor: '#89A8B2',
                      color: 'white',
                      '&:hover': { backgroundColor: '#5D7A8C' },
                    }}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading
                      </>
                    ) : (
                      'Upload'
                    )}
                  </Button>
                </div>
              </form>

              {isUploading && (
                <div className="mt-4">
                  <Progress value={uploadProgress} className="w-full" />
                  <p
                    className="text-sm text-center mt-2"
                    style={{ color: '#2C3E50' }}
                  >
                    Uploading: {uploadProgress}%
                  </p>
                </div>
              )}

              {uploadStatus && (
                <Alert
                  className="mt-4"
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
            </div>
            {/* <div className="grid grid-cols-3 gap-5">
              {formData.image.map((image, index) => (
                <div key={index}>
                  <Label htmlFor={`image-${index}`}>Image {index + 1}</Label>
                  <Input
                    type="file"
                    id={`image-${index}`}
                    onChange={(e) => {
                      const newImage = [...formData.image];
                      newImage[index] = e.target.files[0];
                      setFormData({ ...formData, image: newImage });
                    }}
                  />
                </div>
              ))}
            </div> */}

            {/* Contact and Reward */}
            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <Label htmlFor="contact">Detail Contact</Label>
                <Input
                  id="contact"
                  placeholder="Input your contact"
                  value={addMissingItemForm.contact}
                  onChange={(e) =>
                    setFormData({
                      ...addMissingItemForm,
                      contact: e.target.value,
                    })
                  }
                />
                {errors.contact && (
                  <span className="text-red-500">{errors.contact}</span>
                )}
              </div>
              <div>
                <Label htmlFor="reward">Reward (Optional)</Label>
                <Input
                  id="reward"
                  placeholder="Enter reward (optional)"
                  value={addMissingItemForm.reward}
                  onChange={(e) =>
                    setFormData({ ...formData, reward: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Map */}
            <div className="rounded-lg">
              <Label className="mb-2">Pick Location on Map:</Label>
              <InteractiveMap location={location} setLocation={setLocation} />
              {errors.location && (
                <span className="text-red-500">{errors.location}</span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <Button disabled>
                <Loader2 className="animate-spin" />
                Please wait
              </Button>
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
