import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ListingPages.css";
import Card from "../components/Card";

const ListingPage = () => {
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(3);
  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/posts?page=${currentPage}`
      );
      setPosts(response.data.data);
      setTotalPosts(response.data.totalPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="listing-container">
      <h2 className="listing-title">Lista de Posts</h2>
      <div className="cards-container">
        {posts.map((post) => (
          <Card key={post.id} title={post.title} description={post.content} />
        ))}
      </div>
      <ul className="pagination">
        {Array.from(
          { length: Math.ceil(totalPosts / postsPerPage) },
          (_, index) => (
            <li key={index} className="page-item">
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default ListingPage;
