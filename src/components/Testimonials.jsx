import React, { useState, useEffect, useRef } from 'react';


const testimonials = [
  {
    id: 1,
    img: '/images/client-3.jpg',
    name: 'Alice Johnson',
    title: 'Beauty Enthusiast',
    quote: "This product completely transformed my skincare routine—absolutely love it!"
  },
  {
    id: 2,
    img: '/images/client-5.jpg',
    name: 'Brian Lee',
    title: 'Makeup Artist',
    quote: "Incredible quality and such beautiful packaging, made me look forward to every use."
  },
  {
    id: 3,
    img: '/images/client-4.jpg',
    name: 'Carmen Ruiz',
    title: 'Spa Owner',
    quote: "Clients rave about these products—so gentle yet effective!"
  },
  {
    id: 4,
    img: '/images/client-1.jpg',
    name: 'David Smith',
    title: 'Beauty Blogger',
    quote: "Stylish, safe, and sensational—if you haven’t tried Sheena, you’re missing out!"
  },
  {
    id: 5,
    img: 'images/92087324_1863319630468850_2096903188249575424_n.jpg',
    name: 'Aavash Palikhe',
    title: 'Happy Customer',
    quote: "My skin’s never been clearer. So happy with the results!"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const timeoutRef = useRef(null);

  const active = testimonials[activeIndex];

  const handleChange = (index) => {
    clearTimeout(timeoutRef.current);
    setFade(false);
    setTimeout(() => {
      setActiveIndex(index);
      setFade(true);
    }, 300);
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setFade(false);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setFade(true);
      }, 300);
    }, 6000);

    return () => clearTimeout(timeoutRef.current);
  }, [activeIndex]);

  // Each avatar has unique style for artistic layout
  const avatarLayout = [
    { top: 'top-[0%]', left: 'left-[10%]', size: 'w-15 h-15', rotate: '-rotate-6' },
    { top: 'top-[35%]', left: 'left-[35%]', size: 'w-16 h-16', rotate: 'rotate-2' },
    { top: 'top-[70%]', left: 'left-[5%]', size: 'w-20 h-20', rotate: 'rotate-0' },
    { top: 'top-[10%]', left: 'left-[80%]', size: 'w-20 h-20', rotate: '-rotate-3' },
    { top: 'top-[80%]', left: 'left-[70%]', size: 'w-18 h-18', rotate: 'rotate-6' }
  ];

  return (

    <section className="relative  bg-cover mt-10  bg-no-repeat md:px-12 lg:px-24 "
     style={{backgroundImage: "url('/images/sheena-newsletter_1512x_eyes.png')", backgroundSize: 'cover'}}
    >

      <h2 className="text-3xl md:text-4xl font-semibold  font-band text-center mb-5 text-gray-800">
        WHAT OUR CLIENTS SAY...
      </h2>

      <div className="flex flex-col md:flex-row gap-16 items-start justify-center relative z-10">

        <div className=" flex flex-col w-full md:w-1/2 mt-10 px-10 ml-65">

        {/* <img src="/images/—Pngtree—creative arrows_6019757.png" className="size-45 ml-130 mb-5 scale-x-[-1] rotate-90 w-40" /> */}

          <div className={`transition-all duration-700 ease-in-out transform
              ${fade ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-95'}
              bg-white shadow-xl p-8 md:p-10 rounded-xl border border-gray-200`}>
            <p className="text-xl italic text-gray-700 mb-6 leading-relaxed">“{active.quote}”</p>
            <div className="flex items-center mt-6">
              <img
                src={active.img}
                alt={active.name}
                className="w-14 h-14 rounded-full border-2 border-pink-400 mr-4 shadow"
              />
              <div>
                <p className="font-bold text-gray-900">{active.name}</p>
                <p className="text-sm text-pink-500">{active.title}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Avatars – visually clustered */}
        <div className="relative w-full md:w-1/2 h-[400px] flex items-center justify-center">
          <div className="relative w-[400px] h-[300px]">
            {testimonials.map((item, index) => {
              const { top, left, size, rotate } = avatarLayout[index];
              return (
                <button
                  key={item.id}
                  onClick={() => handleChange(index)}
                  className={`absolute ${top} ${left} ${size} ${rotate} rounded-full overflow-hidden transition-all duration-500 ease-out z-20
                    ${active.id === item.id
                      ? 'ring-4 ring-pink-400 scale-110 shadow-xl animate-pulse'
                      : 'opacity-80 hover:scale-105 hover:ring-2 hover:ring-pink-300'}`}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Testimonial content box */}
        
      </div>

      {/* Soft ambient circle */}
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-pink-200 opacity-30 rounded-full filter blur-3xl z-0 pointer-events-none" />
    </section>

    
  );
}
