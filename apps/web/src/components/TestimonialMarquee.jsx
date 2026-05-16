import React from "react";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    name: "Raka Pratama",
    role: "Pemilik UMKM",
    avatar: "https://i.pravatar.cc/80?img=32",
    quote:
      "Sebagai pemilik usaha kecil, saya terbantu sekali dengan Klikly. Link jadi lebih rapi, mudah dibagikan, dan terlihat lebih profesional saat dipakai untuk promosi produk.",
    featured: false,
  },
  {
    name: "Nadia Putri",
    role: "Content Creator",
    avatar: "https://i.pravatar.cc/80?img=47",
    quote:
      "Fitur Link-in-Bio-nya sangat membantu. Semua link penting saya bisa dikumpulkan dalam satu halaman yang tampilannya bersih, modern, dan mudah diakses followers.",
    featured: true,
  },
  {
    name: "Dimas Arya",
    role: "Digital Marketer",
    avatar: "https://i.pravatar.cc/80?img=15",
    quote:
      "Klikly membuat campaign jadi lebih mudah dipantau. Saya bisa membuat link pendek, membagikan QR Code, dan melihat performa klik dengan lebih praktis.",
    featured: false,
  },
  {
    name: "Salsa Maharani",
    role: "Owner Online Shop",
    avatar: "https://i.pravatar.cc/80?img=5",
    quote:
      "Sebelumnya link toko saya terlihat panjang dan kurang menarik. Setelah pakai Klikly, link jadi lebih singkat, mudah diingat, dan cocok untuk bio Instagram.",
    featured: false,
  },
  {
    name: "Fajar Nugroho",
    role: "Event Organizer",
    avatar: "https://i.pravatar.cc/80?img=12",
    quote:
      "QR Code dari Klikly sangat membantu saat acara. Peserta tinggal scan dan langsung mengakses informasi lengkap. Sangat praktis dan cepat!",
    featured: false,
  },
  {
    name: "Lina Susanti",
    role: "Freelance Designer",
    avatar: "https://i.pravatar.cc/80?img=23",
    quote:
      "Saya pakai Link-in-Bio untuk portfolio. Tampilannya elegan dan profesional. Klien saya sering bilang link-nya mudah diakses dan terlihat premium.",
    featured: true,
  },
];

export default function TestimonialMarquee() {
  // Duplicate testimonials untuk seamless loop
  const duplicated = [...testimonials, ...testimonials];

  return (
    <div className="testimonial-marquee">
      <div className="testimonial-track">
        {duplicated.map((t, idx) => (
          <TestimonialCard key={idx} {...t} />
        ))}
      </div>
    </div>
  );
}
