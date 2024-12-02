import Gallery from "./components/gallery";
import "./App.scss";
import Header from "./components/header";
import { useEffect, useState } from "react";
import axios from "axios";
import { ThemeProvider } from "./context/themeContext";

interface Photo {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
}

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [imageChunks, setImageChunks] = useState<Photo[][]>([]);
  const [query, setQuery] = useState<string>("aesthetic");
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);

  function distributePhotosToChunks(chunks: Photo[][], newPhotos: Photo[]) {
    const updatedChunks = [...chunks];
    newPhotos.forEach((photo, index) => {
      updatedChunks[index % chunks.length].push(photo);
    });
    return updatedChunks;
  }

  const loadPhotos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            client_id: import.meta.env.VITE_UNSPLASH_CLIENT_KEY,
            query,
            per_page: 30,
            page,
          },
        }
      );

      const newPhotos: Photo[] = response.data.results;

      setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
      setImageChunks((prevChunks) =>
        distributePhotosToChunks(prevChunks, newPhotos)
      );
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    loadPhotos();
  }, [page]);

  useEffect(() => {
    if (!query) setQuery("random");
    setPhotos([]);
    setImageChunks(Array.from({ length: 4 }, () => [] as Photo[]));
    setPage(1);
    loadPhotos();
  }, [query]);

  useEffect(() => {
    const initialChunks = Array.from({ length: 4 }, () => [] as Photo[]);
    setImageChunks(distributePhotosToChunks(initialChunks, photos));
  }, [photos.length === 0]);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 350) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm) setQuery(searchTerm);
  };

  return (
    <ThemeProvider>
      <div className="app">
        <Header onSearch={handleSearch} />
        {isLoading && <div className="app__overlay"></div>}

        <div className="app__imageContainer">
          {imageChunks.map((chunk, index) => (
            <Gallery key={index} images={chunk} />
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
