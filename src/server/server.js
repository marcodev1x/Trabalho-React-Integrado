const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const postsPerPage = 3;

app.get("/api/posts", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;

  const paginatedPosts = posts.slice(startIndex, endIndex);

  res.json({ data: paginatedPosts, totalPosts: posts.length });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server online na porta ${PORT}`));
