const Page = async () => {
  await fetch("http://localhost:2221/api/test/");
  return <div className='bg-lime-800 w-screen h-screen'>Page</div>;
};
export default Page;
