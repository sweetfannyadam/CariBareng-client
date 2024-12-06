import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpFormSchema, loginFormSchema } from '@/components/AuthSchema';
import { useAuth } from '@/context/AuthContext';
import axiosInstance from '@/api/axios';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useLocation } from 'react-router-dom';

const Auth = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('signUp');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const signUpForm = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      fullname: '',
      username: '',
      gmail: '',
      no_hp: '',
      password: '',
      confirm_password: '',
    },
  });

  const loginForm = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSignUp = async (values) => {
    setIsLoading(true);

    try {
      const payload = {
        fullname: values.fullname,
        username: values.username,
        gmail: values.gmail,
        no_hp: values.no_hp,
        password: values.password,
        confirm_password: values.confirm_password,
      };

      if (payload.password !== payload.confirm_password) {
        toast({
          variant: 'destructive',
          description: 'Password and confirm password do not match.',
        });
        return;
      }

      const response = await axiosInstance.post('/register', payload);

      toast({
        variant: 'default',
        description: 'Account created successfully. Please login to continue.',
      });

      navigate('/auth', { state: { signUpSuccess: true }, replace: true });
    } catch (error) {
      toast({
        variant: 'destructive',
        description:
          error.response?.data?.message || 'Failed to create account.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onLogin = async (values) => {
    setIsLoading(true);
    try {
      const payload = {
        username: values.username,
        password: values.password,
      };

      const response = await axiosInstance.post('/login', payload);

      const { accessToken, refreshToken } = response.data.data;
      

      login(accessToken, refreshToken);

      navigate('/browse-missing');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to login.',
        description:
          error.response?.data?.message ||
          'Invalid username or password. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.signUpSuccess) {
      setActiveTab('login');
    }
  }, [location.state]);

  return (
    <>
      <div className="flex items-baseline justify-center min-h-screen mt-20">
        <Tabs
          defaultValue="signUp"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signUp">Sign Up</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="signUp">
            <Card>
              <CardHeader>
                <CardTitle className="mb-0.5">Sign Up</CardTitle>
                <CardDescription>
                  Join us and start finding what you’re looking for.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Form {...signUpForm}>
                  <form
                    onSubmit={signUpForm.handleSubmit(onSignUp)}
                    className="space-y-8"
                  >
                    <FormField
                      control={signUpForm.control}
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
                              value={field.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
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
                              value={field.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
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
                              value={field.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
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
                              value={field.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              id="password"
                              type="password"
                              placeholder="Create a password"
                              {...field}
                              value={field.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={signUpForm.control}
                      name="confirm_password"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              id="confirm_password"
                              type="password"
                              placeholder="Re-enter your password"
                              {...field}
                              value={field.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <CardFooter className="justify-end">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Creating...' : 'Create Account'}
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Log In</CardTitle>
                <CardDescription>
                  Welcome back, log in to continue.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Form {...loginForm}>
                  <form
                    onSubmit={loginForm.handleSubmit(onLogin)}
                    className="space-y-8"
                  >
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              id="username"
                              type="text"
                              placeholder="Enter your username"
                              {...field}
                              value={field.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              id="password"
                              type="password"
                              placeholder="Enter your password"
                              {...field}
                              value={field.value || ''}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <CardFooter className="justify-end">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Processing...' : 'Login'}
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </>
  );
};

export default Auth;
