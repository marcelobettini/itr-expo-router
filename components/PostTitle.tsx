import { memo } from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "../styles";
import { Post } from "../entities/Post";
import { router } from "expo-router";

function PostTitle(post: Post) {
  const handlePress = () => {
    router.push({
      pathname: "/postDetails",
      params: {
        id: post.id,
        userId: post.userId,
        title: post.title,
        body: post.body,
      },
    });
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.articleTitle}>{post.title}</Text>
    </TouchableOpacity>
  );
}
export default memo(PostTitle);
