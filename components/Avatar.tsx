 "use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface AvatarProps {
    image?:string
 
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({  isLarge, hasBorder }) => {
  const router = useRouter();
  const {data:session}=useSession()

  

  const onClick = useCallback((event: any) => {
    event.stopPropagation();

    const url = `/profile/${session?.user?.name}`;

    router.push(url);
  }, [router, session]);

  return (
    <div
      className={`
        ${hasBorder ? 'border-4 border-black' : ''}
        ${isLarge ? 'h-32' : 'h-12'}
        ${isLarge ? 'w-32' : 'w-12'}
        rounded-full 
        hover:opacity-90 
        transition 
        cursor-pointer
        relative
      `}
    >
    
    </div>
  );
}
 
export default Avatar;