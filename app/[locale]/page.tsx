import { br } from "@/lib/i18n/dictionaries/br";
import { bo } from "@/lib/i18n/dictionaries/bo";
import Logo from "@/components/Logo";

type Props = {
  params: { locale: string };
};

export default function Home({ params: { locale } }: Props) {
  // Selección simple de diccionario (luego haremos algo más robusto)
  const dict = locale === "br" ? br : bo;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-primary text-white text-center">
      
      {/* Hero Section */}
      <div className="max-w-4xl w-full flex flex-col items-center gap-8">
        <Logo className="h-24 md:h-32 mb-4 animate-fade-in" />
        
        <h1 className="text-4xl md:text-6xl font-tomorrow font-bold text-transparent bg-clip-text bg-gradient-to-r from-warning to-success">
          {dict.hero.title}
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl font-roboto-flex">
          {dict.hero.subtitle}
        </p>

        <button className="mt-8 px-8 py-4 bg-accent hover:bg-highlight text-white font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(55,0,255,0.5)] hover:shadow-[0_0_40px_rgba(55,0,255,0.7)] font-tomorrow uppercase tracking-wider">
          {dict.hero.cta}
        </button>
      </div>

      {/* Benefits Preview */}
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {dict.benefits.items.map((item, index) => (
          <div key={index} className="p-6 border border-secondary bg-secondary/30 rounded-xl backdrop-blur-sm hover:border-warning transition-colors group">
            <h3 className="text-xl font-tomorrow font-bold text-warning group-hover:text-success transition-colors">
              {item}
            </h3>
          </div>
        ))}
      </div>

      <footer className="absolute bottom-8 text-sm text-gray-500 font-source-code">
        Locale: <span className="text-warning">{locale.toUpperCase()}</span>
      </footer>
    </main>
  );
}
