'use client'; // This directive is necessary because the component uses the useTranslation hook.

import React from 'react';
import Head from 'next/head'; // Use Next.js's built-in Head component.
import { useTranslation } from 'react-i18next';

export default function Terms() {
  const { t } = useTranslation();

  return (
    <>
      {/* Replaces <Helmet> for managing the document's <head> tags */}
      <Head>
        <title>{t('terms_title', 'Terms of Service')} - AutoCompress</title>
        <meta
          name="description"
          content={t('terms_meta_description', 'Terms and conditions for using AutoCompress')}
        />
      </Head>

      <div className="flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="card max-w-4xl w-full">
          <h1 className="text-4xl font-extrabold mb-8 text-center text-gradient">
            {t('terms_of_service', 'Terms of Service')}
          </h1>

          <div className="prose max-w-none text-slate-700 leading-relaxed">
            <h2 className="text-2xl font-bold mb-4 text-indigo-700">{t('terms_intro_header', '1. Introduction')}</h2>
            <p className="mb-4">
              {t(
                'terms_intro',
                'By accessing or using the AutoCompress website and services, you agree to be bound by these Terms of Service.'
              )}
            </p>

            <h2 className="text-2xl font-bold mb-4 text-indigo-700">{t('service_description', '2. Service Description')}</h2>
            <p className="mb-4">
              {t(
                'service_description_detail',
                'AutoCompress provides an online image compression tool that processes images directly in your browser without uploading them to our servers.'
              )}
            </p>

            <h2 className="text-2xl font-bold mb-4 text-indigo-700">{t('user_responsibilities', '3. User Responsibilities')}</h2>
            <p className="mb-4">
              {t(
                'user_responsibilities_detail',
                'You agree not to use the service for any illegal purpose or to upload content that violates copyright laws.'
              )}
            </p>

            <h2 className="text-2xl font-bold mb-4 text-indigo-700">{t('limitations', '4. Limitations of Liability')}</h2>
            <p className="mb-4">
              {t(
                'limitations_detail',
                'AutoCompress is not liable for any damages resulting from the use of our service. We make no guarantees about the quality or results of image compression.'
              )}
            </p>

            <h2 className="text-2xl font-bold mb-4 text-indigo-700">{t('changes_terms', '5. Changes to Terms')}</h2>
            <p className="mb-4">
              {t(
                'changes_terms_detail',
                'We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of the modified terms.'
              )}
            </p>

            <p className="mt-8 text-sm text-gray-500">
              {t('last_updated', 'Last updated')}: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}