"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import {  Image, Product, } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"
 import ImageUpload from "@/components/ui/imageUpload"


const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
 
});

type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
  name:""
    images: Image[]
  | null;
 
 
};

 const ProductForm: React.FC<ProductFormProps> = ({
  
  
}) => {
  const params = useParams();
  const router = useRouter();

  

  
  const defaultValues =  {
   
    name: '',
    images: [],
   
  }

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
     
        await axios.post("/api/products", data);
    
      router.refresh();
      router.push("/");
 
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      
    }
  };

  

  return (
    <>
    
     
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload 
                    value={field.value.map((image) => image.url)} 
                     
                    onChange={(url) => field.onChange([...field.value, { url }])}
                    onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input  placeholder="Product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            
                
          <Button  type="submit">
           add
          </Button>
        </form>
      </Form>
    </>
  );
};
export default ProductForm