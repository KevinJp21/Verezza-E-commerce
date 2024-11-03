import OurBrandPage from '../pages/OurBrand/OurBrandPage';
import Layout from '~/layouts/layout';
import { MetaFunction } from '@remix-run/node';
import { useTranslation } from 'react-i18next';

export const meta: MetaFunction = ({ data }) => {
    const { t } = useTranslation();
    return [
        { title: t('ourBrand.seo.title') + ' | Olga Lucia Cortes' },
        { name: 'description', content: t('ourBrand.seo.description') }
    ];
};

export default function OurBrand() {
    return (
        <Layout>
            <OurBrandPage />
        </Layout>
    );
}

