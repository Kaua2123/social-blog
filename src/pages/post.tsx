import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/axios';
import Navbar from '../components/navbar';

import pixelArt from '../imgs/xd.jpg';
import { User } from 'lucide-react';
import PostCard from '../components/post-card';

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      await axios
        .get(`/post/${id}`)
        .then((response) => setPost(response.data))
        .catch((e) => console.log(e));
    };

    getPost();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="m-20 flex flex-col gap-14 items-center h-auto">
        <h1 className="text-5xl text-center font-poppins font-bold text-blue-400">
          {post.title}
        </h1>
        <img
          className="rounded-2xl shadow-2xl"
          style={{ width: '420px', height: '300px' }}
          src={pixelArt}
          alt=""
        />
        <div className="text-lg" style={{ width: '450px' }}>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis
            ratione voluptatibus cum? Autem dolorum earum, impedit quia quisquam
            laudantium iste inventore dolore perferendis eveniet obcaecati vel
            repudiandae ab quos labore. lorem
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis
            ratione voluptatibus cum? Autem dolorum earum, impedit quia quisquam
            laudantium iste inventore dolore perferendis eveniet obcaecati vel
            repudiandae ab quos labore.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis
            ratione voluptatibus cum? Autem dolorum earum, impedit quia quisquam
            laudantium iste inventore dolore perferendis eveniet obcaecati vel
            repudiandae ab quos labore.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis
            ratione voluptatibus cum? Autem dolorum earum, impedit quia quisquam
            laudantium iste inventore dolore perferendis eveniet obcaecati vel
            repudiandae ab quos labore.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis
            ratione voluptatibus cum? Autem dolorum earum, impedit quia quisquam
            laudantium iste inventore dolore perferendis eveniet obcaecati vel
            repudiandae ab quos labore. lorem
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis
            ratione voluptatibus cum? Autem dolorum earum, impedit quia quisquam
            laudantium iste inventore dolore perferendis eveniet obcaecati vel
            repudiandae ab quos labore.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis
            ratione voluptatibus cum? Autem dolorum earum, impedit quia quisquam
            laudantium iste inventore dolore perferendis eveniet obcaecati vel
            repudiandae ab quos labore.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis
            ratione voluptatibus cum? Autem dolorum earum, impedit quia quisquam
            laudantium iste inventore dolore perferendis eveniet obcaecati vel
            repudiandae ab quos labore.
          </p>
        </div>
      </div>
      <div className="m-28 flex flex-row gap-8 items-center">
        <div>
          <User size={90} />
        </div>
        <div className="font-poppins text-4xl">
          <h1>O autor</h1>
          <h1 className="font-bold text-blue-400">Nome do Autor</h1>
        </div>
      </div>
      <div className="m-28 gap-8 items-center">
        <h1 className="mb-14 font-poppins font-bold text-blue-400 text-4xl">
          Pode te interessar:
        </h1>
        <div className="flex flex-row items-center justify-center gap-8">
          <PostCard post={post} />
          <PostCard post={post} />
          <PostCard post={post} />
        </div>
      </div>
    </>
  );
}
