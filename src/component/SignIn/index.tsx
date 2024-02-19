/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { login, register } from "../../api/auth/index";
import classNames from "classnames";
import { toast } from "react-toastify";

export const AuthComponent = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Array<string>>([]);

  const additionalFields = useMemo(() => {
    if (isNewUser) return ["new user"];
    return [];
  }, [isNewUser]);

  const title = isNewUser ? "Register your account" : "Sign in to your account";

  const buttonTitle = isNewUser ? "Sign up" : "Sign in";
  const footerTitle = isNewUser
    ? "Already have an account?"
    : "Dont't have an account yet?";

  const footerButtonTitle = isNewUser ? "Sign in" : "Sign up";

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          {title}
        </h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const target = e.target as HTMLFormElement;
            const username = (target.username as HTMLInputElement).value;
            const password = (target.password as HTMLInputElement).value;
            if (!username || !password) return;

            const email = isNewUser
              ? (target.email as HTMLInputElement).value
              : null;
            try {
              console.log("hello");
              if (!email) {
                const res = await login<{ access: string; refresh: string }>({
                  username,
                  password,
                });
                localStorage.setItem("token", JSON.stringify(res.access));
                localStorage.setItem("refresh", JSON.stringify(res.refresh));
                navigate("/editor");
              } else {
                await register({
                  username,
                  password,
                  email,
                });
                (target.username as HTMLInputElement).value = "";
                (target.password as HTMLInputElement).value = "";
                (target.email as HTMLInputElement).value = "";
                toast.success("User Created Successfully, Please login");
                setIsNewUser(false);
              }
            } catch (err: any) {
              if (
                err?.response?.data &&
                typeof err?.response?.data === "object"
              )
                setErrors(Object.keys(err.response.data));
              Object.keys(err.response.data).forEach((value) => {
                toast.error(err.response.data[value][0]);
              });
            }
          }}
          className="space-y-4 md:space-y-6"
          action="#"
        >
          {additionalFields.map(() => {
            return (
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  name="email"
                  id="email"
                  placeholder="vinayak@gmail.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <span
                  className={classNames(
                    "pt-1 text-xs font-semibold text-gray-100 transition-all duration-200 ease-in-out",
                    errors.includes("email")
                      ? "opacity-100 block "
                      : "opacity-0 hidden"
                  )}
                >
                  Email Error
                </span>
              </div>
            );
          })}
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your username
            </label>
            <input
              type="username"
              name="username"
              id="username"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="vinayak490"
            />
            <span
              className={classNames(
                "pt-1 text-xs font-semibold text-gray-100 transition-all duration-200 ease-in-out",
                errors.includes("username")
                  ? "opacity-100 block "
                  : "opacity-0 hidden"
              )}
            >
              Username Error
            </span>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <span
              className={classNames(
                "pt-1 text-xs font-semibold text-gray-100 transition-all duration-200 ease-in-out",
                errors.includes("password")
                  ? "opacity-100 block "
                  : "opacity-0 hidden"
              )}
            >
              Password Error
            </span>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            {buttonTitle}
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400 transition-all">
            {footerTitle}
            <button
              type="button"
              onClick={() => {
                setIsNewUser((prev) => !prev);
              }}
              className="font-medium text-primary-600 hover:underline dark:text-primary-500 px-1"
            >
              {footerButtonTitle}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthComponent;
