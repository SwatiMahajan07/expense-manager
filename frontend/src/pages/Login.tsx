import { Field, Form, Formik } from "formik";
import logo from "../assets/logo.png";
import google from "../assets/google.png";
import apple from "../assets/apple.png";
import { Link } from "react-router";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = () => {};

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center md:w-1/2 md:border md:rounded-[30px] md:border-[#F5F6F7] md:p-4 sm:shadow-none md:shadow-xl gap-4">
        <img src={logo} alt="Expense Manager Logo" className="w-20 h-20" />
        <h3 className="text-2xl font-bold">Money Manager</h3>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="flex flex-col gap-4 w-full">
            <Field
              name="email"
              type="email"
              placeholder="Email"
              className="w-full border rounded-[14px] border-[#DCDFE3] bg-[#F5F6F7] p-2"
            />
            <Field
              name="password"
              type="password"
              placeholder="Password"
              className="w-full border rounded-[14px] border-[#DCDFE3] bg-[#F5F6F7] p-2"
            />
            <button
              className="w-full bg-linear-to-tr from-[#0E33F3] to-[#2FDAFF] p-2 rounded-[14px] text-white uppercase cursor-pointer"
              type="submit"
            >
              Login
            </button>
          </Form>
        </Formik>
        <button className="text-sm text-gray-600 cursor-pointer">
          Forgot Password?
        </button>
        <p className="text-sm text-gray-800">Or</p>
        <button className="w-full bg-white border rounded-[14px] border-[#DCDFE3] p-2 flex items-center justify-center gap-2 cursor-pointer">
          <img src={google} alt="Google" className="w-4 h-4" />
          Continue with Google
        </button>
        <button className="w-full bg-white border rounded-[14px] border-[#DCDFE3] p-2 flex items-center justify-center gap-2 cursor-pointer">
          <img src={apple} alt="Apple" className="w-4 h-4" />
          Continue with Apple
        </button>
        <p>
          Don't have an account?{" "}
          <Link className="text-[#0E33F3] cursor-pointer" to="/register">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
