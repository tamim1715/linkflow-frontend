import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

interface Props {
  visible: boolean;
  children: React.ReactNode;
  overlayOpacity?: number;
  onClose?: () => void;
}

export default function BottomSheet({
  visible,
  children,
  overlayOpacity = 0.6,
  onClose,
}: Props) {
  const translateY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: visible ? 0 : height,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  if (!visible) return null;

  return (
    <View
      style={[
        styles.overlay,
        { backgroundColor: `rgba(0,0,0,${overlayOpacity})` },
      ]}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1 }} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.sheet,
          { transform: [{ translateY }] },
        ]}
      >
        <View style={styles.drag} />
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#F2F2F2",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  drag: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#C7C7CC",
    alignSelf: "center",
    marginBottom: 20,
  },
});
