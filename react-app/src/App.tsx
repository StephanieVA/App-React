import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import './App.css';

const App: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon");
        if (!response.ok) {
          throw new Error("Error al cargar los datos");
        }
        const result = await response.json();
        
        const pokemonDetails = await Promise.all(
          result.results.map(async (pokemon: { url: string }) => {
            const pokemonResponse = await fetch(pokemon.url);
            return pokemonResponse.json();
          })
        );

        setData(pokemonDetails);
        setFilteredData(pokemonDetails);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredData(data); // Si no hay texto en la búsqueda, muestra todos los Pokémon
    } else {
      const filtered = data.filter(pokemon => 
        pokemon.name.toLowerCase().includes(search.toLowerCase()) // Filtra por nombre de Pokémon
      );
      setFilteredData(filtered);
    }
  }, [search, data]); // Se ejecuta cada vez que cambia el valor de `search` o `data`

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Lista de Pokémon</h1>

      {/* Campo de búsqueda */}
      <div>
        <input
          type="text"
          placeholder="Buscar Pokémon por nombre"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Actualiza el estado de búsqueda
        />
      </div>

      <div className="card-container">
        {/* Muestra los Pokémon filtrados */}
        {filteredData.map((pokemon) => (
          <Card key={pokemon.id} data={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default App;