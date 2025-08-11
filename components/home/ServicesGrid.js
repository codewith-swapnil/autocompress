import { ArrowRight } from 'lucide-react';
import { useTranslation } from '../../context/TranslationContext';

const ServicesGrid = ({ services, showService }) => {
  const { translations } = useTranslation();
  
  const serviceKeys = {
    'Plumbing': translations.plumbing,
    'Electrical': translations.electrical,
    'Painting': translations.painting,
    'Carpentry': translations.carpentry,
    'AC Repair': translations.acRepair,
    'Cleaning': translations.cleaning
  };

  return (
    <section className="mx-4 mb-6 bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold text-gray-900">
          <span className="bg-gradient-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent">
            {translations.popularServices}
          </span>
        </h2>
        <button className="text-teal-700 font-medium text-sm flex items-center gap-1 hover:text-teal-800">
          {translations.viewAll} <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(services).map(([key, service]) => (
          <div
            key={key}
            onClick={() => showService(key)}
            className="bg-white border border-gray-200 rounded-2xl p-5 text-center cursor-pointer hover:shadow-lg hover:border-teal-400 hover:-translate-y-1 transition-all"
          >
            <div className="w-15 h-15 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl hover:bg-teal-100 transition-colors">
              {service.icon}
            </div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {serviceKeys[key]}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesGrid;