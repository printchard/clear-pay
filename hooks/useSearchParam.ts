import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export function useSearchParam(key: string, delay = 500) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [state, setState] = useState(searchParams.get(key) || "");
  const [newState] = useDebounce(state, delay);

  useEffect(() => {
    const newSParams = new URLSearchParams(searchParams.toString());
    if (newState === "") {
      newSParams.delete(key);
    } else {
      newSParams.set(key, newState);
    }
    router.push(`${pathname}?${newSParams.toString()}`);
  }, [newState]);

  return [state, setState] as const;
}
