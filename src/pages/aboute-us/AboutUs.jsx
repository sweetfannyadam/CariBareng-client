import React from 'react'

const AboutUs = () => {
  return (
    <article className='py-10 px-5 md:px-20'>
        <h1 className='text-center text-2xl lg:text-3xl xl:text-6xl font-bold py-5 lg:pb-20 text-sky-500'>Tentang CariBareng</h1>
        <div className='flex flex-col-reverse xl:flex-row gap-5'>
            <div className='flex flex-col gap-5'>
                <div>
                    <h2 className='text-sky-500 text-lg font-semibold pb-5'>Apa Sih Itu Cari Bareng?</h2>
                    <p className='pr-20'>Cari Bareng merupakan sebuah platform digital yang dirancang untuk memudahkan proses pelaporan dan pencarian barang-barang hilang. Dengan menggunakan teknologi terkini, kami menghadirkan solusi agar pencarian barang yang hilang menjadi lebih mudah dan cepat.</p>
                </div>
                <div >
                    <h2 className='text-sky-500 text-lg font-semibold pb-5'>Mengapa Cari Bareng Dibuat?</h2>
                    <p className='pr-20'>Di zaman serba digital ini, kehilangan barang penting bisa menjadi pengalaman yang penuh stres dan merepotkan. Metode pencarian tradisional melalui media sosial atau komunikasi langsung sering kali kurang efektif. Cari Bareng hadir untuk menjawab kebutuhan ini dengan menawarkan solusi yang praktis dan dapat diakses secara online.</p>
                </div>
                <div >
                    <h2 className='text-sky-500 text-lg font-semibold pb-5'>Manfaat Cari Bareng untuk Anda</h2>
                    <p className='pr-20'>Cari Bareng membantu menghubungkan orang yang kehilangan barang dengan mereka yang menemukannya. Dengan fitur-fitur yang mudah digunakan, platform ini bertujuan untuk membuat proses pencarian barang lebih sederhana dan terarah, sehingga dapat mengurangi kecemasan yang sering timbul saat kehilangan barang.</p>
                </div>
                <div >
                    <h2 className='text-sky-500 text-lg font-semibold pb-5'>Bagaimana Cara Kerja Cari Bareng?</h2>
                    <p className='pr-20'>Pengguna dapat memasukkan laporan barang hilang atau barang yang ditemukan melalui platform kami. Informasi ini kemudian dapat diakses oleh orang lain yang ingin mencari atau membantu menemukan barang tersebut. Cari Bareng berperan sebagai jembatan yang mempercepat proses pencarian dengan cara yang efisien dan aman.</p>
                </div>
            </div>
            <img className='h-60 xl:h-auto object-cover object-center' src='Media-Digital.jpg' alt='MEDIA DIGITAL' />
        </div>
    </article>
  )
}

export default AboutUs