import Head from 'next/head'
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Layout from '@components/Layout';
import Header from '@components/Header';
import Image from 'next/image';
import Container from '@components/Container';
import Button from '@components/Button';

import styles from '@styles/Product.module.scss'

export default function Product({product}) {
  return (
    <Layout>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={`Shop ${product.name}`} />
      </Head>

      <Container>
        <div className={styles.productWrapper}>
          <div className={styles.productImage}>
            <Image
              width={product.image.width}
              height={product.image.height}
              src={product.image.url}
              alt={product.name}
            />
          </div>
          <div className={styles.productContent}>
            <h1>{product.name}</h1>
            <div className={styles.productDescription} dangerouslySetInnerHTML={{__html: product.description.html}}/>
           
            <p className={styles.productPrice}>
              {product.price} NOK
            </p>
            <p className={styles.productBuy}>
              <Button>
                Add to Cart
              </Button>
            </p>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: "https://api-eu-central-1.graphcms.com/v2/cl1xsctlu0if501xtectabt2f/master",
    cache: new InMemoryCache(),
  });
  const data = await client.query({
    query: gql`
      query PageProducts {
        products {
          id
          name
          price
          slug
          image 
        }
      }
    `,
  });
  const paths = data.data.products.map(product => ({
    params: {
      slug: product.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const client = new ApolloClient({
    uri: "https://api-eu-central-1.graphcms.com/v2/cl1xsctlu0if501xtectabt2f/master",
    cache: new InMemoryCache(),
  });
  const data = await client.query({
    query: gql`
      query PageProduct($slug: String) {
        product(where: { slug: $slug }) {
          id
          name
          price
          slug
          image
          description {
            html
          }
        }
      }
    `,
    variables: {
      slug: params.slug
    }
  });
  const product = data.data.product;
  return {
    props: {
      product,
    },
  }
}
