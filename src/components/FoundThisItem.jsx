import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import { Button } from './ui/button';
import { Form } from './ui/form';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useEffect, useState } from 'react';
import { createNotification } from '@/utils/notification';

const FoundThisItem = ({ title, token, username }) => {
  const [formData, setFormData] = useState({
    title: title,
    location: '',
    no_hp: '',
    description: '',
    image: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const sendNotification = async (data) => {
      const payload = {
        title: formData.title,
        location: formData.location,
        no_hp: formData.no_hp,
        description: formData.description,
        image: formData.image,
      };
    };
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.location)
      newErrors.location = 'Where did you find is required.';
    if (!formData.no_hp) newErrors.no_hp = 'Phone Number is required.';
    if (!formData.description)
      newErrors.description = 'Item Description is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const payload = {
        title: formData.title,
        location: formData.location,
        no_hp: formData.no_hp,
        description: formData.description,
        image: formData.image,
      };
      const createdItem = await createNotification(payload, token, username);
      console.log('Item created:', createdItem);
    } catch (error) {
      console.error('Error during submission:', error);
      alert('Terjadi kesalahan saat memposting item.');
    }
  };

  return (
    <Drawer className="z-50">
      <DrawerTrigger>
        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary-foreground border-2 border-primary hover:text-primary shadow-lg">
          I FOUND THIS ITEM
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Have you really found this item?</DrawerTitle>
            <DrawerDescription className="mb-2">
              Please fill out the form below to indicate that you have found the
              right item.
            </DrawerDescription>
            <Form>
              <Label className="text-start" htmlFor="location">
                Where did you find
              </Label>
              <Input
                type="text"
                id="location"
                name="location"
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
              {errors.location && (
                <span className="text-red-500">{errors.location}</span>
              )}

              <Label className="text-start" htmlFor="no_hp">
                Phone Number
              </Label>
              <Input
                type="text"
                id="no_hp"
                name="no_hp"
                onChange={(e) =>
                  setFormData({ ...formData, no_hp: e.target.value })
                }
              />
              {errors.no_hp && (
                <span className="text-red-500">{errors.no_hp}</span>
              )}

              <Label className="text-start" htmlFor="description">
                Item Description
              </Label>
              <Textarea
                type="text"
                id="description"
                name="description"
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              {errors.description && (
                <span className="text-red-500">{errors.description}</span>
              )}

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
                        lessThan2MB: (files) =>
                          files[0]?.size < 2000000 || 'Max 2MB',
                        acceptedFormats: (files) =>
                          ['image/jpeg', 'image/png'].includes(
                            files[0]?.type
                          ) || 'Only JPEG and PNG files are allowed',
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

                <div className="flex justify-end">
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
              {/* <div className="grid grid-flow-col gap-5">
                <div>
                  <Label htmlFor={`image-1`}>Image </Label>
                  <Input
                    type="file"
                    id={`image`}
                    multiple
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                  />
                </div>
              </div> */}
            </Form>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={handleSubmit}>Submit</Button>
            <Button variant="outline">Cancel</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FoundThisItem;
