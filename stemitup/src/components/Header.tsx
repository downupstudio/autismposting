import { Music } from "lucide-react";

interface HeaderProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export const Header = ({ onNavigate, activeSection }: HeaderProps) => {
  const sections = [
    { id: "official", label: "Official Stems" },
    { id: "custom", label: "Make Your Own Stems" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Music className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              StemItUp
            </h1>
          </div>
          
          <nav className="flex items-center gap-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => onNavigate(section.id)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === section.id
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};
