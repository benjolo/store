import { useEffect, useState } from "react";
import { useStore } from "../../store/store";
import { Item } from "../../store/store";
import { CardsCarousel } from "./Carousel";
import { Box, Text } from "@mantine/core";

const Home = () => {
  return (
    <Box
      sx={{
        width: "-webkit-fill-available",
      }}
    >
      <Text align="center" size="xxl" weight={700}>
        Welcome to the <span className="home__title--span">Inventory</span> App
      </Text>
      <CardsCarousel />
    </Box>
  );
};

export default Home;
