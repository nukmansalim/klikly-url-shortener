import React from "react";

export default function TestimonialCard({ name, role, avatar, quote, featured = false }) {
  return (
    <div className={`testimonial-card ${featured ? "featured" : ""}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="testimonial-name font-bold text-2xl">{name}</h3>
          <p className="testimonial-role mt-1">{role}</p>
        </div>
        <div className="testimonial-avatar-wrap">
          <img src={avatar} alt={name} />
        </div>
      </div>
      <p className="testimonial-quote">{quote}</p>
    </div>
  );
}