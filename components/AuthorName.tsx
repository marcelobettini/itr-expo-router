import { memo } from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "../styles";
import { User } from "../entities/User";
import { router } from "expo-router";

function AuthorName(author: User) {
  const handlePress = () => {
    router.push({
      pathname: `/authorDetails/${author.id}`,
      params: {
        name: author.name,
        username: author.username,
        email: author.email,
      },
    });
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.articleTitle}>{author.name}</Text>
    </TouchableOpacity>
  );
}
export default memo(AuthorName);
