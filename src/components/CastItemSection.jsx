import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { Box, IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import CastItem from "./CastItem";

export default function CastSlider({ cast }) {
  const [sliderRef, slider] = useKeenSlider({
    slides: { perView: 10, spacing: 5 },
  });

  return (
    <Box position="relative">
      <IconButton
        icon={<ChevronLeftIcon />}
        position="absolute"
        left={0}
        top="50%"
        transform="translateY(-50%)"
        zIndex={1}
        bgColor="#E53E3E"
        color="#FFFF"
        onClick={() => slider.current?.prev()}
        aria-label="Previous"
      />
      <IconButton
        icon={<ChevronRightIcon />}
        position="absolute"
        right={0}
        top="50%"
        transform="translateY(-50%)"
        zIndex={1}
        bgColor="#E53E3E"
        color="#FFFF"
        onClick={() => slider.current?.next()}
        aria-label="Next"
      />

      <Box as="div" ref={sliderRef} className="keen-slider">
        {cast.map((actor, index) => (
          <div className="keen-slider__slide" key={`${actor.id}-${index}`}>
            <CastItem
              name={actor.name}
              character={actor.character}
              picture={actor.profile_path}
            />
          </div>
        ))}
      </Box>
    </Box>
  );
}
