'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

export default function FileUploadForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onSubmit = async (data) => {
    setIsUploading(true);
    setUploadStatus(null);
    setUploadProgress(0);

    const file = data.file[0];
    if (!file) {
      setUploadStatus({ type: 'error', message: 'No file selected.' });
      setIsUploading(false);
      return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('YOUR_API_ENDPOINT_HERE', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed.');
      }

      setUploadStatus({
        type: 'success',
        message: 'File uploaded successfully!',
      });
    } catch (error) {
      setUploadStatus({
        type: 'error',
        message: error.message || 'File upload failed. Please try again.',
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      reset(); // Reset the form after upload
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#F5F7F8' }}
    >
      <div
        className="w-full max-w-md p-8 rounded-lg shadow-lg"
        style={{ backgroundColor: 'white' }}
      >
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#2C3E50' }}>
          File Upload
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  lessThan10MB: (files) =>
                    files[0]?.size < 10000000 || 'Max 10MB',
                  acceptedFormats: (files) =>
                    ['image/jpeg', 'image/png', 'application/pdf'].includes(
                      files[0]?.type
                    ) || 'Only JPEG, PNG, or PDF files are allowed',
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
        </form>

        {isUploading && (
          <div className="mt-4">
            <Progress value={uploadProgress} className="w-full" />
            <p
              className="text-sm text-center mt-2"
              style={{ color: '#2C3E50' }}
            >
              Uploading: {uploadProgress}%
            </p>
          </div>
        )}

        {uploadStatus && (
          <Alert
            className="mt-4"
            variant={
              uploadStatus.type === 'success' ? 'default' : 'destructive'
            }
          >
            {uploadStatus.type === 'success' ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            <AlertTitle>
              {uploadStatus.type === 'success' ? 'Success' : 'Error'}
            </AlertTitle>
            <AlertDescription>{uploadStatus.message}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
