import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const Todos: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ma'lumotlarni yuklashda xatolik yuz berdi!");
        }
        return response.json();
      })
      .then((data: Todo[]) => {
        setTodos(data);
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
        Foydalanuvchi {userId} ning Todos ro‘yxati
      </h2>

      {loading ? (
        // Skeleton yuklanish holati
        <ul className="list-group">
          {Array.from({ length: 5 }).map((_, index) => (
            <li
              key={index}
              className="list-group-item d-flex align-items-center"
            >
              <Skeleton circle width={20} height={20} className="me-2" />
              <Skeleton width={250} />
            </li>
          ))}
        </ul>
      ) : todos.length === 0 ? (
        <p className="text-center text-muted">Todos mavjud emas</p>
      ) : (
        <ul className="list-group">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`list-group-item d-flex align-items-center ${
                todo.completed ? "list-group-item-success" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
                className="form-check-input me-2"
              />
              <span>{todo.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todos;
