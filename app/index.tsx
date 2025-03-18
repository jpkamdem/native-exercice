import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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
                  <Text>
                    Prix: {product.item.prix}€
                  </Text>
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
                  <Text>
                    Prix: {product.item.prix}€
                  </Text>
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
