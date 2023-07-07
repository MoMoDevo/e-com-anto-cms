import prismadb from "@/lib/prismaDb"
interface DashboardPageProps {
    params: {
      storeId: string;
    };
  };

const Dashboard =async ({params}:DashboardPageProps) => {
     const store=await prismadb.store.findFirst({
        where:{
           id:params.storeId
        }
    })

  return (
    <div>
       {store?.name}
      
    </div>
  )
}

export default Dashboard
