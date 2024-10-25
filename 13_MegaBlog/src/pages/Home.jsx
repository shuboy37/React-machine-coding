import React, { useState, useEffect } from "react";
import service from "../appwrite/config";
import { Container, PostCard } from "../components/index";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (posts) {
      service
        .listFilteredDocuments()
        .then((posts) => {
          if (posts && Array.isArray(posts.documents)) {
            setPosts(posts.documents);
          } else {
            setPosts([]);
          }
        })
        .catch((err) => {
          setError("Failed to load posts. Try again later...");
          console.error(`Failed fetching posts: ${err.message}`);
        });
    }
  }, []);

  if (posts.length === 0 && !error) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      {error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div className="p-2 w-1/4" key={post.$id}>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      )}
    </div>
  );
}
//Add button under login for redirection
//merge allposts.jsx and home.jsx
