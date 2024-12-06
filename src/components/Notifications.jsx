import React, { useEffect, useState } from 'react';
import { BellRing, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import axiosInstance from '@/api/axios';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { fetchAllNotifications } from '@/utils/notification';
import { formatTimestamp } from '@/utils/formatTimestamp';
import { NotificationModal } from './NotificationDetails';

export function Notifications({ className, ...props }) {
  const { token, user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState([]);
  const [timestamp, setTimestamp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (isAuthenticated && token) {
        try {
          const response = await fetchAllNotifications(token);
          setNotifications(response);
        } catch (error) {
          console.error('Error fetching notifications:', error);
          toast({
            title: 'Error',
            description: 'Failed to load notifications.',
            variant: 'destructive',
          });
        } finally {
          setLoading(false);
        }
      }
    };
    fetchNotifications();
  }, [isAuthenticated, token, timestamp, toast]);

  const markAllAsRead = () => {
    setNotifications([]);
    toast({
      title: 'Success',
      description: 'All notifications have been marked as read.',
      variant: 'default',
    });
  };

  console.log('Notifications:', notifications);

  return (
    <Card className={cn('border-none mr-20 w-full', className)} {...props}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          {notifications.length}{' '}
          {notifications.length === 1 ? 'notification' : 'notifications'}.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {loading ? (
          <p>Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <p className="text-muted-foreground">No notifications available.</p>
        ) : (
          <div className="max-h-72 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="mb-4 flex flex-col items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none mb-2">
                    {notification.sender} found your item!
                  </p>
                  <p className="text-[#5D7A8C] text-sm mt-1 mb-2">
                    Click to view details and get in touch.
                  </p>

                  <Button
                    className="w-full mt-4 bg-[#89A8B2] hover:bg-[#5D7A8C] text-white"
                    onClick={() => {
                      console.log('Selected notification:', notification);
                      setSelectedNotification(notification);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <NotificationModal
        notification={selectedNotification}
        onClose={() => setSelectedNotification(null)}
      />
    </Card>
  );
}
