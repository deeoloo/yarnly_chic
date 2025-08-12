import { useContext } from "react";
import { ApiContext } from "../context/ContextProvider";

function About() {
  const { assetUrl } = useContext(ApiContext);       
  const founder = assetUrl("/images/founder.jpg");
  const about = assetUrl("/images/about-us.jpg");

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 lg:py-20 grid gap-10 lg:grid-cols-2">
      {/* Row 1: Image left, text right */}
      <div className="relative overflow-hidden rounded-3xl min-h-[340px] lg:min-h-[640px]">
        <img
          src={about}
          alt="About YarnlyChic"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
      </div>

      <article className="lg:pl-10 space-y-6">
        <h1 className="text-3xl sm:text-4xl font-semibold">About YarnlyChic</h1>
        <p className="text-gray-700 leading-relaxed">
          At YarnlyChic, we specialize in handmade crochet and tailored pieces,
          crafted from good quality yarns and fabrics. Our collections include versatile
          items—dresses, tops, bucket hats, accessories, and custom orders—designed
          for comfort, durability, and a distinctive look.
        </p>
        <p className="text-gray-700 leading-relaxed">
            Beyond ready-to-wear items, YarnlyChic also offers custom creations—whether 
            you want a signature outfit for a special event, a thoughtful gift, or a 
            unique addition to your wardrobe. Every design is created with an eye for detail, 
            celebrating craftsmanship, color, and individuality.
        </p>
      </article>

      {/* Row 2: Article first, then image */}
      <article className="lg:pl-10 space-y-6">
        <h3 className="text-2xl sm:text-3xl font-semibold">Meet the Founder</h3>
        <h2 className="text-3xl sm:text-4xl font-bold">Cherrylyn Chepkoech</h2>
        <p className="text-gray-700 leading-relaxed">
          YarnlyChic was founded by Cherrylyn Chepkoech, a passionate Kenyan creative with a deep
          love for fashion, crochet artistry, and timeless handmade craftsmanship. From an early age,
          Cherrylyn was drawn to colors, textures, and the joy of creating unique pieces that tell a story.
          Her vision is rooted in celebrating African creativity while blending it with global fashion
          influences—one-of-a-kind designs that carry both cultural richness and modern elegance.
        </p>
        <p className="text-gray-700 leading-relaxed">
            Driven by a dream to inspire self-expression and conscious living, 
            Cherrylyn pours her heart into every piece, ensuring that each creation is 
            not only beautiful but also made with care, patience, and purpose. 
            Her work reflects a balance of artistry and practicality—fashion that 
            makes a statement while honoring the skill and tradition behind it.
        </p>
      </article>

      <div className="relative overflow-hidden rounded-3xl min-h-[340px] lg:min-h-[640px]">
        <img
          src={founder}
          alt="Founder — Cherrylyn Chepkoech"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </div>
    </main>
  );
}

export default About;