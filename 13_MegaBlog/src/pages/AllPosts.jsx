import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components/index";
import service from "../appwrite/config";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    service
      .listFilteredDocuments()
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .catch((error) => {
        setError("Failed to load posts. Please try again later.");
        console.error(`Failed to fetch posts: ${error.message}`);
      });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        {error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
