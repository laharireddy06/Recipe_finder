export default function HeroBanner() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-[#07091f] via-[#0b0f3b] to-[#1a0b2e] text-white overflow-hidden">
      
      {/* Top Gradient Strip */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            Design recipes
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            #withFoodApp
          </span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl mb-8">
          Discover, cook, and automate your cooking journey —
          <br className="hidden md:block" />
          from quick meals to gourmet recipes in minutes.
        </p>

        <button className="px-10 py-4 rounded-full font-semibold text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-transform shadow-xl">
          Get started free
        </button>

        <p className="mt-4 text-sm text-gray-400">
          ✔ No credit card required
        </p>
      </div>

      {/* Glow Effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20"></div>
    </section>
  );
}
