import Head from "next/head";
import { GetServerSideProps } from "next";
import { stripe } from "../services/stripe";
import { SubscribeButton } from "../components/SubscribeButton";

import styles from './home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
   <>
    <Head>
      <title>Inicio | ig.news</title>
    </Head>

    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>👏 Hey, welcome</span>

        <h1>New about the <span>React</span> world.</h1>

        <p>
          Get access to all publications <br />
          <span>for {product.amount} month</span>
        </p>

        <SubscribeButton priceId={product.priceId}  />
      </section>

      <img src="/images/avatar.svg" alt="Girl coding" />
    </main>
   </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1MpjecAyR1Nqju3wBZjQ1qrk')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product,
    }
  }
}
