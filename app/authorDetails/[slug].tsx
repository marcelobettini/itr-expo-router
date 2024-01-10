import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "../../styles";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import useFetch from "../../hooks/useFetch";
import { Post } from "../../entities/Post";
import PostTitle from "../../components/PostTitle";
export default function AuthorDetails() {
  const { slug, name, username, email } = useLocalSearchParams();
  const { data, isLoading, error } = useFetch<Post[]>(`posts?userId=${slug}`);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.authorDetailsContainer}>
        <Text style={styles.title}>All Articles by {name}</Text>
        <Text style={styles.authorDetailsText}>@{username}</Text>
        <Text style={styles.authorDetailsText}>
          <MaterialIcons name="email" size={20} color="gray" />
          {email}
        </Text>
      </View>
      {isLoading && <ActivityIndicator />}
      {error && <Text>{error}</Text>}
      {data ? (
        <FlatList
          data={data}
          renderItem={({ item }) => <PostTitle {...item} />}
          ItemSeparatorComponent={() => (
            <View
              style={{
                borderWidth: 0.5,
                borderColor: "rgba(0, 0, 0, 0.219)",
                marginBottom: 15,
              }}
            />
          )}
          keyExtractor={(item) => item.id.toString()} //keyExtractor should return string
        />
      ) : (
        <ActivityIndicator />
      )}
    </SafeAreaView>
  );
}
