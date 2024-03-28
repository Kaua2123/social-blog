import { tokenDecoder } from '../utils/tokenDecoder';

export default function Profile() {
  const token = localStorage.getItem('token');

  return (
    <div>
      <h1>Olá, </h1>
    </div>
  );
}
