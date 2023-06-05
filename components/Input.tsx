"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

export function PlaylistIDs() {
  const [data, setData] = useState<string[]>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) =>
    await fetch("http://localhost:3000/api/playlistItems", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(async (returnData) => setData(await returnData.json()));

  return (
    <div className='flex flex-col bg-slate-800 p-4 rounded-lg'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input defaultValue='Add playlist URLS ' {...register("example")} />
        {errors.exampleRequired && <span>This field is required</span>}
        <input type='submit' />
      </form>
      {data && data}
    </div>
  );
}

export function PlaylistURLs() {
  const [data, setData] = useState<string[]>();
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
    <div className='flex flex-col bg-slate-800 p-4 rounded-lg'>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue='Add playlist URLS ' {...register("example")} />

        {/* include validation with required or other standard HTML validation rules */}
        <input {...register("exampleRequired", { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <input type='submit' />
      </form>
      {data && data}
    </div>
  );
}
