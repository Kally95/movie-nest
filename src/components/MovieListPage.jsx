export default function MovieListPage({ movies }) {
  return (
    <Box px={6} py={10} maxW="1440px" mx="auto">
      <Text fontSize="2xl" fontWeight="bold" mb={6} textTransform="capitalize">
        {type} Movies
      </Text>

      <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={10}>
        {movies.map((movie) => (
          <MovieSectionItem
            key={movie.id}
            title={movie.title}
            movieImage={movie.backdrop_path}
            id={movie.id}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
