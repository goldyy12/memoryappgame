import { useEffect, useState } from "react";
import './App.css';


      

 
 import { motion } from "framer-motion";

function Card({ pokemon, clicked, isShuffling }) {
  return (
    <motion.div
      onClick={() => clicked(pokemon.id)}
      style={{ cursor: "pointer" }}
      animate={
        isShuffling
          ? { rotateY: [0, 180, 360] } 
          : { rotateY: 0 }
      }
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <img src={pokemon.image} alt={pokemon.name} />
      <p>{pokemon.name}</p>
    </motion.div>
  );
}

function Loader(){
  return <h4>Loading...</h4>
}



function Title() {
  return <h1 className="title">Pokémon Memory Game</h1>;
}
function PokemonDiv({ pokemons, handleClick, isShuffling }) {
  return (
    <div className="pokediv">
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          pokemon={pokemon}
          clicked={handleClick}
          isShuffling={isShuffling}
        />
      ))}
    </div>
  );
}

function Score({score, bestScore}){
  return <><p className="gamesscore">GameScore :{score}</p><br></br><p className="gamesscore1">BestScore : {bestScore}</p></>
}
function App() {
  const [pokemons, setPokemons] = useState([]);
  const [clicked , setClicked] = useState([]);
  const [score, setScore] = useState(0)
  const [bestScore,setBestScore] = useState(0)
  const[isLoading , setIsLoading] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false);


  
  
  
 function handleClick(id) {
  if (clicked.includes(id)) {
    setScore(0);
    setClicked([]); 
        if(score > bestScore) setBestScore(score);

  } else {

    setScore(prev => prev + 1);
    setClicked(prev => [...prev, id]);
  }
 

 Shuffle();
}
function Shuffle(){
   const shuffled = [...pokemons].sort(() => Math.random() - 0.5);
  setPokemons(shuffled);
  setIsShuffling(true);
setTimeout(() => setIsShuffling(false), 600);


}
function resetButton(){
  setScore(0);
  setClicked([]);
  setBestScore(0);
  Shuffle();
}
  

  useEffect(() => {
    setIsLoading(true)
    const fetchPokemons = async () => {
      const promises = [];
      
      for (let i = 1; i <= 12; i++) {
        promises.push(
          fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(res => res.json())
        );
      }

      const results = await Promise.all(promises);
      const data = results.map(p => ({
        id: p.id,
        name: p.name,
        image: p.sprites.front_default
      }));
      

      setPokemons(data);
      setIsLoading(false)
      
    };

    fetchPokemons();
  }, []);

  function Main(){
    return <><div className="main">
      {isLoading ? (
  <Loader />
) : (
  <><div className="container">

    <PokemonDiv pokemons={pokemons} handleClick={handleClick} isShuffling={isShuffling} />
    <Score score={score} bestScore={bestScore} />
    <button className="restart-btn" onClick={resetButton}>
              🔄 Restart Game
            </button>
            </div>
  </>
  
)}

      
    </div></>

  }
  

  return (
    <>
            <Title />

    <Main />

    
    </>
  );
}

export default App;
