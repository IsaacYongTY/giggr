import Head from 'next/head'
import withAuth from "../middlewares/withAuth"

export const getServerSideProps = withAuth(({req, res} : any) => {
  if(req.user) {
    return {
      redirect: {
        permanent: false,
        destination: "dashboard"
      }
    }
  }
})

export default function Home() {


  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
