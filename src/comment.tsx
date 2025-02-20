import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Comment {
  id: number;
  name: string;
  body: string;
}

const Comments: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (postId) {
      fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        .then((response) => response.json())
        .then((data) => setComments(data))
        .catch((error) => console.error("Xatolik:", error));
    }
  }, [postId]);

  return (
    <div className="mt-5">
      <h5 className="text-primary">Comments</h5>

      <ul className="list-group">
        {comments.map((comment) => (
          <li key={comment.id} className="list-group-item">
            <strong>{comment.name}</strong>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
