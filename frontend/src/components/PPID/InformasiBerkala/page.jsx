import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ChevronDown, TrendingUp, FileText, BarChart3, Shield } from 'lucide-react';

const InformasiBerkala = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const dataCategories = [
    {
      id: 1,
      title: 'Laporan Survei Kepuasan Masyarakat',
      icon: TrendingUp,
      color: 'emerald',
      items: [
        {
          name: 'Laporan Hasil Survei Kepuasan Masyarakat Triwulan I 2025',
          url: 'https://drive.google.com/file/d/1cUqovEaF47M6iXzDy-PlMOgVehkvwGIp/view?usp=sharing'
        },
        {
          name: 'Laporan Hasil Survei Kepuasan Masyarakat Triwulan III 2024',
          url: 'https://drive.google.com/file/d/1R5lZU2uFiurRKEtX4jZ1leoYboj0kMr-/view?usp=sharing'
        },
        {
          name: 'Laporan Hasil Survei Kepuasan Masyarakat Triwulan IV 2024',
          url: 'https://drive.google.com/file/d/1EgliPspc1IldnspTVY5wn0xzoIXs1SyH/view?usp=sharing'
        }
      ]
    },
    {
      id: 2,
      title: 'Perjanjian Kinerja',
      icon: FileText,
      color: 'amber',
      items: [
        {
          name: 'Perjanjian Kinerja 2025',
          url: 'https://drive.google.com/file/d/1YIMwdaAWB8Y97OGD-Udxv7GcpdwUUtJK/view?usp=sharing'
        },
        {
          name: 'Perjanjian Kinerja 2024',
          url: 'https://drive.google.com/file/d/1ka2q3O2aoQ-6CGl4rWrE32fyC7Oh2PJV/view?usp=sharing'
        },
        {
          name: 'Perjanjian Kinerja 2023',
          url: 'https://drive.google.com/file/d/1QWcj3u3BHlGgXIZHSq51GGcf3VSv3iq7/view?usp=sharing'
        },
        {
          name: 'Perjanjian Kinerja 2022',
          url: 'https://drive.google.com/file/d/1Z951MrBbAfbnk04f0kLW3uDQlK57JXry/view?usp=sharing'
        }
      ]
    },
    {
      id: 3,
      title: 'Laporan Kinerja',
      icon: BarChart3,
      color: 'green',
      items: [
        {
          name: 'Laporan Kinerja 2024',
          url: 'https://drive.google.com/file/d/1Cb21kUD0N9P8aqSXyJ5EOTbfhbfblP-y/view?usp=sharing'
        },
        {
          name: 'Laporan Kinerja 2023',
          url: 'https://drive.google.com/file/d/1nR0QNKU-OyDnf9x6_9KnkJ-77lcsude1/view?usp=sharing'
        },
        {
          name: 'Laporan Kinerja 2022',
          url: 'https://drive.google.com/file/d/1k3cMueq9lUFfu7ihpJm06y3nLzb480lC/view?usp=sharing'
        }
      ]
    },
    {
      id: 4,
      title: 'Laporan Survei Persepsi Korupsi',
      icon: Shield,
      color: 'lime',
      items: [
        {
          name: 'Laporan Hasil Survei Persepsi Korupsi Triwulan IV 2024',
          url: 'https://drive.google.com/file/d/12b1zX2PO0Eh4Qp990fwXfxXaxtobTu6O/view?usp=sharing'
        },
        {
          name: 'Laporan Hasil Survei Persepsi Korupsi Triwulan III 2024',
          url: 'https://drive.google.com/file/d/1qqRqSk_DHoRon0Zp6qgi47XN-Ie3f0he/view?usp=sharing'
        },
        {
          name: 'Laporan Hasil Survei Persepsi Korupsi Triwulan I 2025',
          url: 'https://drive.google.com/file/d/1PLYfzxJsliLzEv_dYOmgsuH5J-kpQOYW/view?usp=sharing'
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
      amber: {
        bg: 'bg-amber-500',
        hover: 'hover:bg-amber-600',
        text: 'text-amber-600',
        border: 'border-amber-200',
        light: 'bg-amber-50'
      },
      green: {
        bg: 'bg-green-600',
        hover: 'hover:bg-green-700',
        text: 'text-green-600',
        border: 'border-green-200',
        light: 'bg-green-50'
      },
      lime: {
        bg: 'bg-lime-500',
        hover: 'hover:bg-lime-600',
        text: 'text-lime-600',
        border: 'border-lime-200',
        light: 'bg-lime-50'
      }
    };
    return colors[color];
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-slate-800 mb-3">Informasi Berkala</h1>
          <p className="text-slate-600">Akses dokumen dan laporan resmi</p>
        </motion.div>

        {/* Categories */}
        <div className="space-y-4">
          {dataCategories.map((category, index) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            const colorClasses = getColorClasses(category.color);

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Category Header */}
                <motion.button
                  onClick={() => setActiveCategory(isActive ? null : category.id)}
                  className="w-full bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-slate-200 overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`${colorClasses.bg} ${colorClasses.hover} p-3 rounded-lg transition-colors`}>
                        <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                      </div>
                      <div className="text-left">
                        <h3 className="text-base font-semibold text-slate-800">{category.title}</h3>
                        <p className="text-sm text-slate-500">{category.items.length} dokumen</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    </motion.div>
                  </div>
                </motion.button>

                {/* Items List */}
                <AnimatePresence>
                  {isActive && (
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
                            <div className={`bg-white border ${colorClasses.border} rounded-lg p-4 transition-all duration-200`}>
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
                                  <div className={`${colorClasses.bg} ${colorClasses.hover} px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer`}>
                                    <Download className="w-4 h-4 text-white" strokeWidth={2} />
                                    <span className="text-sm font-medium text-white">Download</span>
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

export default InformasiBerkala;