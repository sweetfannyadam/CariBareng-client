import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  editProfileFormSchema,
  uploadProfilePictureFormSchema,
} from '@/schema/EditProfileSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { updateUser, uploadProfilePicture } from '@/utils/user';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const EditProfile = () => {
  const { register, handleSubmit } = useForm();
  const { user, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const editProfileForm = useForm({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      fullname: '',
      username: '',
      gmail: '',
      no_hp: '',
      password: '',
      confirm_password: '',
    },
  });

  const uploadProfilePictureForm = useForm({
    resolver: zodResolver(uploadProfilePictureFormSchema),
    defaultValues: {
      file: '',
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
    setIsLoading(true);

    try {
      const payload = {
        fullname: values.fullname,
        username: values.username,
        gmail: values.gmail,
        no_hp: values.no_hp,
      };

      updateUser(payload);
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
    console.log('Clicked on upload button');
    const formData = new FormData();
    formData.append('file', data.file[0]);

    console.log('Image Data:', ...formData.entries());

    // try {
    //   uploadProfilePicture(token, formData);

    //   toast({
    //     variant: 'default',
    //     description: 'Profile picture updated!',
    //   });

    //   return response.data.data;
    // } catch (error) {
    //   console.error('Error uploading profile picture:', error);
    // }
  };

  return (
    <div className="flex justify-center items-center p-5 lg:p-10 xl:p-20 border-4 border-sky-500 rounded-2xl my-20 mx-5 lg:mx-20 xl:mx-40 2xl:mx-60 bg-slate-100 shadow-2xl">
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="flex flex-col">
          <img
            className="border-2 border-sky-500 mb-5"
            src="../missing-found.jpg"
            alt="foto [username]"
          />
          <Form {...uploadProfilePictureForm}>
            <form
              onSubmit={handleSubmit(onUpload)}
              className="flex flex-col gap-2"
            >
              <FormField
                control={uploadProfilePictureForm.control}
                name="Profile Picture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <Input
                        {...uploadProfilePictureForm}
                        type="file"
                        // accept="jpeg,jpg,png"
                        {...register('file')}
                        // onChange={(event) =>
                        //   onChange(event.target.files && event.target.files[0])
                        // }
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Upload</Button>
            </form>
          </Form>
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
                      placeholder="Edit your fullname"
                      {...field}
                      value={field.value || user.fullname}
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
                      value={field.value || user.username}
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
                      value={field.value || user.gmail}
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
                      value={field.value || user.no_hp}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Profile'}
              </Button>
            </CardFooter>
          </form>
        </Form>
        {/* <form action="" className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="[Username]"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="[Email]"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="telephone">Phone Number</Label>
            <Input
              type="number"
              name="telephone"
              id="telephone"
              placeholder="[no phone]"
            />
          </div>
          <div>
            <Label htmlFor="about_me">About Me</Label>
            <Textarea className="h-60" name="about_me" id="about_me"></Textarea>
            <span>Tulis cerita singkat tentang diri Anda.</span>
          </div>
          <Input
            type="submit"
            value="Update Profile"
            className="bg-sky-500 text-white"
          />
        </form> */}
      </div>
    </div>
  );
};

export default EditProfile;

// import React from 'react';
// import { useForm } from 'react-hook-form';

// function App() {
//   const { register, handleSubmit } = useForm();

//   const onSubmit = async (data) => {
//     const formData = new FormData();
//     formData.append('file', data.file[0]);
//     console.log(data.file[0]);

//     const res = await fetch('http://localhost:5000/upload-file', {
//       method: 'POST',
//       body: formData,
//     }).then((res) => res.json());
//     alert(JSON.stringify(`${res.message}, status: ${res.status}`));
//   };

//   return (
//     <div className="App">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input type="file" {...register('file')} />

//         <input type="submit" />
//       </form>
//     </div>
//   );
// }

// export default App;
