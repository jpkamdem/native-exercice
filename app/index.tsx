import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import boxesJson from "../assets/boxes.json";
import { FlatList, Pressable, ScrollView } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type Aliment = {
  nom: string;
  quantite: number;
};

type Box = {
  id: number;
  nom: string;
  pieces: number;
  prix: number;
  image: string;
  aliments: Aliment[];
  saveurs: string[];
};

export default function Index() {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [toggle, setToggle] = useState(false);

  const images = {
    "amateur-mix": require("../assets/images/sushi/amateur-mix.jpg"),
    "california-dream": require("../assets/images/sushi/california-dream.jpg"),
    "fresh-mix": require("../assets/images/sushi/fresh-mix.jpg"),
    "gourmet-mix": require("../assets/images/sushi/gourmet-mix.jpg"),
    "master-mix": require("../assets/images/sushi/master-mix.jpg"),
    "no-image": require("../assets/images/sushi/no-image.jpg"),
    "salmon-classic": require("../assets/images/sushi/salmon-classic.jpg"),
    "salmon-lovers": require("../assets/images/sushi/salmon-lovers.jpg"),
    "salmon-original": require("../assets/images/sushi/salmon-original.jpg"),
    "sando-box-chicken-katsu": require("../assets/images/sushi/amateur-mix.jpg"),
    "sando-box-salmon-aburi": require("../assets/images/sushi/sando-box-salmon-aburi.jpg"),
    sunrise: require("../assets/images/sushi/sunrise.jpg"),
    "super-salmon": require("../assets/images/sushi/super-salmon.jpg"),
    "tasty-blend": require("../assets/images/sushi/tasty-blend.jpg"),
  };

  function filteredBoxes() {
    const arr: Box[] = [];

    boxes.map((box) => {
      box.aliments.map((aliment) => {
        if (aliment.nom.includes("Spring Saumon Avocat")) {
          arr.push(box);
        }
      });
    });

    return arr;
  }

  useEffect(() => {
    setBoxes(boxesJson);
  }, []);

  function lessThanThirteen() {
    const arr: Box[] = [];
    boxes.map((box) => {
      if (box.pieces < 13) {
        [...arr, box];
      }
    });

    const sum = arr.reduce((acc, item) => acc + item.prix, 0);
    return { sum, arr };
  }

  const { sum, arr } = lessThanThirteen();

  return (
    <ScrollView>
      <SafeAreaProvider>
        <SafeAreaView>
          {toggle ? (
            <FlatList
              data={boxes}
              renderItem={(product) => (
                <View key={product.item.id} id="all">
                  <Text>{product.item.nom}</Text>
                  <Image
                    source={images[product.item.image as keyof typeof images]}
                  />
                  <Text>Prix: {product.item.prix}€</Text>
                  <Text>
                    Liste des saveurs :{" "}
                    {product.item.saveurs.map((item) => (
                      <Text style={{ padding: 4 }}>{item}</Text>
                    ))}
                  </Text>
                </View>
              )}
            />
          ) : (
            <FlatList
              data={filteredBoxes()}
              renderItem={(product) => (
                <View key={product.item.id} id="saumon">
                  <Text>{product.item.nom}</Text>
                  <Image
                    source={images[product.item.image as keyof typeof images]}
                  />
                  <Text>Prix: {product.item.prix}€</Text>
                  <Text>
                    Saveurs :{" "}
                    {product.item.saveurs.map((item) => (
                      <Text style={{ padding: 4 }}>{item}</Text>
                    ))}
                  </Text>
                </View>
              )}
            />
          )}
          <Pressable
            onPress={() => setToggle(!toggle)}
            style={{ padding: 4, backgroundColor: "red", width: 120 }}
          >
            <Text>
              {toggle ? "Seulement les Spring Saumon Avocat" : "Afficher tout"}
            </Text>
          </Pressable>
          <View>
            <Text>
              Somme à payer pour l'ensemble des boxes ayant moins de 13 pièces :{" "}
              {sum}
            </Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
});
