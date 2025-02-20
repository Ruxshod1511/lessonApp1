import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Post {
  id: number;
  title: string;
  body: string;
}

const Posts: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ma'lumotlarni yuklashda xatolik yuz berdi!");
        }
        return response.json();
      })
      .then((data: Post[]) => {
        setPosts(data);
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
        Foydalanuvchi {userId} postlari
      </h2>

      {loading ? (
        // Skeleton yuklanish holati
        <ul className="list-group">
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index} className="list-group-item">
              <h5>
                <Skeleton width={200} />
              </h5>
              <p>
                <Skeleton count={3} />
              </p>
              <Skeleton width={100} height={30} />
            </li>
          ))}
        </ul>
      ) : posts.length === 0 ? (
        <p className="text-center text-muted">Postlar mavjud emas</p>
      ) : (
        <ul className="list-group">
          {posts.map((post) => (
            <li key={post.id} className="list-group-item">
              <h5>{post.title}</h5>
              <p>{post.body}</p>
              <Link
                to={`/cabinet/${userId}/post/${post.id}/comments`}
                className="btn btn-warning float-end"
              >
                Commentlar
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Posts;
