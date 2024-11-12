// Card.tsx
import React from 'react';

interface CardProps {
  data: {
    id: number;
    name: string;
    abilities: { ability: { name: string } }[];
    sprites: { front_default: string };
  };
}

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '8px', width: '200px' }}>
      <img src={data.sprites.front_default} alt={data.name} style={{ width: '100%', height: 'auto' }} />
      <h3>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h3> {/* Capitaliza el primer carácter */}
      <h4>Habilidades:</h4>
      <ul>
        {data.abilities.map((ability, index) => (
          <li key={index}>{ability.ability.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
