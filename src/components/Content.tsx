import { CellMeasurer, CellMeasurerCache, CellRenderer, createMasonryCellPositioner, Masonry, MasonryCellProps } from "react-virtualized";
import { MovieCard } from "./MovieCard";

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface Props {
  movies: Array<MovieProps>;
  selectedGenre: GenreResponseProps;
}

const cache = new CellMeasurerCache({
  defaultHeight: 350,
  defaultWidth: 230,
  fixedWidth: true,
});

// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: 3,
  columnWidth: 270,
  spacer: 30,
});

export function Content({ movies, selectedGenre }: Props) {
  const cellRenderer: CellRenderer = ({ index, key, style, parent }: MasonryCellProps) => {
    const movie = movies[index];

    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div key={key} style={style}>
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            poster={movie.Poster}
            runtime={movie.Runtime}
            rating={movie.Ratings[0].Value}
          />
        </div>
      </CellMeasurer>
    )
  }
  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <Masonry
          height={750}
          width={830}
          cellCount={movies.length}
          cellMeasurerCache={cache}
          cellPositioner={cellPositioner}
          cellRenderer={cellRenderer}
          autoHeight
        />
      </main>
    </div>
  )
}