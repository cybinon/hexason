import { Text, Button, Center, CircularProgress, Heading, Input, Select, Stack, Box, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { SocketContext } from "../../src/context/socket";
import { useUser } from "../../src/context/UserContext"

export default function ChessGame() {
  const { wallet } = useUser();
  const toast = useToast();
  const [bet, setBet] = useState("10");
  const [isMatching, setIsMatching] = useState(false);
  const router = useRouter();
  const socket = useContext(SocketContext);

  const handleBet = (e: any) => {
    console.log(e.target.value)
    setBet(Math.ceil(+e.target.value).toString());
  }

  const handleMatch = () => {
    // if(wallet.balance < +bet) {
    //   return toast({
    //     title: "Not enough balance",
    //     description: "You don't have enough balance to place this bet",
    //     status: "error",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "top"
    //   })
    // }
    if(!socket) return;
    setIsMatching(true);
    socket.emit("match", { bet });
    socket.on("match:found", () => {
      router.push("/game/match");
    });
  }

  const handleCancel = () => {
    if(!socket) return;
    setIsMatching(false);
    socket.emit("cancel");
    socket.off("match:found");
  }

  return (
    <Stack mt={6} spacing={6}>
      <Center>
        <Heading>Earn Big, Play Smart</Heading>
      </Center>

      <Input readOnly value={"Your Balance: " + wallet.balance} />
      <Input readOnly value={"Address: " + wallet.address} />
      <Select value={bet} onChange={handleBet} >
        <option value={1}>1 $</option>
        <option value={5}>5 $</option>
        <option value={10}>10 $</option>
      </Select>

      <Input readOnly value={"Prize: " + +bet*2*0.9 + "$"} />
      <Input readOnly value={"Duration: 20 min"} />

      <Center>
        {isMatching ?
          <Stack justifyContent={"center"} position="relative">
            <CircularProgress position={"absolute"} left="25%" top={0} isIndeterminate color="green.300" />
            <Box h="45px"></Box>
            <Text>Finding a Game</Text>
            <Button onClick={handleCancel}>Cancel</Button>
          </Stack>
          :
          <Button onClick={handleMatch}>Play</Button>
        }
      </Center>

      <Center>
        <Text textAlign={"center"} color="gray">{'Chess is a classic and beloved strategy game that offers a unique combination of entertainment and intellectual challenge. By placing a bet and playing chess, you can experience the excitement of competition and potentially win money as a prize. Whether you are a seasoned player or just starting out, playing chess for money provides a thrilling opportunity to test your skills and see where you stand among other players. Join online gaming platforms or local tournaments to find like-minded competitors and enjoy the thrill of the game. So why not put your chess skills to the test and try playing for money today?'}</Text>
      </Center>
    </Stack>
  )
}