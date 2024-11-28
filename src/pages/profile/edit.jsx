import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const edit = () => {
  return (
    <div className='flex justify-center items-center p-5 lg:p-10 xl:p-20 border-4 border-primary rounded-2xl my-20 mx-5 lg:mx-20 xl:mx-40 2xl:mx-60 bg-slate-100 shadow-2xl'>
        <div className='grid lg:grid-cols-2 gap-5'>
            <div className='flex flex-col'>
                <img className='border-2 border-primary mb-5 lg:w-1/2' src="../profile.jpg" alt="foto [username]" />
                <div className='flex flex-col md:flex-row gap-5'>
                    <Button className='w-[150px] bg-primary border-2 border-primary hover:bg-primary-foreground hover:text-primary'>Upload</Button>
                    <p className='w-1/2'>Gambar Profile Anda sebaiknya memiliki rasio 1:1 dan berukuran tidak lebih dari 2MB</p>
                </div>
            </div>
            <form action="" className='flex flex-col gap-5'>
                <div className='grid grid-cols-2 gap-5'>
                    <div>
                        <Label htmlFor="username">Username</Label>
                        <Input type="text" name="username" id="username" placeholder="[Username]" />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="[Email]" />
                    </div>
                </div>
                <div>
                    <Label htmlFor="telephone">No telephone</Label>
                    <Input type="number" name="telephone" id="telephone" placeholder="[no phone]" />
                </div>
                <div>
                    <Label htmlFor="about_me">About Me</Label>
                    <Textarea className='h-60' name="about_me" id="about_me"></Textarea>
                    <span>Tulis cerita singkat tentang diri Anda.</span>
                </div>
                <Input type="submit" value="Update Profile" className="bg-primary border-2 border-primary text-white hover:bg-primary-foreground hover:text-primary" />
            </form>
        </div>
    </div>
  )
}

export default edit