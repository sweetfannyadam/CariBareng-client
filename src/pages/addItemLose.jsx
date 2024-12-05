import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import InteractiveMap from '@/components/InteractiveMapTracker';
import { createMissingItem } from '@/utils/missings'; // Pastikan path sesuai
import { useAuth } from '@/context/AuthContext';

const AddItemLose = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date_time: '',
    last_viewed: '',
    description: '',
    image: ['', '', ''],
    contact: '',
    reward: '',
  });
  const [errors, setErrors] = useState({});
  const [location, setLocation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const { token } = useAuth();

  const categories = ['Electronics', 'Clothing', 'Documents', 'Accessories', 'Others'];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required.';
    if (!formData.category) newErrors.category = 'Category is required.';
    if (!formData.date_time) newErrors.date_time = 'Date and time are required.';
    if (!formData.last_viewed) newErrors.last_viewed = 'Last viewed location is required.';
    if (!formData.description) newErrors.description = 'Description is required.';
    if (!formData.contact) newErrors.contact = 'Contact is required.';
    if (!location) newErrors.location = 'Location must be selected.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Data untuk createMissingItem
      const payload = {
        title: formData.title,
        category: formData.category,
        date_time: formData.date_time,
        last_viewed: formData.last_viewed,
        description: formData.description,
        image: formData.image,
        contact: formData.contact,
        reward: formData.reward,
        location: {
          lat: String(location.lat), 
          lng: String(location.lng),
        },
        status: 'missing',
      };

      console.log(formData.image)

      const createdItem = await createMissingItem(payload, token);
      console.log('Item created:', createdItem);
    } catch (error) {
      console.error('Error during submission:', error);
      alert('Terjadi kesalahan saat memposting item.');
    } finally {
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
                  id="title"
                  placeholder="Title of your item"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                {errors.title && <span className="text-red-500">{errors.title}</span>}
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                {errors.category && <span className="text-red-500">{errors.category}</span>}
              </div>

              {/* Date and Time */}
              <div>
                <Label htmlFor="date_time">Date and Time</Label>
                <Input
                  type="datetime-local"
                  id="date_time"
                  value={formData.date_time}
                  onChange={(e) => setFormData({ ...formData, date_time: e.target.value })}
                />
                {errors.date_time && <span className="text-red-500">{errors.date_time}</span>}
              </div>
            </div>

            {/* Last Viewed Location */}
            <div>
              <Label htmlFor="last_viewed">Last Viewed Location</Label>
              <Input
                id="last_viewed"
                placeholder="Enter your last viewed location"
                value={formData.last_viewed}
                onChange={(e) => setFormData({ ...formData, last_viewed: e.target.value })}
              />
              {errors.last_viewed && <span className="text-red-500">{errors.last_viewed}</span>}
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Item Description</Label>
              <Textarea
                id="description"
                placeholder="Enter your item description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              {errors.description && <span className="text-red-500">{errors.description}</span>}
            </div>

            {/* Images */}
            <div className="grid grid-cols-3 gap-5">
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
            </div>

            {/* Contact and Reward */}
            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <Label htmlFor="contact">Detail Contact</Label>
                <Input
                  id="contact"
                  placeholder="Input your contact"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                />
                {errors.contact && <span className="text-red-500">{errors.contact}</span>}
              </div>
              <div>
                <Label htmlFor="reward">Reward (Optional)</Label>
                <Input
                  id="reward"
                  placeholder="Enter reward (optional)"
                  value={formData.reward}
                  onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
                />
              </div>
            </div>

            {/* Map */}
            <div className="rounded-lg">
              <Label className="mb-2">Pick Location on Map:</Label>
              <InteractiveMap location={location} setLocation={setLocation} />
              {errors.location && <span className="text-red-500">{errors.location}</span>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Posting...' : 'Post Item'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddItemLose;