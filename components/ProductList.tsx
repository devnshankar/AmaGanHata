import { FontAwesome5 } from '@expo/vector-icons';
import { useColorScheme, Image, StyleSheet } from 'react-native';
import { XStack, YGroup, ListItem, Text, Button, View } from 'tamagui';

export default function ProductList({
  productId,
  productTitle,
  productCategory,
  productInstock,
  productPublishStatus,
  productPrice,
  productImage,
  handleDeleteProduct,
}: any) {
  const colorScheme = useColorScheme();
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
              console.log(productTitle);
            }}
            elevation={15}
            $sm={{ backgroundColor: '$listItemBackgroundColor' }}
            pressStyle={{ backgroundColor: '$listItemPressColor' }}
            title={productTitle}
            subTitle={
              <View $sm={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                <Text color="gray">Category: {productCategory}</Text>
                <Text color="gray">In-Stock: {productInstock}</Text>
                <Text color="gray">
                  Status: {productPublishStatus ? 'published' : 'not published'}
                </Text>
              </View>
            }
            iconAfter={() => (
              <XStack flexDirection="column">
                <Text color="gray" $sm={{ fontSize: 14, marginTop: 4, marginBottom: 25 }}>
                  ${productPrice.toFixed(2)}
                </Text>
                <XStack $sm={{ flex: 1, flexDirection: 'row' }}>
                  <Button size="$3" marginRight={10} marginTop={5} backgroundColor="$green10Dark">
                    <Text color="$background">
                      <FontAwesome5
                        name="pen"
                        size={15}
                        color={colorScheme === 'dark' ? 'white' : 'white'}
                      />
                    </Text>
                  </Button>
                  <Button
                    onPress={() => handleDeleteProduct(productId)}
                    backgroundColor="$red8Dark"
                    marginTop={5}
                    size="$3"
                    icon={<FontAwesome5 solid size={19} color="white" name="trash-alt" />}
                  />
                </XStack>
              </XStack>
            )}
            icon={
              <Image
                borderRadius={5}
                source={productImage ? productImage : require('../assets/images/product1.jpg')}
                style={{ width: 90, height: 90 }}
              />
            }
            size="$4"
            padding={7}
            backgroundColor="$listItemBackground"
          />
        </YGroup.Item>
      </YGroup>
    </XStack>
  );
}
