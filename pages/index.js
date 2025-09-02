'use client';

import { useState, useEffect, useCallback, useMemo } from "react";
import Head from "next/head";
import Script from "next/script";
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';

// Dynamically import components to avoid SSR issues
const About = dynamic(() => import('./about'), { ssr: false });
const Compressor = dynamic(() => import('./compressor'), { ssr: false });

export default function HomePage() {
  const { t } = useTranslation();
  const [files, setFiles] = useState([]);
  const [compressedFiles, setCompressedFiles] = useState([]);
  const [quality, setQuality] = useState(0.5);
  const [manualMode, setManualMode] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [zipBlob, setZipBlob] = useState(null);

  const supportedImageTypes = useMemo(() => [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ], []);

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

  // Add a function to get a compressed image for display
  const getCompressedImageForDisplay = async (file, quality) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('quality', quality.toString());

      const response = await fetch('/api/compress', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Compression failed');
      }

      return await response.blob();
    } catch (error) {
      console.error("Error getting image for display:", error);
      return null;
    }
  };

  const compressImages = useCallback(
    async (inputFiles, currentQuality) => {
      setIsProcessing(true);
      
      try {
        // First, get compressed versions for display
        const displayPromises = inputFiles.map(file => 
          getCompressedImageForDisplay(file, currentQuality)
        );
        
        const displayBlobs = await Promise.all(displayPromises);
        
        // Create compressed files data with display blobs
        const compressedFilesData = inputFiles.map((file, index) => ({
          original: file,
          compressed: displayBlobs[index],
          id: file.name + file.lastModified,
          displayOnly: true // Flag to indicate this is for display only
        }));
        
        setCompressedFiles(compressedFilesData);
        
        // Then get the batch compression for download
        const formData = new FormData();
        formData.append('quality', currentQuality.toString());
        
        // Add all files to FormData
        inputFiles.forEach(file => {
          formData.append('images', file);
        });

        const response = await fetch('/api/compress-batch', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Batch compression failed');
        }

        // Get the zip file
        const zipBlob = await response.blob();

        // Store the zip blob for download
        setZipBlob(zipBlob);
      } catch (error) {
        console.error("Error compressing files:", error);
        // Handle error state
        setCompressedFiles(inputFiles.map(file => ({
          original: file,
          compressed: null,
          error: true,
          id: file.name + file.lastModified
        })));
      } finally {
        setIsProcessing(false);
      }
    },
    [] // No dependencies needed
  );

  const handleClearFiles = () => {
    setFiles([]);
    setCompressedFiles([]);
    setZipBlob(null);
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
    try {
      const compressedBlob = await getCompressedImageForDisplay(originalFile, newIndividualQuality);
      
      if (compressedBlob) {
        setCompressedFiles((prev) =>
          prev.map((item, i) =>
            i === idx ? {
              ...item,
              compressed: compressedBlob,
              individualQuality: newIndividualQuality
            } : item
          )
        );
      }
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
    if (!zipBlob) return;
    handleDownload(zipBlob, "autocompress-images.zip");
  };

  const handleDownloadSingle = async (idx) => {
    const file = compressedFiles[idx];
    if (!file.compressed) return;
    
    // For single download, we need to get a fresh compression
    try {
      const formData = new FormData();
      formData.append('image', file.original);
      formData.append('quality', (file.individualQuality || quality).toString());

      const response = await fetch('/api/compress', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Compression failed');
      }

      const compressedBlob = await response.blob();
      const extension = compressedBlob.type.split('/')[1] || 'jpg';
      handleDownload(compressedBlob, `compressed-${file.original.name.replace(/\.[^/.]+$/, "")}.${extension}`);
    } catch (error) {
      console.error("Error downloading single file:", error);
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

        {typeof window !== 'undefined' && (
          <>
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
              handleDownload={handleDownloadSingle}
              handleDownloadAll={handleDownloadAll}
              getCompressionSaving={getCompressionSaving}
            />

            <About t={t} />
          </>
        )}

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