import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ChevronDown, Target, FileCheck, Award, Users, Clock } from 'lucide-react';

const InformasiSetiapSaat = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const dataCategories = [
    {
      id: 1,
      title: 'Program Kerja',
      icon: Target,
      color: 'emerald',
      items: [
        {
          name: 'RENSTRA KEMENAG RI 2020-2024',
          url: 'https://drive.google.com/file/d/1I-Wu5ZQzAZsO7ycSGikkreseO1qSHD4R/view?usp=sharing'
        },
        {
          name: 'RENSTRA KANWIL KEMENAG JATIM 2020-2024',
          url: 'https://drive.google.com/file/d/1oFTMkgYON-oxmF43EceckvdJz-q7fq1N/view?usp=sharing'
        },
        {
          name: 'RENSTRA KANKEMENAG KAB. MAGETAN 2020-2024',
          url: 'https://drive.google.com/file/d/1TSIXyc4pYURLBhaADXW2pc1PhszMXqLt/view?usp=sharing'
        }
      ]
    },
    {
      id: 2,
      title: 'SOP',
      icon: FileCheck,
      color: 'teal',
      items: []
    },
    {
      id: 3,
      title: 'SPM',
      icon: Award,
      color: 'green',
      items: []
    },
    {
      id: 4,
      title: 'Informasi Pendaftaran Haji',
      icon: Users,
      color: 'cyan',
      items: [
        {
          name: 'Informasi Pendaftaran Haji',
          url: 'https://drive.google.com/file/d/1Cr5yn_m-C8j7AaeJV_Yq5sShGdo0KRyW/view?usp=sharing'
        }
      ]
    },
    {
      id: 5,
      title: 'Jadwal Waktu Sholat Tahun 2025',
      icon: Clock,
      color: 'sky',
      items: [
        {
          name: 'Jadwal Waktu Sholat Tahun 2025',
          url: 'https://drive.google.com/file/d/1Kpnbv_CCGkRPVQgahAosYOq0RzxVuRST/view?usp=sharing'
        }
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      emerald: {
        bg: 'bg-emerald-500',
        hover: 'hover:bg-emerald-600',
        text: 'text-emerald-600',
        border: 'border-emerald-200',
        light: 'bg-emerald-50'
      },
      teal: {
        bg: 'bg-teal-500',
        hover: 'hover:bg-teal-600',
        text: 'text-teal-600',
        border: 'border-teal-200',
        light: 'bg-teal-50'
      },
      green: {
        bg: 'bg-green-500',
        hover: 'hover:bg-green-600',
        text: 'text-green-600',
        border: 'border-green-200',
        light: 'bg-green-50'
      },
      cyan: {
        bg: 'bg-cyan-500',
        hover: 'hover:bg-cyan-600',
        text: 'text-cyan-600',
        border: 'border-cyan-200',
        light: 'bg-cyan-50'
      },
      sky: {
        bg: 'bg-sky-500',
        hover: 'hover:bg-sky-600',
        text: 'text-sky-600',
        border: 'border-sky-200',
        light: 'bg-sky-50'
      }
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-slate-800 mb-3">Informasi Setiap Saat</h1>
          <p className="text-slate-600">
            Akses cepat ke berbagai dokumen dan informasi layanan publik
          </p>
        </motion.div>

        {/* Categories */}
        <div className="space-y-4">
          {dataCategories.map((category, index) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            const colorClasses = getColorClasses(category.color);
            const hasItems = category.items.length > 0;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Category Header */}
                <motion.button
                  onClick={() => hasItems && setActiveCategory(isActive ? null : category.id)}
                  disabled={!hasItems}
                  className={`w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border ${
                    isActive ? colorClasses.border : 'border-slate-200'
                  } overflow-hidden ${
                    !hasItems ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                  whileHover={hasItems ? { scale: 1.01 } : {}}
                  whileTap={hasItems ? { scale: 0.99 } : {}}
                >
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`${colorClasses.bg} ${colorClasses.hover} p-3 rounded-lg transition-colors`}
                      >
                        <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                      </div>
                      <div className="text-left">
                        <h3 className="text-base font-semibold text-slate-800">
                          {category.title}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {hasItems
                            ? `${category.items.length} dokumen`
                            : 'Belum ada dokumen'}
                        </p>
                      </div>
                    </div>
                    {hasItems && (
                      <motion.div
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>

                {/* Items List */}
                <AnimatePresence>
                  {isActive && hasItems && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 space-y-2">
                        {category.items.map((item, itemIndex) => (
                          <motion.div
                            key={itemIndex}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: itemIndex * 0.05 }}
                          >
                            <div
                              className={`bg-white border ${colorClasses.border} rounded-lg p-4 transition-all duration-200`}
                            >
                              <div className="flex items-center justify-between gap-4">
                                <p className="text-sm text-slate-700 flex-1 leading-relaxed">
                                  {item.name}
                                </p>
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-shrink-0"
                                >
                                  <div
                                    className={`${colorClasses.bg} ${colorClasses.hover} px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer`}
                                  >
                                    <Download
                                      className="w-4 h-4 text-white"
                                      strokeWidth={2}
                                    />
                                    <span className="text-sm font-medium text-white">
                                      Download
                                    </span>
                                  </div>
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InformasiSetiapSaat;
