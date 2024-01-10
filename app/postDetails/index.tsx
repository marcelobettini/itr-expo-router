import React, { useEffect, useState, useRef, PropsWithChildren } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  Animated,
  ViewStyle,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { styles } from "../../styles";
import { User } from "../../entities/User";
import { Comment } from "../../entities/Comment";
type FadeInViewProps = PropsWithChildren<{ style: ViewStyle }>;

const FadeInView: React.FC<FadeInViewProps> = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  // *see readme.md

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default function PostDetails() {
  const { id, userId, title, body } = useLocalSearchParams();
  const [author, setAuthor] = useState<User | null>(null);
  const [loadingAuthor, setLoadingAuthor] = useState<boolean>(true);
  const [comments, setComments] = useState<Comment[] | null>(null);

  const [loadingComments, setLoadingComments] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        const data = await response.json();
        setAuthor(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingAuthor(false);
      }
    };
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );
        const data = await response.json();
        setComments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchUser();
    fetchComments();
  }, [userId]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.articleTitle}>{body}</Text>
      {!author ? (
        <ActivityIndicator size={"large"} color={"pink"} />
      ) : (
        <FadeInView style={{ marginTop: 20 }}>
          <View>
            <Text style={styles.author}>Written by</Text>
            <Text style={styles.author}>{author?.name}</Text>
          </View>
        </FadeInView>
      )}
      {!comments ? (
        <ActivityIndicator size={"large"} color={"rebeccapurple"} />
      ) : (
        <FadeInView style={{ marginTop: 20, flex: 1 }}>
          <Text
            style={{
              color: "rebeccapurple",
              fontSize: 16,
              marginBottom: 10,
              textDecorationLine: "underline",
            }}
          >
            Comments {comments.length}
          </Text>
          <ScrollView>
            {comments?.map((c) => (
              <View style={styles.commentContainer} key={c.id}>
                <Text style={styles.commentBody}>{c.body}</Text>
                <Text style={styles.commentEmail}>{c.email}</Text>
              </View>
            ))}
          </ScrollView>
        </FadeInView>
      )}
    </SafeAreaView>
  );
}
