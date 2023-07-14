import { NextResponse } from 'next/server';
 

import prismadb from '@/lib/prismaDb';
import { url } from 'inspector';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    

    const body = await req.json();

    const { name, images} = body;

    

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }


  
   

     

    const product = await prismadb.product.create({
      data: {
        name,
        
        images: {
          createMany: {
            data: [
              ...images.map((image: { url: string }) => image),
            ],
          },
        },
      },
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
export async function GET(req:Request){ 
    try {
        
        const product=await prismadb.product.findMany({include:{ images: true }  })
        return new NextResponse(JSON.stringify(product),{ status: 200 })
    } catch (error) {
        
    }
 }

