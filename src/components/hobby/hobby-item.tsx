interface HobbyItemProps {
  hobby: HobbyItemType;
}

function HobbyItem({ hobby }: HobbyItemProps) {
  return (
    <div className="hobby-item grid gap-1.5 grid-flow-col auto-cols-max items-center">
      <span className="text-primary text-base">
        <i className={hobby.iconClass}></i>
      </span>
      <span className="text-xs text-body-txt">{hobby.label}</span>
    </div>
  );
}

export default HobbyItem;
