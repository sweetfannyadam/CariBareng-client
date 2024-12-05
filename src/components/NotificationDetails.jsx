import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const NotificationItem = ({ notification }) => {
  const { images, sender } = notification;

  return (
    <Card className="w-full max-w-md bg-[#F5F7F8] border-[#89A8B2] mb-4">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          {images && images.length > 0 && (
            <img
              src={images[0].image_url}
              alt="Item"
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div className="flex-1">
            <p className="text-[#2C3E50] font-semibold">
              {sender} found your item!
            </p>
            <p className="text-[#5D7A8C] text-sm mt-1">
              Click to view details and get in touch.
            </p>
          </div>
        </div>
        <Button
          className="w-full mt-4 bg-[#89A8B2] hover:bg-[#5D7A8C] text-white"
          onClick={() => {
            /* Handle view details */
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotificationItem;
