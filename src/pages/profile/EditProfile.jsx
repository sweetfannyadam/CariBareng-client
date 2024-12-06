import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { fetchUser, updateUser, uploadProfilePicture } from '@/utils/user';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  editProfileFormSchema,
  uploadProfilePictureFormSchema,
} from '@/schema/EditProfileSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BarLoader } from 'react-spinners';
import { AlertCircle, CheckCircle2, Loader2, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Avatar } from '@material-tailwind/react';

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { user, token, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const editProfileForm = useForm({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      // fullname: '',
      // username: '',
      // gmail: '',
      // no_hp: '',
      fullname: user?.fullname || '',

      no_hp: user?.no_hp || '',
    },
  });

  const uploadProfilePictureForm = useForm({
    resolver: zodResolver(uploadProfilePictureFormSchema),
    defaultValues: {
      file: '',
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);

    try {
      const payload = {
        fullname: values.fullname,
        // username: values.username,
        // gmail: values.gmail,
        no_hp: values.no_hp,
      };

      const response = await updateUser(token, payload);
      toast({
        variant: 'default',
        description: 'Profile updated',
      });

      navigate('/profile');
    } catch (error) {
      toast({
        variant: 'destructive',
        description:
          error.response?.data?.message || 'Failed to update profile.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onUpload = async (data) => {
    setIsUploading(true);
    setUploadStatus(null);
    setUploadProgress(0);

    const image = data.file[0];
    if (!image) {
      setUploadStatus({ type: 'error', message: 'No image selected.' });
      setIsUploading(false);
      return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await uploadProfilePicture(token, formData);
      setUploadStatus({
        type: 'success',
        message: 'File uploaded successfully!',
      });
    } catch (error) {
      console.error(error);
      setUploadStatus({
        type: 'error',
        message: error.message || 'File upload failed. Please try again.',
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      reset(); // Reset the form after upload
    }
  };

  const handleClose = () => {
    navigate('/profile'); // Navigate to the profile page or any other route
  };

  return (
    <div className="flex justify-center items-center p-5 lg:p-10 border-4 border-sky-500 rounded-2xl mt-10 my-20 mx-5 lg:mx-20 xl:mx-40 2xl:mx-[40rem] bg-slate-100 shadow-2xl">
      <div className="">
        <div className="flex flex-col">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
          <div
            id="profile-picture"
            className="flex justify-center items-center align-center mb-10"
          >
            <Avatar
              src={
                user?.profile_picture ||
                `https://avatar.iran.liara.run/username?username=${user.fullname}]`
              }
              alt="avatar"
              withBorder={true}
              className="w-40 h-40 border border-blue-gray-500 shadow-xl shadow-blue-gray-900/20 ring-4 ring-blue-gray-500/30"
            />
          </div>

          <Form
            {...uploadProfilePictureForm}
            onSubmit={handleSubmit(onUpload)}
            className="space-y-6"
          >
            <div>
              <Label
                htmlFor="file"
                className="text-sm font-medium"
                style={{ color: '#2C3E50' }}
              >
                Choose a file
              </Label>
              <Input
                id="file"
                type="file"
                {...register('file', {
                  required: 'Please select a file',
                  validate: {
                    lessThan10MB: (files) =>
                      files[0]?.size < 10000000 || 'Max 10MB',
                    acceptedFormats: (files) =>
                      ['image/jpeg', 'image/png', 'application/pdf'].includes(
                        files[0]?.type
                      ) || 'Only JPEG, PNG, or PDF files are allowed',
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

            <div className="flex justify-end mt-2">
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
          </Form>

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

        <Form {...editProfileForm}>
          <form
            onSubmit={editProfileForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={editProfileForm.control}
              name="fullname"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input
                      id="fullname"
                      type="text"
                      placeholder="Enter your fullname"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editProfileForm.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Choose a username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editProfileForm.control}
              name="gmail"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      id="gmail"
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editProfileForm.control}
              name="no_hp"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="justify-end p-0">
              <Button type="submit" className="mb-4" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Update Profile'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
