import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

function SignOut()
{
    const toast = useToast();
    const router = useRouter();

    useEffect(() => {
        localStorage.clear();
        
        toast({
            title: "Signed Out!",
            description: "You have successfully signed out!",
            status: "info",
            timeout: 500,
            isClosable: true
        });

        router.push("/login");
    }, []);
}

export default SignOut;