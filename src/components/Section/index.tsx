import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface SectionProps {
  title: string;
  titleAlign?: "left" | "center";
  link?: { text: string; href: string };
  children: ReactNode;
  className?: string;
}

export default function Section({ title, titleAlign = "left", link, children, className = "" }: SectionProps) {
  const isExternal = link?.href.startsWith("http");

  return (
    <section className={className}>
      <div className={`mb-5 flex items-center gap-4 ${titleAlign === "center" ? "justify-center" : "justify-between"}`}>
        <h2 className="text-lg font-bold text-dark-gray-2 md:text-2xl">{title}</h2>
        {link &&
          (isExternal ? (
            <a href={link.href} className="flex items-center gap-2 text-sm text-primary hover:underline md:text-lg">
              {link.text} <ArrowRight size={18} />
            </a>
          ) : (
            <Link to={link.href} className="flex items-center gap-2 text-sm text-primary hover:underline md:text-lg">
              {link.text} <ArrowRight size={18} />
            </Link>
          ))}
      </div>
      {children}
    </section>
  );
}
