import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  Outlet,
} from "react-router-dom";
import Users from "./Users";
import Posts from "./Posts";
import Todos from "./Todos";
import Albums from "./Albums";
import Comments from "./comment";
import "bootstrap/dist/css/bootstrap.min.css";

const Cabinet: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();

  if (!userId) {
    return (
      <h2 className="text-danger text-center">Foydalanuvchi ID topilmadi</h2>
    );
  }

  return (
    <div className="container mt-3">
      <h2 className="text-primary text-center">
        Foydalanuvchi Kabineti - {userId}
      </h2>
      <div className="row">
        <div className="col-md-3 border-end">
          <ul className="nav flex-column">
            <li className="mt-1 nav-item">
              <Link
                className="btn btn-outline-primary w-100"
                to={`/cabinet/${userId}/post`}
              >
                Postlar
              </Link>
            </li>
            <li className="mt-3 nav-item">
              <Link
                className="btn btn-outline-primary w-100"
                to={`/cabinet/${userId}/todo`}
              >
                Vazifalar
              </Link>
            </li>
            <li className="mt-3 nav-item">
              <Link
                className="btn btn-outline-primary w-100"
                to={`/cabinet/${userId}/album`}
              >
                Albomlar
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-3">
      {/* Orqaga qaytish tugmasi */}
      <button
        className="btn btn-danger h-50 w-25 mb-2 float-end"
        onClick={() => navigate(-1)}
      >
        ⇐
      </button>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/users" element={<Users />} />

        {/* Foydalanuvchi kabineti */}
        <Route path="/cabinet/:userId/*" element={<Cabinet />}>
          <Route path="post" element={<Posts />} />
          <Route path="post/:postId/comments" element={<Comments />} />
          <Route path="todo" element={<Todos />} />
          <Route path="album" element={<Albums />} />
        </Route>
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
