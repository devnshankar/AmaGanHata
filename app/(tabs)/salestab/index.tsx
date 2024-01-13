import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useColorScheme, StyleSheet, Image, ActivityIndicator } from 'react-native';
import {
  View,
  Text,
  ListItem,
  Separator,
  YGroup,
  Tabs,
  SizableText,
  TabsContentProps,
  ScrollView,
  XStack,
  YStack,
} from 'tamagui';

const products = [
  {
    id: 1,
    image: require('../../../assets/images/product1.jpg'),
    productName: 'Product 1',
    totalPrice: 19.99,
    quantity: 2,
    Buyer: 'John Doe',
    paymentStatus: 'Paid',
  },
  {
    id: 2,
    image: require('../../../assets/images/product1.jpg'),
    productName: 'Product 2',
    totalPrice: 29.99,
    quantity: 1,
    Buyer: 'Jane Smith',
    paymentStatus: 'Pending',
  },
  {
    id: 3,
    image: require('../../../assets/images/product1.jpg'),
    productName: 'Product 3',
    totalPrice: 39.99,
    quantity: 3,
    Buyer: 'Bob Johnson',
    paymentStatus: 'Paid',
  },
  {
    id: 4,
    image: require('../../../assets/images/product1.jpg'),
    productName: 'Product 4',
    totalPrice: 39.99,
    quantity: 3,
    Buyer: 'Bob Johnson',
    paymentStatus: 'Paid',
  },
  {
    id: 5,
    image: require('../../../assets/images/product1.jpg'),
    productName: 'Product 5',
    totalPrice: 39.99,
    quantity: 3,
    Buyer: 'Bob Johnson',
    paymentStatus: 'Paid',
  },
  // Add more products as needed
];

const SalesTabScreen = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const handleMyProductsPress = () => {
    router.push('/(tabs)/salestab/myproducts/');
  };
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    // Set loading to true when starting to fetch data
    setLoading(true);

    // Your data fetching logic goes here

    // Set loading to false when data fetching is complete
    setLoading(false);
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <>
      {loading ? (
        <View style={{ ...styles.loadingContainer }}>
          <ActivityIndicator
            style={{ alignSelf: 'center', marginTop: '50%' }}
            size="large"
            color="green"
          />
        </View>
      ) : (
        <>
          <YStack $sm={{ flexDirection: 'column', flex: 1, padding: 10 }}>
            <View $sm={{ paddingBottom: 0 }}>
              <YGroup
                alignSelf="center"
                bordered
                width="100%"
                size="$5"
                elevation={10}
                borderColor={colorScheme === 'dark' ? '$green7Dark' : 'white'}
                separator={
                  <Separator borderColor={colorScheme === 'dark' ? '$green7Dark' : '$gray5Light'} />
                }>
                <YGroup.Item>
                  <ListItem
                    hoverTheme
                    backgroundColor="$listItemBackgroundColor"
                    pressStyle={{ backgroundColor: '$listItemPressColor' }}
                    title="My Products"
                    icon={<FontAwesome5 solid size={22} name="dice-d6" />}
                    scaleIcon={2}
                    size="$4.5"
                    iconAfter={<FontAwesome5 name="chevron-right" size={18} />}
                    onPress={handleMyProductsPress}
                  />
                </YGroup.Item>
              </YGroup>
            </View>

            <YStack elevation={12} $sm={{ paddingTop: 15 }}>
              <Text
                $sm={{ padding: 3, paddingTop: 0, fontSize: 16, fontWeight: 'bold' }}
                color="$color">
                Sale Orders
              </Text>
              <YGroup alignSelf="center" width="100%" size="$7" height="91.5%" elevation={5}>
                <YGroup.Item>
                  <HorizontalTabs />
                </YGroup.Item>
              </YGroup>
            </YStack>
          </YStack>
        </>
      )}
    </>
  );
};

export default SalesTabScreen;

const HorizontalTabs = () => {
  const colorScheme = useColorScheme();
  const [tab, setTab] = useState('tab1');

  return (
    <Tabs
      defaultValue="tab1"
      orientation="horizontal"
      flexDirection="column"
      width="100%"
      height="100%"
      borderRadius="$4"
      borderWidth={1}
      overflow="hidden"
      borderColor="$borderColor">
      <Tabs.List
        separator={<Separator vertical />}
        disablePassBorderRadius="bottom"
        aria-label="Manage your account">
        <Tabs.Tab
          // borderColor="$borderColorTab"
          flex={1}
          value="tab1"
          backgroundColor={tab === 'tab1' ? '$listItemPressColor' : '$listItemBackgroundColor'}
          onTouchStart={() => setTab('tab1')}
          pressStyle={{ backgroundColor: '$listItemPressColor' }}>
          <SizableText borderColor="$borderColorTab" fontFamily="$body">
            <FontAwesome5 solid size={15} name="clock" /> Pending
          </SizableText>
        </Tabs.Tab>
        <Tabs.Tab
          flex={1}
          value="tab2"
          backgroundColor={tab === 'tab2' ? '$listItemPressColor' : '$listItemBackgroundColor'}
          pressStyle={{ backgroundColor: '$listItemPressColor' }}
          onTouchStart={() => setTab('tab2')}>
          <SizableText fontFamily="$body">
            <FontAwesome5 solid size={15} name="check" /> Completed
          </SizableText>
        </Tabs.Tab>
      </Tabs.List>
      <Separator borderColor={colorScheme === 'dark' ? '$green7Dark' : '$gray5Light'} />
      <TabsContent padding={0} value="tab1">
        <ScrollView overScrollMode="never" $sm={{ flex: 1, flexDirection: 'column' }}>
          <YStack>
            {products.map((product) => (
              <ListItemDemo2
                key={product.id}
                productImage={product.image}
                productName={product.productName}
                productPrice={product.totalPrice}
                productQuantity={product.quantity}
                buyerName={product.Buyer}
                paymentStatus={product.paymentStatus}
              />
            ))}
          </YStack>
        </ScrollView>
      </TabsContent>

      <TabsContent padding={0} value="tab2">
        <ScrollView overScrollMode="never" $sm={{ flex: 1, flexDirection: 'column' }}>
          <YStack>
            {products.map((product) => (
              <ListItemDemo2
                key={product.id}
                productImage={product.image}
                productName={product.productName}
                productPrice={product.totalPrice}
                productQuantity={product.quantity}
                buyerName={product.Buyer}
                paymentStatus={product.paymentStatus}
              />
            ))}
          </YStack>
        </ScrollView>
      </TabsContent>
    </Tabs>
  );
};

const TabsContent = (props: TabsContentProps) => {
  return (
    <Tabs.Content
      backgroundColor="$background"
      key="tab3"
      padding="$2"
      alignItems="center"
      justifyContent="center"
      flex={1}
      borderColor="$background"
      borderRadius="$2"
      borderTopLeftRadius={0}
      borderTopRightRadius={0}
      borderWidth="$2"
      {...props}>
      {props.children}
    </Tabs.Content>
  );
};

function ListItemDemo2({
  productImage,
  productName,
  productPrice,
  productQuantity,
  buyerName,
  paymentStatus,
}: any) {
  return (
    <XStack $sm={{ marginBottom: 10 }}>
      <YGroup
        alignSelf="center"
        bordered
        width="100%"
        size="$5"
        borderRightWidth={1.4}
        borderColor="$tabItemBorderColor">
        <YGroup.Item>
          <ListItem
            borderWidth={0.5}
            onPress={() => {
              console.log(productName);
            }}
            elevation={6}
            $sm={{ backgroundColor: '$listItemBackgroundColor' }}
            pressStyle={{ backgroundColor: '$listItemPressColor' }}
            title={productName}
            subTitle={
              <View $sm={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                <Text color="gray">Quantity: {productQuantity}</Text>
                <Text color="gray">Buyer: {buyerName}</Text>
                <Text color="gray">Status: {paymentStatus}</Text>
              </View>
            }
            iconAfter={() => (
              <XStack>
                <Text color="gray" $sm={styles.productPrice}>
                  ${productPrice.toFixed(2)}
                </Text>
              </XStack>
            )}
            icon={
              <Image
                borderRadius={5}
                source={
                  productImage ? productImage : require('../../../assets/images/product1.jpg')
                }
                style={{ width: 100, height: 100 }}
              />
            }
            padding={7}
            size="$4"
            backgroundColor="$listItemBackground"
          />
        </YGroup.Item>
      </YGroup>
    </XStack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  orderCardImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
  },
  orderCardImage: {
    width: '100%',
    height: '100%',
  },
  orderCardContent: {
    marginLeft: 16,
    flex: 1,
  },
  orderCardProductName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderCardDetails: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  fabButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    borderRadius: 50,
    backgroundColor: 'green',
    padding: 16,
  },
  productPrice: {
    fontSize: 14,
    marginTop: 4,
  },
});
