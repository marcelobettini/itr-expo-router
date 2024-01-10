import { Text, ActivityIndicator, FlatList } from "react-native";
import { styles } from "../../styles";
import useFetch from "../../hooks/useFetch";
import { Post } from "../../entities/Post";
import { SafeAreaView } from "react-native-safe-area-context";
import PostTitle from "../../components/PostTitle";
export default function index() {
  const { data, isLoading, error } = useFetch<Post[]>("posts");
  return (
    <SafeAreaView style={styles.container}>
      <Text>All articles</Text>
      {isLoading && <ActivityIndicator />}
      {error && <Text>{error}</Text>}
      {data ? (
        <FlatList
          data={data}
          renderItem={({ item }) => <PostTitle {...item} />}
          keyExtractor={(item: Post) => item.id.toString()}
        />
      ) : (
        <ActivityIndicator />
      )}
    </SafeAreaView>
  );
}
