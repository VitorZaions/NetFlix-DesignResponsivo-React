import React, {useState} from 'react';
import './MovieRow.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default({title, items}) => {

   const [scrollx,setScrollx] = useState(-400);

   const HandleLeftArrow = () => {
    let x = scrollx + Math.round(window.innerWidth / 2);
    if(x > 0){
      x = 0
    }
   setScrollx(x);

   }

   const HandleRightArrow = () => {
    let x = scrollx - Math.round(window.innerWidth / 2);
    let listw = items.results.length * 150;
     if((window.innerWidth - listw) > x){
      x = (window.innerWidth - listw) - 60;
     }
     setScrollx(x);
   }
    

    return(
     <div className="MovieRow">
      <h2>{title}</h2>

      <div className="MovieRow--right" onClick={HandleRightArrow}>
          <NavigateNextIcon style = {{fontSize: 50}}/>          
        </div>

        <div className="MovieRow--left"onClick={HandleLeftArrow}>
          <NavigateBeforeIcon style={{fontSize:  50}}/>
        </div>

        <div className="MovieRow--listaarea">
          
        <div className="MovieRow--list" style = {{
        marginLeft: scrollx, 
        width: items.results.length * 150,
       // transition: all ease 0.2s;
        }}>
         {items.results.length > 0 && items.results.map((item,key)=>(
         <div key={key} className="MovieRow--item">
         <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}/>
         </div>
        ))}
             </div>       
             ,
        </div>
     </div>      
    );
}
