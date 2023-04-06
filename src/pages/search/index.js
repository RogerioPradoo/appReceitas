import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import api from '../../services/api';
import { FoodList } from '../../components/logo/foodList';


export function Search() {
    const route = useRoute();
    const [receipes, setReceipes] = useState([]);

    useEffect(() => {
        async function fetchReceipes() {
            const response = await api.get(`/foods?name_like=${route.params?.name}`)
            setReceipes(response.data);
        }

        fetchReceipes();
    }, [route.params?.name])


    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={receipes}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <FoodList data={item} />}
                ListEmptyComponent={() => <Text styles={styles.text}>Não encontramos o que está buscando...</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f3f9ff',
        flex: 1,
        paddingStart: 14,
        paddingEnd: 14,
        paddingTop: 14
    },
    title: {
        fontSize: 24,
        marginTop: 200,
        color: '#000'
    },
    text: {
        fontSize: 16
    }
});


