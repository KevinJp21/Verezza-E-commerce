import './ReturnsRefunds.css';
import { useTranslation } from 'react-i18next';

export default function ReturnsRefundsPage() {
  const { t } = useTranslation();
  return (
    <section className='ReturnsRefundsContainer'>
      <div className='SalesPoliciesContainer container'>
        <h2>{t('returnsRefunds.salesPolicies.title')}</h2>
        <ul className='list-style-disc'>
          <li dangerouslySetInnerHTML={{ __html: t('returnsRefunds.salesPolicies.li1P1') }} />
          <li dangerouslySetInnerHTML={{ __html: t('returnsRefunds.salesPolicies.li1P2') }} />
        </ul>
      </div>
      <div className='PurchasePoliciesContainer container'>
        <h2>{t('returnsRefunds.purchasePolicies.title')}</h2>
        <ul className='list-style-disc'>
          <li dangerouslySetInnerHTML={{ __html: t('returnsRefunds.purchasePolicies.li1P1') }} />
          <li dangerouslySetInnerHTML={{ __html: t('returnsRefunds.purchasePolicies.li1P2') }} />
          <li dangerouslySetInnerHTML={{ __html: t('returnsRefunds.purchasePolicies.li1P3') }} />
        </ul>
      </div>
      <div className='OrderCancellationPoliciesContainer container'>
        <h2>{t('returnsRefunds.orderCancellationPolicies.title')}</h2>
        <ul className='list-style-disc'>
          <li dangerouslySetInnerHTML={{ __html: t('returnsRefunds.orderCancellationPolicies.li1P1') }} />
        </ul>
      </div>
      <div className='ReturnPoliciesContainer container'>
        <h2>{t('returnsRefunds.returnPolicies.title')}</h2>
        <ul className='list-style-disc'>
          <li dangerouslySetInnerHTML={{ __html: t('returnsRefunds.returnPolicies.li1P1') }} />
          <li dangerouslySetInnerHTML={{ __html: t('returnsRefunds.returnPolicies.li1P2') }} />
          <li dangerouslySetInnerHTML={{ __html: t('returnsRefunds.returnPolicies.li1P3') }} />
          <li dangerouslySetInnerHTML={{ __html: t('returnsRefunds.returnPolicies.li1P4') }} />
        </ul>
        <p dangerouslySetInnerHTML={{ __html: t('returnsRefunds.returnPolicies.p1') }} />
      </div>
      <div className='ShippingPoliciesContainer container'>
        <h2>{t('returnsRefunds.shippingPolicies.title')}</h2>
        <ul className='list-style-disc'>
          <li dangerouslySetInnerHTML={{ __html: t('returnsRefunds.shippingPolicies.li1P1') }} />
          <li dangerouslySetInnerHTML={{ __html: t('returnsRefunds.shippingPolicies.li1P2') }} />
          <li dangerouslySetInnerHTML={{ __html: t('returnsRefunds.shippingPolicies.li1P3') }} />
          <li dangerouslySetInnerHTML={{ __html: t('returnsRefunds.shippingPolicies.li1P4') }} />
        </ul>
      </div>
    </section>
  );
}
