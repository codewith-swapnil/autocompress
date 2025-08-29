export default function About({ t }) {
    return (
        <section id="about" className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 md:p-12 mb-16 mt-12 border border-blue-50 card">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-800 text-center" itemProp="headline">
                {t('about_swiftcompress')}
            </h2>
            <p className="text-gray-700 mb-4 text-lg" itemProp="description">
                {t('about_p1')}
            </p>
            <p className="text-gray-700 mb-4 text-lg">
                <span className="font-semibold text-indigo-700">{t('how_compression_works_q')}</span>
                <br />
                {t('how_compression_works_a')}
            </p>
            <p className="text-gray-700 mb-4 text-lg">
                <span className="font-semibold text-indigo-700">{t('supported_formats_q')}</span>
                <br />
                {t('supported_formats_a_long')}
            </p>
            <p className="text-gray-700 mb-4 text-lg">
                <span className="font-semibold text-indigo-700">{t('is_it_safe_q')}</span>
                <br />
                {t('is_it_safe_a')}
            </p>

            <article className="mt-10 mx-auto" itemScope itemType="https://schema.org/FAQPage">
                <h3 className="text-2xl md:text-3xl font-bold mb-5 text-purple-700 text-center">{t('faq')}</h3>
                <div className="space-y-6">
                    <div className="card p-6 shadow-md border border-blue-100" itemScope itemType="https://schema.org/Question">
                        <h4 className="font-bold text-xl text-indigo-700 mb-2" itemProp="name">
                            {t('faq_q1')}
                        </h4>
                        <p className="text-gray-700" itemProp="acceptedAnswer">
                            {t('faq_a1')}
                        </p>
                    </div>
                    <div className="card p-6 shadow-md border border-blue-100" itemScope itemType="https://schema.org/Question">
                        <h4 className="font-bold text-xl text-indigo-700 mb-2" itemProp="name">
                            {t('faq_q2')}
                        </h4>
                        <p className="text-gray-700" itemProp="acceptedAnswer">
                            {t('faq_a2')}
                        </p>
                    </div>
                    <div className="card p-6 shadow-md border border-blue-100" itemScope itemType="https://schema.org/Question">
                        <h4 className="font-bold text-xl text-indigo-700 mb-2" itemProp="name">
                            {t('faq_q3')}
                        </h4>
                        <p className="text-gray-700" itemProp="acceptedAnswer">
                            {t('faq_a3')}
                        </p>
                    </div>
                    <div className="card p-6 shadow-md border border-blue-100" itemScope itemType="https://schema.org/Question">
                        <h4 className="font-bold text-xl text-indigo-700 mb-2" itemProp="name">
                            {t('faq_q4')}
                        </h4>
                        <p className="text-gray-700" itemProp="acceptedAnswer">
                            {t('faq_a4')}
                        </p>
                    </div>
                </div>
            </article>
        </section>
    );
}