import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
  
      <div className="flex justify-center items-center flex-col text-white h-[44vh] px-5 md:px-0 text-xs md:text-base">
        <div className=" font-bold text-center text-3xl flex gap-4 py-2 "> Fuel Our Chai! <span><img src="/tea.gif" alt="" width={100} height={100} className="rounded-full" /></span></div>
        <p className="p-4 text-center md:text-left"> A crowdfunding platform for creaters. Get funded by your fans and followers</p>

        <div>
           <Link href={"/Profile"}>
          <button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Now!</button>
           
           </Link>

           <Link href={"/about"}>
           
          <button type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More!</button>
           
           </Link>


        </div>

      </div>
      <div className="bg-white h-1 opacity-15">

      </div>

      <div className="text-white container mx-auto py-10 px-10 md:py-32 " >
        <h1 className="text-3xl  font-bold text-center  my-2 mb-14 ">Your Fans can buy you a chai! </h1>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img className="rounded-full p-1 bg-slate-400 " src="/fund.gif" alt=""  width={88} height={88} />
            <p className="  font-bold text-center :">Fans want to help   </p>
            <p>your fans are available to support you</p>
          </div>

          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img className="rounded-full p-1 bg-slate-400 " src="/gif.gif" alt="" width={88} height={88} />
            <p className="  font-bold text-center :">Fans want to contribute</p>
            <p> your fans are available for you to help you</p>
            </div>  
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img className="rounded-full p-1 bg-slate-400 " src="/coll.gif" alt="" width={88} height={88}/>
            <p className="  font-bold text-center :"> Fans want to collaborate </p>
            <p> your fans are ready to collaborate with you </p>
          </div>
        </div>

      </div>


      <div className="bg-white h-1 opacity-15">

      </div>


      <div className="text-white container mx-auto py-32 flex pt-14  flex-col justify-center items-center " >
        <h2 className="text-3xl  font-bold text-center  my-2 mb-14">learn more about us  </h2>
       
         <iframe className='w-[90%] h-[40vh] md:h-[40vh] lg:w-[50%] lg:h-[40vh] xl:w-[50%] xl:h-[40vh]'src="https://www.youtube.com/embed/voF1plqqZJA?si=pRwlIxCcU3t_HoUi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> 

      </div>
    </>

  );
}
