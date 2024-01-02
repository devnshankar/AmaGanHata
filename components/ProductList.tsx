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
        width="100%"
        size="$5"
        borderWidth={0.7}
        borderTopWidth={1.1}
        borderRightWidth={1.2}
        borderColor={colorScheme === 'dark' ? '#3a3a3a' : 'transparent'}>
        <YGroup.Item>
          <ListItem
            onPress={() => {
              console.log(productTitle);
            }}
            $sm={{ backgroundColor: '$listItemBackgroundColor' , elevation:15, }}
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
                source={{ uri: productImage }}
                style={{ width: 90, height: 90 }}
              />
            }
            size="$4"
            padding={6}
            backgroundColor="$listItemBackground"
          />
        </YGroup.Item>
      </YGroup>
    </XStack>
  );
}
