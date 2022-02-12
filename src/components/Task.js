import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AddTask from "./AddTask";
import tempData from "../../tempData";
import { LinearGradient } from "expo-linear-gradient";
import TaskList from "./TaskList";

export default class Task extends React.Component {
  state = {
    addTodoVisible: false,
    lists: tempData,
  };
  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  renderList = (list) => {
    return <TaskList list={list} updateList={this.updateList} />;
  };

  addList = (list) => {
    this.setState({
      lists: [
        ...this.state.lists,
        { ...list, id: this.state.lists.length + 1, todos: [] },
      ],
    });
  };

  updateList = (list) => {
    this.setState({
      lists: this.state.lists.map((item) => {
        return item.id === list.id ? list : item;
      }),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
        >
          <AddTask
            closeModal={() => this.toggleAddTodoModal()}
            addList={this.addList}
          />
        </Modal>

        <View style={{ flexDirection: "row" }}>
          <View style={styles.divider} />
          <Text style={styles.title}>宿題のリスト</Text>
          <View style={styles.divider} />
        </View>

        <View>
          <Text>Lista de Tareas</Text>
        </View>

        <View style={{ marginVertical: 48, alignItems: "center" }}>
          <Text style={{ marginBottom: "3%", marginTop:-30 }}>Agrega aquí tus tareas</Text>
          <TouchableOpacity onPress={() => this.toggleAddTodoModal()}>
            <LinearGradient
              colors={["#3A0CA3", "#F72585"]}
              style={{
                width: 55,
                height: 55,
                //backgroundColor: "#F72585",
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="plus" size={16} color={"#fff"} />
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.add}> 追加</Text>
          <Text>Añadir</Text>
        </View>

        <View style={{ height: 275, paddingLeft: 32, marginTop:-25 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 70,
  },
  divider: {
    backgroundColor: "#000",
    height: 1,
    flex: 1,
    alignSelf: "center",
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: "#000",
    paddingHorizontal: 64,
  },
  add: {
    color: "#000",
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
});
