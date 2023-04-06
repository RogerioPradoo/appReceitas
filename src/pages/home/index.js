
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { Logo } from '../../components/logo/index'
import api from '../../services/api';
import { FoodList } from '../../components/logo/foodList/index'
import { useNavigation } from '@react-navigation/native';
import { Text as MotiText } from 'moti'

export function Home() {

    const [input, setInput] = useState("");
    const [dados, setDados] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        async function fetchApi() {
            const response = await api.get("/foods")
            setDados(response.data);
        }

        fetchApi();
    }, [])

    function handleSearch() {
        if (!input) return;

        let inputs = input;

        setInput("");

        navigation.navigate("Search", { name: inputs });
    }

    return (
        <SafeAreaView style={styles.container}>
            <Logo />

            <MotiText style={styles.title}
                from={{
                    opacity: 0,
                    translateY: 15
                }}
                animate={{
                    opacity: 1,
                    translateY: 0
                }}
                transition={{
                    delay: 100,
                    type: "timing",
                    duration: 650
                }}
            >Encontre a receita</MotiText>
            <MotiText style={styles.title}
                from={{
                    opacity: 0,
                    translateY: 18
                }}
                animate={{
                    opacity: 1,
                    translateY: 0
                }}
                transition={{
                    delay: 200,
                    type: "timing",
                    duration: 850
                }}
            >que combina com você</MotiText>

            <View style={styles.forme}>
                <TextInput
                    placeholder='Digite o nome da comida...'
                    style={styles.input}
                    value={input}
                    onChangeText={(text) => setInput(text)}
                />
                <TouchableOpacity
                    onPress={handleSearch}
                >
                    <Ionicons name="search" size={28} color="#4CBE6C" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={dados}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <FoodList data={item} />}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F3F9FF',
        flex: 1,
        paddingTop: 36,
        paddingStart: 14,
        paddingEnd: 14
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#0e0e0e"
    },
    forme: {
        backgroundColor: "#FFF",
        width: '100%',
        borderRadius: 8,
        marginTop: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#ECECEC",
        paddingLeft: 8,
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        width: '90%',
        backgroundColor: '#FFF',
        height: 54,
        maxWidth: '90%'
    }
});