import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components/index";
import service from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPost() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();
  const [error, setError] = useState("");

  useEffect(() => {
    if (slug) {
      service
        .getDocument(slug)
        .then((posts) => {
          if (posts) {
            setPost(posts);
          }
        })
        .catch((err) => {
          console.error(`Failed getting posts: ${err.message}`);
          setError("Failed fetching post. Try agin later....");
        });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      {error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <Container>
          <PostForm post={post} />
        </Container>
      )}
    </div>
  ) : null;
}
