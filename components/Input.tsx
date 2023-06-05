"use client";
import { playlistIdType } from "@/app/api/playlistItems/route";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  playlistId: playlistIdType;
  channelName: string;
};

export function PlaylistIDs() {
  // const [ytChannels, setData] = useState<string[]>();

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
    });
  // .then(async (returnData) => setData(await returnData.json()));

  return (
    <div className='flex flex-col bg-slate-800 p-4 rounded-lg justify-between'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-row gap-4'>
        <input
          defaultValue='Add playlist URl'
          {...register("playlistId", {
            minLength: 34,
            maxLength: 34,
            required: true,
          })}
          className='bg-slate-200 rounded-md p-2'
        />
        {errors.playlistId && (
          <span className='bg-red-500'>The playlistId is required</span>
        )}
        <input
          defaultValue='Add Channel Name '
          {...register("channelName", { required: true })}
          className='bg-slate-200 rounded-md p-2'
        />
        {errors.channelName && <span className='bg-red-500'>required</span>}

        <input type='submit' className='bg-slate-300 p-2 rounded-md' />
      </form>
      <div className='flex flex-col'>
        {/* {ytChannels &&
          ytChannels.map((channel) => {
            return <div className='bg-red-800 p-2'>{channel}</div>;
          })} */}
      </div>
    </div>
  );
}
