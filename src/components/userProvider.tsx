import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { User } from "./user";
import {
  Onboarding,
  defaultValues,
  schema,
} from "../onboarding/types/onboarding.types";
import { zodResolver } from "@hookform/resolvers/zod";

export const UsersProvider = () => {
  const methods = useForm<Onboarding>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <User />
    </FormProvider>
  );
};
