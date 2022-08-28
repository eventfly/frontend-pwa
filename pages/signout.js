import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";

function SignOut()
{
    const toast = useToast();
    const router = useRouter();
    const [printed, setPrinted] = useState(false);

    useEffect(() => {

        if (!router.isReady) {
            return;
        }

        if (!printed)
        {
            localStorage.clear();
            toast({
                title: "Signed Out!",
                description: "You have successfully signed out!",
                status: "info",
                timeout: 2000,
                isClosable: true
            });
            setPrinted(true);
            router.push("/login");
        }

    });

    return (
        <></>
    );
}

export default SignOut;