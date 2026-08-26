import { GetServerSideProps } from "next"

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.statusCode = 301
  res.setHeader("Location", "/feed.xml")
  res.end()

  return { props: {} }
}

const FeedRedirect = () => null

export default FeedRedirect
