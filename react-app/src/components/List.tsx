import { MouseEvent } from "react";
type Props = {
    data: string[];
}

function List({data}: Props) {
    const handleClick=(e: MouseEvent)=>{
        console.log('click')
    }
  return (
    <ul className="list-group">
        {data.map(elemento => (
            <li onClick={(e) => console.log(e)} key={elemento} className="list-group-item">{elemento}</li>
        ))};
    </ul>
  )
}

export default List