import HobbyItem from "./hobby-item";

interface HobbyContentProps {
  hobbies: HobbyItemType[];
}

function HobbyContent({ hobbies }: HobbyContentProps) {
  if (!hobbies) return null;

  return (
    <section className="hobbies flex items-center gap-4">
      {hobbies.map((hobby) => (
        <HobbyItem key={hobby.id} hobby={hobby} />
      ))}
    </section>
  );
}

export default HobbyContent;
