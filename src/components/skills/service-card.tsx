interface ServiceCardProps {
  title: string;
  iconClass: string;
  description: string;
}

function ServiceCard({ title, iconClass, description }: ServiceCardProps) {
  return (
    <article className="bg-skills-card rounded-2xl p-5">
      <div className="service-icon mb-2">
        <span className={`text-2xl ${iconClass}`}></span>
      </div>
      <h3 className="font-medium text-sm mb-2.5">{title}</h3>
      <p className="text-tiny-plus font-normal leading-3.5">{description}</p>
    </article>
  );
}

export default ServiceCard;
