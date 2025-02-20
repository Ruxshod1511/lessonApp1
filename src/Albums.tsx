import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Album {
  id: number;
  title: string;
}

const Albums: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ma'lumotlarni yuklashda xatolik yuz berdi!");
        }
        return response.json();
      })
      .then((data: Album[]) => {
        setAlbums(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [userId]);

  if (!userId) {
    return (
      <h2 className="text-danger text-center">Foydalanuvchi ID topilmadi</h2>
    );
  }

  if (error) {
    return <h3 className="text-center text-danger">{error}</h3>;
  }

  return (
    <div className="p-4">
      <h2 className="text-primary text-center">
        Foydalanuvchi {userId} ning Albomlari
      </h2>

      {loading ? (
        // Skeleton yuklanish holati
        <ul className="list-group">
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index} className="list-group-item">
              <Skeleton width="80%" />
            </li>
          ))}
        </ul>
      ) : albums.length === 0 ? (
        <p className="text-center text-muted">Albomlar mavjud emas</p>
      ) : (
        <ul className="list-group">
          {albums.map((album) => (
            <li key={album.id} className="list-group-item">
              {album.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Albums;
