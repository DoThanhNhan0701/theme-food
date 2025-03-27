"use client";

import { useTheme } from "next-themes";
import { Dictionary } from "@/helpers/types";
import { useLocaleRouter } from "@/navigation";

import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import Select, { OptionType } from "@/components/common/Select";
type DictKeys = "products";

type FormState = {
  email: string;
  password: string;
  errors: boolean;
};

export default function Login({ dict }: { dict: Dictionary<DictKeys> }) {
  const { theme, setTheme } = useTheme();
  const { pushWithLocale } = useLocaleRouter();

  const [state, setState] = useState<FormState>({
    email: "",
    password: "",
    errors: false,
  });

  const { email, errors, password } = state;

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = !state.email || !state.password;
    setState((prevState) => ({
      ...prevState,
      errors,
    }));

    if (!errors)
      alert(
        JSON.stringify(
          { email: state.email, password: state.password },
          null,
          4
        )
      );
  };

  const [options] = useState([
    {
      label: "Option 1",
      value: "opt1",
    },
    {
      label: "Option 2",
      value: "opt2",
    },
    {
      label: "Option 3",
      value: "opt3",
    },
    {
      label: "Option 4",
      value: "opt4",
    },
    {
      label: "Option 5",
      value: "opt5",
    },
    {
      label: "Option 6",
      value: "opt6",
    },
    {
      label: "NHAN",
      value: "nhan",
    },
  ]);

  const handleChangeSelect = (e: OptionType) => {
    console.log(e);
  };

  return (
    <div className="flex flex-col items-start gap-2 p-6">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="cursor-pointer p-2 rounded bg-gray-200 dark:bg-gray-800 dark:text-white"
      >
        {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
      <LanguageSwitcher />
      <button onClick={() => pushWithLocale("/food")}>
        {dict.products.cart}
      </button>
      <span onClick={() => pushWithLocale("/")}>Redirect</span>

      <div className="mt-3 flex gap-2 items-center">
        <p>THIS IS CUSTOM BUTTON</p>
        <Button success rounded>
          Click by
        </Button>

        <Button primary rounded>
          Click by
        </Button>

        <Button secondary rounded>
          Click by
        </Button>

        <Button warning rounded outline>
          Click by
        </Button>

        <Button danger rounded>
          Click by
        </Button>

        <Button outline rounded>
          Click by 123
        </Button>
      </div>

      <div className="mt-3 flex gap-2 flex-col items-start w-full">
        <p>THIS IS CUSTOM INPUT</p>
        <form
          className="flex flex-col gap-4 max-w-[300px] w-full"
          onSubmit={handleSubmit}
        >
          <Input
            required
            icon="email"
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={email}
            errors={errors}
            onChange={handleChange}
          />
          <Input
            required
            icon="password"
            type="password"
            name="password"
            placeholder="Enter your password..."
            value={password}
            errors={errors}
            onChange={handleChange}
          />

          <Select
            options={options}
            placeHolder="Please select..."
            onChange={(e) => handleChangeSelect(e as OptionType)}
          />

          <Button type="submit" success>
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
}
