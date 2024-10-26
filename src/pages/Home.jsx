import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Hero */}
      <section className="text-center p-6">
        <h1 className="text-4xl font-bold mb-3">Welcome to CariBareng</h1>
        <p className="text-lg mb-8">Cari dan temukan barang Anda di sini</p>
        <Link to="/browse">
          <Button className="focus-visible:ring-transparent" variant="default">
            Lihat Barang yang Hilang
          </Button>
        </Link>
      </section>

      {/* Abous Us */}
      <section className="text-center p-6">
        <h1 className="text-3xl font-semibold mb-4">About Us</h1>
        <p className="text-lg mb-4 text-black">
          Kami adalah platform yang membantu Anda menemukan barang yang hilang
          dan terhubung dengan orang-orang di sekitar Anda. Dengan mudah, Anda
          dapat melaporkan barang yang hilang dan mencari barang yang mungkin
          telah ditemukan oleh orang lain.
        </p>
      </section>

      {/* Contact Us */}
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <p className="text-lg mb-4 text-black">
          Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi kami.
        </p>
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
          <Button className="focus-visible:ring-transparent">
            Send Message
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
