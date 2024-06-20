import { $IsPlayingHero } from '@/stores/player';
import { useStore } from '@nanostores/react';

export const DescriptionHero = () => {
  const isPlaying = useStore($IsPlayingHero);

  if (isPlaying) {
    return (
      <>
        <p className="pointer-events-none select-none text-white font-code">
          The Music producer of FLProductions's Studios in Costa Rica with more
          than 15 years of experience in the music industry.
        </p>
        <a
          target="_blank"
          className="z-40 text-xl rounded-2xl border-2 border-white text-white p-2 w-[15rem] text-center font-code uppercase hover:bg-white hover:text-primario transition-all duration-300 ease-in-out"
          href="https://www.flproductionscr.com/contacto/"
        >
          Contact me
        </a>
      </>
    );
  }
};
