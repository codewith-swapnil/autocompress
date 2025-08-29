'use client';

import { useTranslation } from 'react-i18next';

export default function About() {
    const { t } = useTranslation();

    return (
        <section id="about" className="w-full max-w-4xl mx-auto bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl p-10 md:p-12 mb-16 mt-12 border border-blue-100 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-200 rounded-full opacity-20 blur-xl"></div>
            
            <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-center" itemProp="headline">
                    {t('about_swiftcompress')}
                </h2>
                
                <div className="space-y-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300">
                        <p className="text-gray-700 text-lg leading-relaxed" itemProp="description">
                            {t('about_p1')}
                        </p>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300">
                        <h3 className="font-semibold text-xl text-indigo-700 mb-3 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                            {t('how_compression_works_q')}
                        </h3>
                        <p className="text-gray-700 pl-7 border-l-2 border-indigo-200 ml-1">
                            {t('how_compression_works_a')}
                        </p>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300">
                        <h3 className="font-semibold text-xl text-indigo-700 mb-3 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {t('supported_formats_q')}
                        </h3>
                        <p className="text-gray-700 pl-7 border-l-2 border-indigo-200 ml-1">
                            {t('supported_formats_a_long')}
                        </p>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300">
                        <h3 className="font-semibold text-xl text-indigo-700 mb-3 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            {t('is_it_safe_q')}
                        </h3>
                        <p className="text-gray-700 pl-7 border-l-2 border-indigo-200 ml-1">
                            {t('is_it_safe_a')}
                        </p>
                    </div>
                </div>

                <article className="mt-12 mx-auto" itemScope itemType="https://schema.org/FAQPage">
                    <h3 className="text-3xl md:text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 text-center">
                        {t('faq')}
                    </h3>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((item) => (
                            <div 
                                key={item} 
                                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                itemScope 
                                itemType="https://schema.org/Question"
                            >
                                <h4 className="font-bold text-xl text-indigo-700 mb-3 flex items-center" itemProp="name">
                                    <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {t(`faq_q${item}`)}
                                </h4>
                                <p className="text-gray-700 pl-7 border-l-2 border-indigo-200 ml-1" itemProp="acceptedAnswer">
                                    {t(`faq_a${item}`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </article>
            </div>
        </section>
    );
}