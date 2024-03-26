import {
  Bike,
  BookOpen,
  BusFront,
  Cpu,
  Gamepad,
  Stethoscope,
  TestTubeDiagonal,
} from 'lucide-react';

export type TagsProps = {
  tags: string;
};

export default function Tags({ tags }: TagsProps) {
  const checkTagIcon = () => {
    if (tags === 'TECNOLOGIA') return <Cpu size={20} />;
    if (tags === 'CIENCIA') return <TestTubeDiagonal size={20} />;
    if (tags === 'SAUDE') return <Stethoscope size={20} />;
    if (tags === 'CULTURA') return <BookOpen size={20} />;
    if (tags === 'VIAGENS') return <BusFront size={20} />;
    if (tags === 'ESPORTE') return <Bike size={20} />;
    if (tags === 'GEEK') return <Gamepad />;
  };

  const icon = checkTagIcon();

  return (
    <div className="flex gap-3 items-center bg-blue-400 p-2 rounded-lg text-white">
      {icon}
      {tags}
    </div>
  );
}
