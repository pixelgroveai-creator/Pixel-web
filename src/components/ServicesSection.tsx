import React from 'react';
import { Terminal, Smartphone, Sparkles, Bot, CheckCircle2 } from 'lucide-react';
import { SERVICE_VECTORS } from '../data';
import { ServiceVector } from '../types';

interface ServicesSectionProps {
  onSelectVector: (vectorTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectVector }) => {
  const getIcon = (name: string, colorClass: string) => {
    switch (name) {
      case 'terminal':
        return <Terminal className={`w-5 h-5 ${colorClass}`} />;
      case 'smartphone':
        return <Smartphone className={`w-5 h-5 ${colorClass}`} />;
      case 'style':
        return <Sparkles className={`w-5 h-5 ${colorClass}`} />;
      case 'smart_toy':
        return <Bot className={`w-5 h-5 ${colorClass}`} />;
      default:
        return <Terminal className={`w-5 h-5 ${colorClass}`} />;
    }
  };

  return (
    <section className="w-full bg-transparent py-20 lg:py-28" id="services">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16">
          <div>
            <span className="text-xs text-[#c0c1ff] uppercase tracking-widest font-semibold font-mono">
              Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e2e2ea] mt-2 tracking-tight">
              Four Engineering Vectors. One Integrated Partner.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#c7c4d7] max-w-md mt-4 md:mt-0 leading-relaxed">
            Eliminate fragmented agencies. We bridge production software architecture with state-of-the-art synthetic media pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICE_VECTORS.map((vector: ServiceVector, index: number) => {
            const vectorColor =
              index === 0
                ? '#c0c1ff'
                : index === 1
                ? '#4cd7f6'
                : index === 2
                ? '#4edea3'
                : '#8083ff';

            const vectorBgGlow =
              index === 0
                ? 'hover:border-[#c0c1ff]/40 hover:shadow-[0_0_30px_rgba(192,193,255,0.1)]'
                : index === 1
                ? 'hover:border-[#4cd7f6]/40 hover:shadow-[0_0_30px_rgba(76,215,246,0.1)]'
                : index === 2
                ? 'hover:border-[#4edea3]/40 hover:shadow-[0_0_30px_rgba(78,222,163,0.1)]'
                : 'hover:border-[#8083ff]/40 hover:shadow-[0_0_30px_rgba(128,131,255,0.1)]';

            return (
              <div
                key={vector.vectorNumber}
                className={`bg-[#1d2025]/70 backdrop-blur-xl border border-[#464554]/30 rounded-xl p-6 sm:p-8 shadow-md flex flex-col justify-between transition-all duration-300 ${vectorBgGlow}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-sm font-semibold" style={{ color: vectorColor }}>
                      {vector.vectorNumber}
                    </span>
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${vectorColor}15` }}
                    >
                      {getIcon(vector.iconName, '')}
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-semibold text-[#e2e2ea] mb-3">
                    {vector.title}
                  </h3>

                  <p className="text-sm text-[#c7c4d7] mb-6 leading-relaxed">
                    {vector.description}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {vector.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-[#e2e2ea] text-xs sm:text-sm">
                        <CheckCircle2
                          size={18}
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: vectorColor }}
                        />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Tags Strip */}
                <div className="pt-4 bg-[#191c21]/80 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 px-6 sm:px-8 pb-4 rounded-b-xl flex flex-wrap items-center justify-between gap-2 border-t border-[#464554]/20">
                  <div className="flex flex-wrap gap-2">
                    {vector.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded bg-[#282a30] text-[#c7c4d7] font-mono text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => onSelectVector(vector.title)}
                    className="text-xs font-semibold hover:underline cursor-pointer flex items-center gap-1"
                    style={{ color: vectorColor }}
                  >
                    Select Capability &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
