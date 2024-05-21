interface ImagesProps {
  id: string;
  url: string;
}

interface PaginationProps {
  data: ImagesProps[];
  scrollX: Animated.Value;
  index: number;
}
