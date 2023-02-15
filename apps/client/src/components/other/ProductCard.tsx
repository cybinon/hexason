import { useUser } from "@/src/context/UserContext";
import { Product } from "@/src/interface/product";
import { useCurrencyFormat } from "@/src/utils/CurrencyFormat";
import { Box, Button, ChakraProps, Heading, HStack, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, Text, Tooltip, useColorModeValue } from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";

export type ProductCardType = {
  data: Product,
  feature?: "stake" | "basket",
  onFeatureClick?: (data: Product) => void,
  onBasketAddClick?: (data: Product) => void,
} & ChakraProps
export default function ProductCard({ 
  data, 
  feature,
  onBasketAddClick,
  onFeatureClick,
   ...props
 }: ProductCardType) {
  const format = useCurrencyFormat();
  const { actions } = useUser()

  return (
    <Box w="100%" py={12} className="fade-in">
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
        cursor="pointer"
        {...props}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${data.image})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={data.image}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            {data.brand}
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {data.title}
          </Heading>
          <Stack direction={'column'} align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
              {format(data.price)}
            </Text>
            <Text textDecoration={'line-through'} color={'gray.600'}>
              {format(data.oldPrice || 0)}
            </Text>
            <Button onClick={() => { onFeatureClick ? onFeatureClick(data) : null }} colorScheme="orange">
              ХАДГАЛААД АВАХ 🤩
            </Button>
            <Tooltip label="Тусгай бүтээгдэхүүн учир шууд авах боломжгүй байна">
              <Button isDisabled={feature ? true : false} onClick={() => { onBasketAddClick ? onBasketAddClick(data) : actions?.addToBasket(data) }} colorScheme="primary">
                <FaShoppingCart /> <Text ml="2">Шууд авах</Text>
              </Button>
            </Tooltip>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}

export const BasketProductCard = ({ data, quantity, ...props }: { data: Product, quantity: number } & ChakraProps) => {
  const format = useCurrencyFormat();
  const { actions } = useUser();

  return (
    <Box w="100%" py={12}>
      <HStack
        role={'group'}
        p={6}
        justifyContent="space-between"
        // maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
        cursor="pointer"
        {...props}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'100px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${data.image})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={"100px"}
            width={"100px"}
            objectFit={'cover'}
            src={data.image}
          />
        </Box>
        <Stack align={'center'}>
          <Heading fontSize={'md'} fontFamily={'body'} fontWeight={500}>
            {data.title}
          </Heading>
          <NumberInput
            value={quantity}
            max={data.quantity}
            min={1}
            onChange={(value) => actions?.addToBasket(data, +value)}
            // keepWithinRange={false}
            clampValueOnBlur={false}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Stack direction={'column'} align={'center'}>
            <Text fontWeight={800} fontSize={'md'}>
              {format(data.price * quantity)}
            </Text>
          </Stack>
          <Button w="100%" onClick={() => { actions?.removeFromBasket(data) }} colorScheme="primary">
            Хасах
          </Button>
        </Stack>
      </HStack>
    </Box>
  )
}