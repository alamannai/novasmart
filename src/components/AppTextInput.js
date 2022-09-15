import React from "react";
import { View, TextInput, StyleSheet } from "react-native";


export default function AppTextInput({placeholderText,error}) {
  return (
    <>
      <View
        style={[
          styles.container, {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }
        ]}
      >
        <TextInput placeholder={placeholderText} error />
      </View>
      {error}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fafafa',
    marginBottom: 15,
  },
});
