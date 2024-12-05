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

export function CardDemo({ className, ...props }) {
  const { token, user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState([]);
  const [timestamp, setTimestamp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (isAuthenticated && token) {
        try {
          const response = await fetchAllNotifications(token);
          console.log('Notifications:', response);
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

  console.log('Notifications:', notifications); // Log the notifications

  return (
    <Card className={cn('border-none mr-20 w-full', className)} {...props}>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          {notifications.length} unread{' '}
          {notifications.length === 1 ? 'message' : 'messages'}.
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
                      /* Handle view details */
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
    </Card>
  );
}

// import React, { useEffect, useState } from 'react';
// import { BellRing, Check } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import axiosInstance from '@/api/axios';
// import { useAuth } from '@/context/AuthContext';

// const notifications = [
//   {
//     title: 'Your call has been confirmed.',
//     description: '1 hour ago',
//   },
//   {
//     title: 'You have a new message!',
//     description: '1 hour ago',
//   },
//   {
//     title: 'Your subscription is expiring soon!',
//     description: '2 hours ago',
//   },
// ];

// export function CardDemo({ className, ...props }) {
//   const { token, user, isAuthenticated } = useAuth();
//   console.log('Token: ', token);
//   console.log('user: ', user);
//   console.log('Token: ', token);
//   const [open, setOpen] = useState(false);
//   // const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     if (isAuthenticated && token) {
//       try {
//         const response = axiosInstance.get(`/notifications/`);
//         setNotifications(response.data);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       }
//     }
//   }, [isAuthenticated, token]);

//   return (
//     <Card className={cn('border-none mr-20 w-full', className)} {...props}>
//       <CardHeader>
//         <CardTitle>Notifications</CardTitle>
//         <CardDescription>You have 3 unread messages.</CardDescription>
//       </CardHeader>
//       <CardContent className="grid gap-4">
//         <div>
//           {notifications.map((notification, index) => (
//             <div
//               key={index}
//               className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
//             >
//               <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
//               <div className="space-y-1">
//                 <p className="text-sm font-medium leading-none">
//                   {notification.title}
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   {notification.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//       <CardFooter>
//         <Button className="w-full">
//           <Check /> Mark all as read
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
