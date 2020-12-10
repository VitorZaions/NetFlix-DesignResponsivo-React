import React, { useEffect, useState } from "react";
import Tmbd from "./Tmdb";
import './App.css';
import HeaderTop from './components/HeaderTop/Index'
import MovieRow from "./components/MovieRow/Index";
import FeaturedMovie from "./components/FeaturedMovie/Index"
import Footer from './components/Footer/Index'
import Tmdb from "./Tmdb";
export default () => {

  const [movielist, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [BlackHheader, setBlackHeader] = useState(false);

  useEffect( () => {
   const loadall = async () => {

    // Função para pegar a lista moviedb
    let list = await Tmbd.getHomeList();
    setMovieList(list);

   // Pegando o featured
   let originals = list.filter(i=>i.slug === 'originals');
   let random = Math.floor(Math.random() * (originals[0].items.results.length -1));
   let choosen = originals[0].items.results[random];
   let chooseninfo = await Tmdb.GetMovieInfo(choosen.id, 'tv');
   setFeaturedData(chooseninfo);

    console.log(chooseninfo);

  }
    loadall();    
  }, []);

  useEffect(() => {
    const scrollListener  = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      }else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    
    return () =>{
      window.removeEventListener('scroll', scrollListener);
    }

  }, []);

return(
  <div className="page">
  
  <HeaderTop black={BlackHheader}/>

  {featuredData &&
    <FeaturedMovie item={featuredData}/>
  }
  

   <section className = "lists">
     {movielist.map((item,key) => (
       <MovieRow key={key} title = {item.title} items = {item.items} />
     ))}
   </section>

   <Footer/>
   {movielist.length <= 0 &&
   <div className="loading">     
   <img src = "https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_2560%2Cc_limit/Netflix_LoadTime.gif" alt = "Loading"/> 
   </div>
   }
   
  </div>  
);
}