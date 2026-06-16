
import unnamed from "../../assets/unnamed.png";

function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Blur 1 */}
        <div className="absolute top-[-150px] left-[-100px] w-[350px] h-[350px] bg-indigo-500/30 rounded-full blur-[120px] animate-pulse" />

        {/* Gradient Blur 2 */}
        <div className="absolute bottom-[-150px] right-[-100px] w-[350px] h-[350px] bg-purple-500/30 rounded-full blur-[120px] animate-pulse" />

        {/* Glass Overlay */}
        <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[2px]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex items-center min-h-[calc(100vh-100px)] p-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left">
              <span className="inline-block text-sm tracking-[0.35em] uppercase text-indigo-300 font-semibold">
                Precision Engineered
              </span>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight">
                Sound Without
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 animate-pulse">
                  Compromise.
                </span>
              </h1>

              <p className="text-white/70 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Experience the pinnacle of acoustic innovation. Crafted with
                aerospace-grade materials and enhanced by intelligent neural
                processing.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4">
                {/* Primary Button */}
                <a
                  href="#"
                  className="
                    group relative overflow-hidden
                    px-8 py-4 rounded-2xl
                    bg-white text-black
                    font-semibold text-lg
                    transition-all duration-500
                    hover:scale-105
                    hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]
                  "
                >
                  <span className="relative z-10">Explore Collection</span>

                  <div
                    className="
                    absolute inset-0
                    bg-gradient-to-r
                    from-indigo-300
                    to-purple-300
                    opacity-0
                    group-hover:opacity-100
                    transition
                  "
                  />
                </a>

                {/* Secondary Button */}
                <a
                  href="#"
                  className="
                    px-8 py-4 rounded-2xl
                    border border-white/10
                    bg-white/5
                    backdrop-blur-xl
                    text-white
                    font-semibold text-lg
                    transition-all duration-500
                    hover:bg-white/10
                    hover:scale-105
                  "
                >
                  Watch Film
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative flex justify-center">
              {/* Glow Behind */}
              <div className="absolute w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] bg-indigo-500/20 rounded-full blur-[100px]" />

              {/* Floating Image */}
              <img
                src={unnamed}
                alt="Luxury Headphones"
                className="
                  relative z-10
                  w-full max-w-sm sm:max-w-md lg:max-w-xl
                  object-contain
                  drop-shadow-[0_25px_80px_rgba(99,102,241,0.45)]
                  animate-[float_5s_ease-in-out_infinite]
                "
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Animation */}
      <style>
        {`
          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
            100% {
              transform: translateY(0px);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Hero;
