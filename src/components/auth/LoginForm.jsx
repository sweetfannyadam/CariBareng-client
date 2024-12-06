import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginFormSchema } from '@/components/AuthSchema';
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
import { onLogin } from '@/api/authAPI';

export const LoginForm = ({ onLogin, isLoading }) => {
  const [isLoading, setIsLoading] = useState(false);
  const loginForm = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleLogin = async (values) => {
    await onLogin(values, setIsLoading); // Pass the loading setter to API function
  };

  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(handleLogin)}
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
  );
};
