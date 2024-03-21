import { useParams } from 'react-router-dom';

export default function Post() {
  const { id } = useParams();

  return (
    <div>
      <h1>Post acessado pela rota de parâmetro. id: {id} </h1>
    </div>
  );
}
