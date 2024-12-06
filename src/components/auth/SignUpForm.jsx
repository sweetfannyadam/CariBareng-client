import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpFormSchema } from '@/components/AuthSchema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { CardFooter } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { onSignUp } from '@/api/authAPI';
import { useState } from 'react';

export const SignUpForm = () => {
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

  const handleSignUp = async (values) => {
    await onSignUp(values, setIsLoading);
  };
  return (
    <Form {...signUpForm}>
      <form
        onSubmit={signUpForm.handleSubmit(handleSignUp)}
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
  );
};
