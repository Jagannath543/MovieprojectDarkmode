import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './MovieProject/Components/Navbar/Navbar';  
import Footer from './MovieProject/Components/Footer/Footer';  
import Home from './MovieProject/Pages/Home/Home';  
import About from './MovieProject/Pages/About/About';
import Contact from './MovieProject/Pages/Contact/Contact'; 
import Movie from "./MovieProject/Pages/Movie/Movie";
import ActorDetails from './MovieProject/Pages/Actors/ActorDetails';

const baseUrl = "https://api.themoviedb.org/3";
const api_key = "94ad1dc27cfaadc07bdc15b1f4c85579";

const App = () => {
  const [movie, setMovie] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Load saved theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  // Save theme to localStorage and apply class
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Fetch Popular Movies
  const fetchPopularMovies = async (page = 1) => {
    try {
      const response = await axios.get(`${baseUrl}/movie/popular`, {
        params: { api_key, page },
      });
      setMovie(response.data.results);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  // Fetch Search Movies
  const fetchSearchMovies = async (page = 1, searchQuery = "") => {
    try {
      const response = await axios.get(`${baseUrl}/search/movie`, {
        params: { api_key, page, query: searchQuery },
      });
      setMovie(response.data.results);
    } catch (error) {
      console.error("Error fetching search movies:", error);
    }
  };

  // Trigger fetch based on search
  useEffect(() => {
    if (search === "") {
      fetchPopularMovies();
    } else {
      fetchSearchMovies(1, search);
    }
  }, [search]);

  return (
    <Router>
      <div>
        <Navbar 
          setSearch={setSearch} 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
        />  
        <Routes>
          <Route path="/" element={<Home movies={movie} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/actor/:actorId" element={<ActorDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
