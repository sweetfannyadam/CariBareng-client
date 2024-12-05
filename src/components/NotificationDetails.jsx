import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatTimestamp } from '@/utils/formatTimestamp';
import { approveMissingItem } from '@/utils/missings';
import { fetchNotification } from '@/utils/notification';
import { useAuth } from '@/context/AuthContext';
import axiosInstance from '@/api/axios';

export function NotificationModal({ notification, onClose }) {
  const { token } = useAuth();
  const [toggle, setToggle] = useState(null);
  const [notificationDetails, setNotificationDetails] = useState(null);

  useEffect(() => {
    if (!notification) return;

    const fetchNotificationDetails = async () => {
      try {
        const response = await fetchNotification(token, notification.id);
        setNotificationDetails(response.data.data);
      } catch (error) {
        console.error('Error fetching notification details:', error);
      }
    };

    fetchNotificationDetails();
  }, [notification, token]); // Remove notificationDetails from dependency array

  const approveNotification = async () => {
    // Remove toggle parameter
    if (notificationDetails) {
      // Check if details are loaded
      try {
        const payload = {
          toggle: 'true', // Directly set to true
          tableId: notificationDetails.notification.missing_id,
        };
        console.log('Payload:', payload);
        const response = await approveMissingItem(token, payload);
        console.log('Notification approved:', response);

        onClose(); // Close the modal after approval
      } catch (error) {
        console.error('Error approving notification:', error);
      }
    }
  };
  //   const fetchNotificationDetails = async () => {
  //     try {
  //       const response = await fetchNotification(token, notification.id);
  //       console.log('Response:', response.data.data);
  //       setNotificationDetails(response.data.data);
  //     } catch (error) {
  //       console.error('Error fetching notification details:', error);
  //     }
  //   };
  //   const approveNotification = async (toggle) => {
  //     if (toggle) {
  //       const payload = {
  //         toggle: toggle,
  //         tableId: notificationDetails.tableId,
  //       };
  //       await approveMissingItem(token, payload);
  //       setToggle(null);
  //       try {
  //         // const response = await approveMissingItem(token, payload);
  //         console.log('Notification approved:', response);
  //       } catch (error) {
  //         console.error('Error approving notification:', error);
  //       }
  //     }
  //   };
  //   fetchNotificationDetails();
  //   approveNotification(toggle);
  // }, [notification, token, notificationDetails, toggle]);

  if (!notificationDetails) {
    return null;
  }
  return (
    <Dialog
      open={!!notification}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{notificationDetails.title}</DialogTitle>
          <DialogDescription>
            {notificationDetails.description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Founder:</span>
            <span className="col-span-3">{notificationDetails.sender}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Description:</span>
            <span className="col-span-3">
              {notificationDetails.notification.description}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Location:</span>
            <span className="col-span-3">
              {notificationDetails.notification.location}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Contact:</span>
            <span className="col-span-3">
              {notificationDetails.notification.no_hp}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-bold">Date:</span>
            <span className="col-span-3">
              {notificationDetails.notification.created_at}
            </span>
          </div>
          {notificationDetails.images &&
            notificationDetails.images.length > 0 && (
              <div className="mt-4">
                <h4 className="font-bold mb-2">Images:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {notificationDetails.images.map((image, index) => (
                    <img
                      key={image.image_id}
                      src={image.image_url}
                      alt={`Notification image ${index + 1}`}
                      width={150}
                      height={150}
                      className="rounded-md object-cover"
                    />
                  ))}
                </div>
              </div>
            )}
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              onClose();
              console.log('Close button clicked');
            }}
          >
            Close
          </Button>

          <Button
            onClick={approveNotification}
            className="mb-2 bg-[#89A8B2] hover:bg-[#5D7A8C] text-white"
          >
            Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
