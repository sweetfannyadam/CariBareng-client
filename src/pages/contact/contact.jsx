import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const Contact = () => {
  return (
    <section className=" flex p-6">
        <img src='mail.jpg' />
        <div className='px-20 py-32'>
            <h2 className="text-4xl text-sky-500 font-bold mb-4">Contact Us</h2>
            <p className="text-lg mb-4 text-black">Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi kami.</p>
            <div className="flex flex-col gap-y-2">
            <Input
                className="focus-visible:ring-transparent"
                type="text"
                placeholder="Your name"
            ></Input>
            <Input
                className="focus-visible:ring-transparent"
                type="email"
                placeholder="Your email"
            ></Input>
            <Textarea
                className="focus-visible:ring-transparent"
                placeholder="Your message"
            ></Textarea>
            <Button className="focus-visible:ring-transparent bg-sky-400">
                Send Message
            </Button>
            </div>
        </div>
  </section>
  )
}

export default Contact
