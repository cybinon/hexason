import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Root({ children, ...props }: any) {
  return (
    <>
      <Head>
        <title>MyApp</title>
        <meta name="description" content="Дэско" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Navbar />
        <Container p={0} minH="80vh" maxW="container.lg" {...props}>
          {children}
        </Container>
        <Footer />
      </Box>
    </>
  )
}