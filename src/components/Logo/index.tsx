import logoHeader from "../../assets/logo-header.svg";
import logoFooter from "../../assets/logo-footer.svg";

interface LogoProps {
  /** "header" usa a logo rosa; "footer" usa a versão branca. */
  variant?: "header" | "footer";
  className?: string;
}

export default function Logo({ variant = "header", className = "" }: LogoProps) {
  return (
    <img
      src={variant === "footer" ? logoFooter : logoHeader}
      alt="Digital Store"
      width={253}
      height={44}
      className={`h-[44px] w-[253px] ${className}`}
    />
  );
}
