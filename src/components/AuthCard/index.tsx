import type { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle: ReactNode;
  children: ReactNode;
}

/** Moldura das telas de login e cadastro: formulário à esquerda e imagem à direita no desktop. */
export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="bg-gradient-to-b from-[#b5b6f2]/30 to-page">
      <div className="mx-auto flex max-w-[1440px] items-center justify-center gap-12 px-4 py-12 md:px-10 md:py-20 xl:px-[100px]">
        <section className="w-full max-w-[584px] rounded bg-white p-6 shadow-sm md:p-[30px]">
          <h1 className="text-2xl font-bold text-dark-gray-2 md:text-[32px]">{title}</h1>
          <div className="mt-3 text-sm text-dark-gray-2 md:text-base">{subtitle}</div>
          <div className="mt-8">{children}</div>
        </section>
        <img
          src="/product-image-1.jpeg"
          alt=""
          className="hidden w-[440px] rounded object-cover shadow-sm xl:block"
        />
      </div>
    </div>
  );
}
