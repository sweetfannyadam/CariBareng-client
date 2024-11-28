import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const Contact = () => {
  return (
    <section className="flex flex-col xl:flex-row justify-center items-center px-5">
        <img className='w-40 xl:w-1/3' src='mail.png' />
        <div className='px-10 pt-5 xl:py-32'>
            <h2 className="text-4xl text-primary font-bold mb-4">Contact Us</h2>
            <p className="text-lg mb-4 text-accent">If you have any questions, please feel free to contact us.</p>
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
            <Button className="focus-visible:ring-transparent bg-primary hover:bg-primary-foreground border-primary border hover:text-primary">
                Send Message
            </Button>
            </div>
        </div>
  </section>
  )
}

export default Contact
