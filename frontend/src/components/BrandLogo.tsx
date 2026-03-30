const logoNomed = new URL("../../media/Logo Nomed AI Driven Tech solo (2).png", import.meta.url).href;

type BrandLogoProps = {
  className?: string;
  alt?: string;
};

export default function BrandLogo({ className = "h-8 w-auto", alt = "Nomed" }: BrandLogoProps) {
  return <img src={logoNomed} alt={alt} className={className} loading="eager" />;
}
