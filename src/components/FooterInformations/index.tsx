import { Link } from "react-router-dom";
import type { LinkItem } from "../../types";

interface FooterInformationsProps {
  title: string;
  informations: LinkItem[];
}

export default function FooterInformations({ title, informations }: FooterInformationsProps) {
  return (
    <div>
      <h3 className="mb-5 text-lg font-semibold text-white">{title}</h3>
      <ul className="flex flex-col gap-3">
        {informations.map((info) => (
          <li key={info.text}>
            <Link to={info.link} className="text-base text-white hover:underline">
              {info.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
