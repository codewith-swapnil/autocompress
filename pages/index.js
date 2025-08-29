'use client';

import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Script from "next/script";
import imageCompression from "browser-image-compression";
import JSZip from "jszip";
import { useTranslation } from 'react-i18next';
import About from './about';
import Compressor from './compressor';

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

        <Compressor
          t={t}
          files={files}
          setFiles={setFiles}
          compressedFiles={compressedFiles}
          quality={quality}
          setQuality={setQuality}
          manualMode={manualMode}
          setManualMode={setManualMode}
          isProcessing={isProcessing}
          showAd={showAd}
          handleClearFiles={handleClearFiles}
          handleDrop={handleDrop}
          handleFileChange={handleFileChange}
          handleQualityChange={handleQualityChange}
          handleIndividualQualityChange={handleIndividualQualityChange}
          handleDownload={handleDownload}
          handleDownloadAll={handleDownloadAll}
          getCompressionSaving={getCompressionSaving}
        />

        <About t={t} />

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