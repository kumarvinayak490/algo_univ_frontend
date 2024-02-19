import { ToastContainer } from "react-toastify";
import AuthComponent from "../component/SignIn";
import Container from "../component/common/Container";
import Layout from "./layout";

const IndexPage = () => {
  return (
    <Layout>
      <ToastContainer />
      <Container className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-8 h-8 mr-2" src="/vite.svg" alt="logo" />
          Vinayak IDE
        </a>
        <AuthComponent />
      </Container>
    </Layout>
  );
};

export default IndexPage;
