import { fieldMap } from "./fields/index";
import { useForm as useFormGen } from "../../hooks/useFormGen";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useMemo } from "react";
import React from "react";

const DynamicForm = ({ formRef, onSubmit }: { formRef: React.RefObject<HTMLFormElement | null>, onSubmit : (data:Record<string,unknown>) => void}) => {
  const { selectedForm, generateYupSchema, setFormErrors } = useFormGen();

  const schema = useMemo(() => generateYupSchema(selectedForm?.fields), [generateYupSchema, selectedForm?.fields]);

  const defaultValues = selectedForm?.fields?.reduce((accu: {[key:string] : string}, field) => {
    accu[field.id] = ""
    return accu
  },{}) 

  const { register, handleSubmit, formState: { errors }, control } = useForm({ 
    resolver: yupResolver(schema),
    defaultValues : defaultValues
  });

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const formattedErrors: { [key: string]: string } = Object.entries(errors).reduce((accu: { [key: string]: string }, [key, value]) => {
        accu[key] = value?.message as string;
        return accu;
      }, {});

      setFormErrors(formattedErrors);
    }
  }, [errors, setFormErrors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={formRef} style={{ height: 'auto', width: '100%', padding: 0, margin: 0}} >
      {selectedForm?.fields?.map((field, index) => {
        const Component = fieldMap[field.component as keyof typeof fieldMap];

        return <Component key={index} control={control} errors={errors} {...register(field.id)} {...field} />;
      })}
      
    </form>
  );
};

export default React.memo(DynamicForm); 
