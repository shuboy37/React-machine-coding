import React from "react";
import { Link } from "react-router-dom";
import service from "../appwrite/config";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={service.previewFile(featuredImage)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        {
          //database k andar id hai jo har post ki id hai pr individual image ki id featuredImage se milegi
        }
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
