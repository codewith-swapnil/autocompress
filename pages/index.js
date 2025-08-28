'use client';

import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Script from "next/script";
import imageCompression from "browser-image-compression";
import JSZip from "jszip";
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { t } = useTranslation();
  const [files, setFiles] = useState([]);
  const [compressedFiles, setCompressedFiles] = useState([]);
  const [quality, setQuality] = useState(0.7);
  const [manualMode, setManualMode] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAd, setShowAd] = useState(false);

  const supportedImageTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  useEffect(() => {
    if ((files.length > 0 || compressedFiles.length > 0) && !isProcessing) {
      const timer = setTimeout(() => {
        setShowAd(true);
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error("AdSense push error:", e);
        }
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowAd(false);
    }
  }, [files, compressedFiles, isProcessing]);

  const compressImages = useCallback(
    async (inputFiles, currentQuality) => {
      setIsProcessing(true);
      const compressed = await Promise.all(
        inputFiles.map(async (file) => {
          if (supportedImageTypes.includes(file.type)) {
            const options = {
              maxSizeMB: 1,
              maxWidthOrHeight: 1920,
              useWebWorker: true,
              initialQuality: currentQuality,
            };
            try {
              const compressedBlob = await imageCompression(file, options);
              return {
                original: file,
                compressed: compressedBlob,
                id: file.name + file.lastModified,
              };
            } catch (error) {
              console.error("Error compressing file:", file.name, error);
              return {
                original: file,
                compressed: null,
                error: true,
                id: file.name + file.lastModified
              };
            }
          }
          return {
            original: file,
            compressed: null,
            unsupported: true,
            id: file.name + file.lastModified
          };
        })
      );
      setCompressedFiles(compressed);
      setIsProcessing(false);
    },
    [supportedImageTypes]
  );

  const handleClearFiles = () => {
    setFiles([]);
    setCompressedFiles([]);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = Array.from(e.dataTransfer.files)
      .filter(file => supportedImageTypes.includes(file.type))
      .slice(0, 20);
    setFiles(droppedFiles);
    if (droppedFiles.length > 0) {
      await compressImages(droppedFiles, quality);
    } else {
      setCompressedFiles([]);
    }
  };

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files)
      .filter(file => supportedImageTypes.includes(file.type))
      .slice(0, 20);
    setFiles(selectedFiles);
    if (selectedFiles.length > 0) {
      await compressImages(selectedFiles, quality);
    } else {
      setCompressedFiles([]);
    }
  };

  const handleQualityChange = async (e) => {
    const newQuality = parseFloat(e.target.value) / 100;
    setQuality(newQuality);
    if (files.length > 0) {
      await compressImages(files, newQuality);
    }
  };

  const handleIndividualQualityChange = async (idx, originalFile, newIndividualQuality) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: newIndividualQuality,
    };
    try {
      const compressedBlob = await imageCompression(originalFile, options);
      setCompressedFiles((prev) =>
        prev.map((item, i) =>
          i === idx ? {
            ...item,
            compressed: compressedBlob,
            individualQuality: newIndividualQuality
          } : item
        )
      );
    } catch (error) {
      console.error("Error re-compressing individual file:", originalFile.name, error);
    }
  };

  const handleDownload = (blob, name) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = async () => {
    if (compressedFiles.length === 0) return;
    setIsProcessing(true);
    const zip = new JSZip();
    compressedFiles.forEach(({ compressed, original }) => {
      if (compressed) {
        zip.file(
          `compressed-${original.name.replace(/\.(jpeg|jpg|png|webp|gif)$/i, '')}.${compressed.type.split('/')[1] || 'jpeg'}`,
          compressed,
          { binary: true }
        );
      }
    });
    try {
      const content = await zip.generateAsync({ type: "blob" });
      handleDownload(content, "autocompress-images.zip");
    } catch (error) {
      console.error("Error generating zip:", error);
      alert(t('zip_error'));
    } finally {
      setIsProcessing(false);
    }
  };

  const getCompressionSaving = (originalSize, compressedSize) => {
    if (!originalSize || !compressedSize) return 0;
    return Math.max(0, Math.round(100 - (compressedSize / originalSize) * 100));
  };

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta
          name="description"
          content={t('meta_description')}
        />
        <meta
          name="keywords"
          content="image compressor, jpg compressor, png compressor, webp compressor, gif compressor, online image compressor, compress image, reduce image size, optimize image, photo compressor, free image compressor, no upload image compressor, in-browser compression"
        />
        <link rel="canonical" href="https://compressimages.vercel.app/" />

        <meta
          property="og:title"
          content={t('title')}
        />
        <meta
          property="og:description"
          content={t('meta_description')}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://compressimages.vercel.app/" />
        <meta
          property="og:image"
          content="https://compressimages.vercel.app/og-image.png"
        />
        <meta property="og:image:alt" content="AutoCompress Logo" />
        <meta property="og:locale" content="en_US" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yourtwitterhandle" />
        <meta
          name="twitter:title"
          content={t('title')}
        />
        <meta
          name="twitter:description"
          content={t('meta_description')}
        />
        <meta
          name="twitter:image"
          content="https://compressimages.vercel.app/og-image.png"
        />
        <meta name="twitter:creator" content="@yourtwitterhandle" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-40620600997"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50">
        <section className="w-full bg-gradient-to-r from-blue-800 via-indigo-700 to-purple-600 py-20 px-4 text-white text-center shadow-2xl rounded-b-[4rem] relative overflow-hidden hero-section">
          <h1 className="relative text-5xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-xl animate-fade-in hero-title">
            {t('hero_title')}
          </h1>
          <p className="relative max-w-3xl mx-auto text-xl md:text-2xl font-medium mb-10 animate-fade-in delay-100 hero-subtitle">
            {t('hero_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-6 animate-fade-in delay-200">
            <a
              href="#compressor"
              className="bg-white text-indigo-700 font-bold px-10 py-4 rounded-full shadow-lg hover:bg-indigo-50 transition-all duration-300 text-lg md:text-xl focus:outline-none focus:ring-4 focus:ring-white/50 transform hover:scale-105 btn"
            >
              {t('start_compressing')}
            </a>
            <a
              href="#about"
              className="bg-indigo-600 text-white font-semibold px-10 py-4 rounded-full shadow-lg hover:bg-indigo-800 transition-all duration-300 text-lg md:text-xl focus:outline-none focus:ring-4 focus:ring-white/50 transform hover:scale-105 btn"
            >
              {t('learn_more')}
            </a>
          </div>
          <p className="relative max-w-xl mx-auto text-base opacity-90 animate-fade-in delay-300">
            {t('privacy_note')}
          </p>
        </section>

        <section id="compressor" className="w-full max-w-4xl mx-auto mt-16 px-4">
          {/* Enhanced File Drop Zone */}
          <div
            className="border-2 border-dashed border-indigo-300 rounded-3xl p-8 mb-12 bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300 hover:border-purple-500 hover:shadow-xl flex flex-col items-center justify-center relative group min-h-[300px] text-center cursor-pointer"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => document.getElementById('fileInput').click()}
          >
            <input
              type="file"
              multiple
              accept={supportedImageTypes.join(',')}
              className="hidden"
              id="fileInput"
              onChange={handleFileChange}
              max={20}
            />

            <div className="flex flex-col items-center justify-center gap-4 p-6 rounded-2xl">
              <div className="p-4 bg-indigo-100 rounded-full">
                <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-indigo-800 mb-2">
                  {t('select_files')}
                </h3>
                <p className="text-gray-600">
                  {t('supported_formats')}
                </p>
              </div>
            </div>

            {files.length > 0 && (
              <div className="absolute top-4 right-4 flex gap-2">
                <div className="bg-indigo-600 text-white text-sm px-3 py-1 rounded-full shadow-md font-medium">
                  {files.length} {t('files_selected')}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClearFiles();
                  }}
                  className="bg-red-500 text-white text-sm px-3 py-1 rounded-full shadow-md font-medium hover:bg-red-600 transition-colors"
                >
                  {t('clear_all')}
                </button>
              </div>
            )}
          </div>

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="text-center my-8 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-indigo-100">
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="relative w-12 h-12">
                  <svg className="animate-spin h-10 w-10 text-indigo-600" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-indigo-800">
                  {t('processing_images')}
                </h4>
                <p className="text-gray-600 text-sm max-w-md">
                  {t('processing_tip')}
                </p>
              </div>
            </div>
          )}

          {/* Compression Controls */}
          {files.length > 0 && (
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg mb-12 border border-indigo-100">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      id="manualMode"
                      type="checkbox"
                      checked={manualMode}
                      onChange={() => setManualMode(!manualMode)}
                      className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-colors"
                    />
                    <label htmlFor="manualMode" className="text-gray-800 font-medium cursor-pointer">
                      {t('manual_mode')}
                    </label>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="h-4 w-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{t('manual_mode_tip')}</span>
                  </div>
                </div>

                {!manualMode && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label htmlFor="quality" className="block font-medium text-gray-700">
                        {t('global_compression_quality')}
                      </label>
                      <span className="font-bold text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full text-sm">
                        {Math.round(quality * 100)}%
                      </span>
                    </div>
                    <input
                      id="quality"
                      type="range"
                      min="10"
                      max="90"
                      value={Math.round(quality * 100)}
                      onChange={handleQualityChange}
                      className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="flex justify-between text-sm font-medium text-gray-700">
                      <span className="text-red-600">{t('smaller_size')}</span>
                      <span className="text-green-600">{t('better_quality')}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Results Grid */}
          {compressedFiles.length > 0 && (
            <div className="mb-16 w-full px-4">
              <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                  {compressedFiles.map(({ original, compressed, unsupported, error, id }, idx) => (
                    <div
                      key={id}
                      className="w-full max-w-sm bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-4">
                        {compressed && !error ? (
                          <>
                            <img
                              src={URL.createObjectURL(compressed)}
                              alt={`${t('image_alt')} ${original.name}`}
                              className="w-full h-full object-contain"
                              loading="lazy"
                            />
                            <div className="absolute bottom-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                              {t('saved')} {getCompressionSaving(original.size, compressed.size)}%
                            </div>
                          </>
                        ) : unsupported ? (
                          <div className="text-center p-4">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-3">
                              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                            <h4 className="font-medium text-gray-800">
                              {t('unsupported_file')}
                            </h4>
                          </div>
                        ) : error ? (
                          <div className="text-center p-4">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-3">
                              <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.3 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                            </div>
                            <h4 className="font-medium text-gray-800">
                              {t('compression_error')}
                            </h4>
                          </div>
                        ) : (
                          <div className="text-center p-4">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mb-3">
                              <svg className="h-6 w-6 text-indigo-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                            </div>
                            <h4 className="font-medium text-gray-800">
                              {t('processing')}
                            </h4>
                          </div>
                        )}
                      </div>

                      <div className="p-4 border-t border-gray-100">
                        <div className="mb-3">
                          <h4 className="text-sm font-medium text-gray-800 truncate" title={original.name}>
                            {original.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {t('original')}: {(original.size / 1024).toFixed(1)} KB
                          </p>
                          {compressed && (
                            <p className="text-xs text-gray-500">
                              {t('compressed')}: {(compressed.size / 1024).toFixed(1)} KB
                            </p>
                          )}
                        </div>

                        {compressed && (
                          <div className="space-y-3">
                            {manualMode && (
                              <div className="space-y-2">
                                <label htmlFor={`quality-slider-${idx}`} className="block text-xs font-medium text-gray-700">
                                  {t('individual_quality')}
                                </label>
                                <div className="flex items-center gap-3">
                                  <input
                                    id={`quality-slider-${idx}`}
                                    type="range"
                                    min="10"
                                    max="90"
                                    value={Math.round((compressed.individualQuality || quality) * 100)}
                                    onChange={async (e) => {
                                      const newQualityVal = parseFloat(e.target.value) / 100;
                                      await handleIndividualQualityChange(idx, original, newQualityVal);
                                    }}
                                    className="flex-1 h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-indigo-600"
                                  />
                                  <span className="text-xs font-medium w-10 text-center">
                                    {Math.round((compressed.individualQuality || quality) * 100)}%
                                  </span>
                                </div>
                              </div>
                            )}

                            <button
                              onClick={() => handleDownload(compressed, `compressed-${original.name.replace(/\.(jpeg|jpg|png|webp|gif)$/i, '')}.${compressed.type.split('/')[1] || 'jpeg'}`)}
                              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              {t('download')}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {compressedFiles.length > 1 && compressedFiles.some(f => f.compressed) && (
                  <div className="mt-8 flex justify-center">
                    <button
                      onClick={handleDownloadAll}
                      disabled={isProcessing}
                      className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-full shadow-md transition-all duration-300 flex items-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t('generating_zip')}
                        </>
                      ) : (
                        <>
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                          </svg>
                          {t('download_zip')}
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Ad Space */}
          {showAd && compressedFiles.length > 0 && (
            <div className="w-full my-12 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-indigo-100">
              <div className="google-ad">
                <ins className="adsbygoogle"
                  style={{ display: "block" }}
                  data-ad-client="ca-pub-40620600997"
                  data-ad-slot="6449429019"
                  data-ad-format="auto"
                  data-full-width-responsive="true"></ins>
              </div>
            </div>
          )}
        </section>

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

        {showAd && (
          <div className="w-full max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-md">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t('more_compression_tools')}
              </h3>
              <p className="text-gray-600 mb-4 mx-auto max-w-2xl">
                {t('tools_tip_content')}
              </p>
            </div>
            <div className="google-ad flex justify-center">
              <ins className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-40620600997"
                data-ad-slot="2103167504"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            </div>
          </div>
        )}
      </div>
    </>
  );
}