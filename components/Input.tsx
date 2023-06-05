"use client";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export function PlaylistIDs() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) =>
    await fetch("http://localhost:3000/api/addChannel", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue='Add playlist URLS ' {...register("example")} />

        {/* include validation with required or other standard HTML validation rules */}
        {/* <input {...register("exampleRequired", { required: true })} /> */}
        {/* errors will return when field validation fails  */}
        {/* {errors.exampleRequired && <span>This field is required</span>} */}

        <input type='submit' />
      </form>
    </div>
  );
}

export function PlaylistURLs() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue='Add playlist URLS ' {...register("example")} />

        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("exampleRequired", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <input type='submit' />
      </form>
    </div>
  );
}
