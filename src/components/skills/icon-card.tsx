import Image from "next/image";

interface IconCardProps {
  name: string;
  path: string;
}

function IconCard({ name, path }: IconCardProps) {
  return (
    <div
      title={name}
      className="category-item flex items-center justify-center bg-skills-card rounded-xl p-2 aspect-square min-w-13 lg:min-w-15"
    >
      <Image
        src={path}
        alt={name}
        width={32}
        height={32}
        style={{ width: "auto", height: "auto" }}
      />
    </div>
  );
}

export default IconCard;
