import React, { useState, useEffect } from "react";
import { Container, Button } from "../components/index";
import service from "../appwrite/config";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";

export default function Post() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { slug } = useParams();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service
        .getDocument(slug)
        .then((post) => {
          if (post) {
            setPost(post);
          } else {
            navigate("/");
          }
        })

        .catch((err) => {
          console.error(`Failed fetching post: ${err.message}`);
          setError("Failed loading posts. Try again later....");
        });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = async () => {
    try {
      const status = service.deletePost(slug || post.$id);

      if (status) {
        if (post.featuredImage?.$id) {
          await service.deleteFile(
            post.featuredImage.$id || post.featuredImage
          );
          navigate("/");
        }
      }
    } catch (error) {
      console.error(`Failed deleting post: ${error.message}`);
      setError("Failed to delete post. Try again later...");
    }
  };

  return post ? (
    <div className="py-8">
      {error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <Container>
          <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
            <img
              src={service.previewFile(
                post.featuredImage || post.featuredImage.$id
              )}
              alt={post.title}
              className="rounded-xl"
            />

            {isAuthor && (
              <div className="absolute right-6 top-6">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500" classname="mr-3">
                    Edit
                  </Button>
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>
          <div className="w-full mb-6">
            <h1 className="text-2xl font-bold">{post.title}</h1>
          </div>
          <div className="browser-css">{parse(post.content)}</div>
        </Container>
      )}
    </div>
  ) : null;
}
