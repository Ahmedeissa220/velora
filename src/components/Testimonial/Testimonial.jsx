
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import { Star } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Ahmed Ali",
    role: "Frontend Developer",
    image: "https://i.pravatar.cc/150?img=11",
    review:
      "Velora completely changed my shopping experience. The UI feels incredibly smooth and premium.",
  },

  {
    id: 2,
    name: "Sara Mohamed",
    role: "UI/UX Designer",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "Everything from animations to product quality feels world-class. Absolutely loved the experience.",
  },

  {
    id: 3,
    name: "Omar Khaled",
    role: "Freelancer",
    image: "https://i.pravatar.cc/150?img=15",
    review:
      "The design language is clean, modern, and premium. One of the best ecommerce experiences.",
  },

  {
    id: 4,
    name: "Mona Adel",
    role: "Content Creator",
    image: "https://i.pravatar.cc/150?img=45",
    review:
      "Fast delivery, amazing support, and beautiful interface. Everything feels polished.",
  },
];

export default function PremiumTestimonials() {
  return (
    <section className="relative py-24 bg-[#0f0f0f] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500/20 rounded-full blur-[120px]" />

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="text-sm tracking-[4px] uppercase text-gray-400">
            Testimonials
          </span>

          <h2 className="text-4xl md:text-6xl font-bold text-white mt-4 leading-tight">
            Trusted by <br />
            Thousands of Customers
          </h2>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto leading-8">
            Discover why people love shopping with Velora. Premium experience,
            modern design, and excellent service.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          spaceBetween={30}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },

            768: {
              slidesPerView: 2,
            },

            1200: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="
                  h-full
                  rounded-3xl
                  border border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  p-8
                  transition-all
                  duration-500
                  hover:-translate-y-3
                  hover:border-cyan-400/40
                  hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]
                "
              >
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-white bg-clip-text fill-yellow-400 animate-pulse"
                    />
                  ))}
                </div>

                {/* Review */}
                <p className="text-gray-300 leading-8 text-lg mb-8">
                  "{item.review}"
                </p>

                {/* User */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      w-16
                      h-16
                      rounded-full
                      object-cover
                      border-2 border-white/20
                    "
                  />

                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {item.name}
                    </h3>

                    <p className="text-gray-400 text-sm">{item.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
