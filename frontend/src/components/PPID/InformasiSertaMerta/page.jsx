import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ChevronDown, Calendar, Plane, Users } from 'lucide-react';

const InformasiSertaMerta = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const dataCategories = [
    {
      id: 1,
      title: 'SKB 3 Menteri Libur Nasional dan Cuti Bersama Tahun 2025',
      icon: Calendar,
      color: 'blue',
      items: [
        {
          name: 'SKB 3 Menteri Libur Nasional dan Cuti Bersama Tahun 2025',
          url: 'https://drive.google.com/file/d/1sJlP0Aehk6SiTkjyl3_79JsgFybK7RSo/view?usp=sharing'
        }
      ]
    },
    {
      id: 2,
      title: 'Info Pemberangkatan Haji 2025 Kab. Magetan',
      icon: Plane,
      color: 'emerald',
      items: [
        {
          name: 'Info Pemberangkatan Haji 2025 Kab. Magetan',
          url: 'https://drive.google.com/file/d/1RW8TqmTTOqsrKOADBkN8dK04M9-0zM2m/view?usp=sharing'
        }
      ]
    },
    {
      id: 3,
      title: 'Jadwal Kloter SUB 2025',
      icon: Users,
      color: 'violet',
      items: [
        {
          name: 'Jadwal Kloter SUB 2025',
          url: 'https://drive.google.com/file/d/1xxmAoUF3pvbDUc_7AGLKPb2dRfaudX--/view?usp=sharing'
        }
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-500',
        hover: 'hover:bg-blue-600',
        text: 'text-blue-600',
        border: 'border-blue-200',
        light: 'bg-blue-50'
      },
      emerald: {
        bg: 'bg-emerald-500',
        hover: 'hover:bg-emerald-600',
        text: 'text-emerald-600',
        border: 'border-emerald-200',
        light: 'bg-emerald-50'
      },
      violet: {
        bg: 'bg-violet-500',
        hover: 'hover:bg-violet-600',
        text: 'text-violet-600',
        border: 'border-violet-200',
        light: 'bg-violet-50'
      }
    };
    return colors[color];
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-slate-800 mb-3">Informasi Serta Merta</h1>
          <p className="text-slate-600">Akses dokumen dan informasi penting</p>
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

export default InformasiSertaMerta;