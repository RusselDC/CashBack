import { fieldMap } from "./fields/index";
import { useForm as useFormGen } from "../../hooks/useFormGen";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import React from "react";
import { Grid2 } from "@mui/material";
import dayjs from "dayjs";

const DynamicForm = ({
  formRef,
  onSubmit,
}: {
  formRef: React.RefObject<HTMLFormElement | null>;
  onSubmit: (data: Record<string, unknown>) => void;
}) => {
  const { selectedForm, generateYupSchema, setFormErrors, formDatas } =
    useFormGen();
  const schema = useMemo(
    () => generateYupSchema(selectedForm?.fields),
    [generateYupSchema, selectedForm?.fields],
  );

  const defaultValues = selectedForm?.fields?.reduce(
    (accu: { [key: string]: string | Date | null }, field) => {
      const fieldValue = formDatas[field.id] ?? "";
      if (field.component === "date" && fieldValue)
        accu[field.id] = dayjs(fieldValue as string).isValid()
          ? dayjs(fieldValue as string).toDate()
          : null;
      if (field.component === "text") accu[field.id] = fieldValue as string;
      if(field.component === "dropdown") accu[field.id] = fieldValue as string;
      return accu;
    },
    {},
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (selectedForm?.fields) {
      reset(formDatas);
    }
  }, [formDatas, reset, selectedForm?.fields]);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const formattedErrors: { [key: string]: string } = Object.entries(
        errors,
      ).reduce((accu: { [key: string]: string }, [key, value]) => {
        accu[key] = value?.message as string;
        return accu;
      }, {});

      setFormErrors(formattedErrors);
    }
  }, [errors, setFormErrors]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      ref={formRef}
      style={{ height: "auto", width: "100%", padding: 0, margin: 0 }}
    >
      <Grid2 container spacing={2} sx={{ height: "100%", width: "100%" }}>
        {selectedForm?.fields?.map((field, index) => {
          const Component = fieldMap[field.component as keyof typeof fieldMap];

          return (
            <Grid2 size={field.width} key={index}>
              <Component
                key={index}
                control={control}
                errors={errors}
                {...register(field.id)}
                {...field}
              />
            </Grid2>
          );
        })}
      </Grid2>
    </form>
  );
};

export default React.memo(DynamicForm);
