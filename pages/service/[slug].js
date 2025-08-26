import { useRouter } from 'next/router';
import Head from 'next/head';
import ServiceDetailPage from '../../components/service/ServiceDetailPage';
import { services } from '../../data/services';
import Layout from '../MainLayout';

const ServicePage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const currentService = slug;

  const getPageTitle = () => {
    return `${services[currentService]?.title || 'Service'} | FixKaro`;
  };

  if (!services[currentService]) {
    // Handle case where service is not found
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center p-4 text-center">
          Service not found.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>{getPageTitle()}</title>
        <meta name="description" content={`Details for ${services[currentService]?.title || 'the service'}`} />
      </Head>
      <ServiceDetailPage 
        currentService={currentService} 
        services={services} 
      />
    </Layout>
  );
};

export default ServicePage;