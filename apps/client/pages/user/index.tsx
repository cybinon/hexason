import { useModal } from "@/src/context/ModalContext";
import { useAxios } from "@/src/utils/axiosHook";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Divider, Flex, Heading, HStack, Stack, Tag, Text, Image, Grid, Button } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "../../src/context/UserContext";

export default function User() {
  const { user, loading } = useUser();
  const [orders, setOrders] = useState([]);
  const router = useRouter();
  const { fetch } = useAxios("/user/orders", { page: 1, limit: 10 }, "get");

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/");

    fetch().then((res) => {
      setOrders(res);

      console.log(res);
    });
  }, [user]);
  if (loading) return <Box>Loading...</Box>

  return (
    <Box p={6}>
      <Stack spacing={4}>
        <Heading>Таны захиалга</Heading>
        <Divider />
        <Box>
          <Accordion allowToggle defaultIndex={[0]}>
            {orders.map((order: any) => <Order key={order.id} order={order} />)}
          </Accordion>
        </Box>
      </Stack>
    </Box>
  )
}

const Order = ({ order }: any) => {
  const { onOpen, setChild } = useModal()

  const handleOpen = () => {
    setChild(<Payment order={order} />)
    onOpen()
  }
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Flex w="100%" justifyContent={"space-between"}>
            <HStack>
              <Text display={["none", "block"]}>Захиалгын дугаар: </Text>
              <Text fontWeight={"bold"}>{order.shortId}</Text>
            </HStack>
            <Tag colorScheme={"orange"}>{order.status}</Tag>
          </Flex>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Stack spacing={5}>
          <Button w="100%" colorScheme={"blue"} onClick={handleOpen}>Төлөх {`(${order.totalPrice}₮)`}</Button>
          {order.items.map((item: any) => <OrderItem key={item.id} item={item} />)}
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  )
}

const OrderItem = ({ item }: any) => {
  return (
    <Grid borderBottom={"1px solid gray"} templateColumns={["repeat(1,1fr)", "repeat(3,1fr)"]} gap="5">
      <Image w="100%" src={item.product.image} />
      <Stack>
        <Box>Үнэ: {item.totalPrice}</Box>
        <Box>Тоо ширхэг: {item.quantity}</Box>
        <Box>Төлөв: {item.status}</Box>
        {/* <Button colorScheme={"red"} onClick={() => { }}><FaTrash /> ХАСАХ</Button> */}
      </Stack>
      <Box>
        <Text>{item.description}</Text>
      </Box>
    </Grid>
  )
}

const Payment = ({ order }: any) => {
  const [bank, setBank] = useState({
    "bank.name": "",
    "bank.account": "",
    "bank.reciver": ""
  });
  useEffect(() => {
    axios({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      url: "/info/bank",
      method: "get"
    }).then((response) => {
      setBank(response.data)
    }).catch(console.log)
  }, [])
  return (
    <Stack spacing={3}>
      <Heading>Төлбөр төлөх</Heading>
      <Divider />
      <Box>
        <Text>Захиалгын дугаар: {order.shortId}</Text>
        <Text>Төлөх дүн: {order.totalPrice}</Text>
      </Box>
      <Divider />
      <Box>
        <Text>Банк: {bank["bank.name"]}</Text>
        <Text>Дансны дугаар: {bank["bank.account"]}</Text>
        <Text>Хүлээн авагч: {bank["bank.reciver"]}</Text>
      </Box>
    </Stack>
  )
}