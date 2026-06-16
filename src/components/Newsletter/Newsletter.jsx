

export default function Newsletter() {
  return (
    <section className="relative py-24 bg-[#0f0f0f] overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <div
          className="
            max-w-5xl
            mx-auto
            rounded-[40px]
            border border-white/10
            bg-white/5
            backdrop-blur-xl
            px-6 md:px-14
            py-16 md:py-20
            text-center
            shadow-[0_0_50px_rgba(255,255,255,0.03)]
          "
        >
          {/* Small Label */}
          <span
            className="
              inline-block
              text-sm
              tracking-[4px]
              uppercase
              text-gray-400
              mb-6
            "
          >
            Join The Community
          </span>

          {/* Heading */}
          <h2
            className="
              text-4xl
              md:text-6xl
              font-bold
              text-white
              leading-tight
            "
          >
            Join the Inner Circle.
          </h2>

          {/* Description */}
          <p
            className="
              text-gray-400
              mt-6
              max-w-2xl
              mx-auto
              leading-8
              text-lg
            "
          >
            Be the first to access our limited release collections and exclusive
            tech insights from the Velora Labs.
          </p>

          {/* Form */}
          <div
            className="
              mt-10
              flex
              flex-col
              md:flex-row
              items-center
              gap-4
              max-w-2xl
              mx-auto
            "
          >
            {/* Input */}
            <input
              type="email"
              placeholder="Enter your email address"
              className="
                w-full
                h-14
                rounded-2xl
                bg-white/10
                border border-white/10
                px-5
                text-white
                placeholder:text-gray-500
                outline-none
                focus:border-cyan-400
                transition-all
              "
            />

            {/* Button */}
            <button
              className="
                w-full
                md:w-auto
                h-14
                px-8
                rounded-2xl
                bg-white
                text-black
                font-semibold
                hover:bg-cyan-300
                transition-all
                duration-300
                whitespace-nowrap
              "
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
