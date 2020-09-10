import Vue from "vue";
import Vuex from "vuex";
// import axios from "axios";
Vue.use(Vuex);

const checkStatus = (value, state) => {
  var comp = [];
  // var top5 = [];
  state.auth.user.tasks.forEach((e) => {
    if (e.status == value) {
      comp.push(e.name);
    }
  });

  var top5 = comp.filter((e, i) => i <= 4);
  return {
    top5,
    comp,
  };
};

const createStore = () => {
  return new Vuex.Store({
    state: {
      tasks: [],
      noOfTasks: null,
      snackbar: { show: false, message: null, color: null },
      task: {
        name: "",
        status: false,
        id: null,
      },
    },
    getters: {
      getStatus(state) {
        return state.snackbar;
      },
      getTask(state) {
        return {
          name: state.task.name,
          // status: state.task.status,
          id: state.task.id,
        };
      },
      getTaskStatus(state) {
        return state.task.status;
      },
      completedTasks(state) {
        return checkStatus(true, state);
      },
      inCompletedTasks(state) {
        return checkStatus(false, state);
      },
    },
    mutations: {
      updateStatus(state, payload) {
        state.task.status = payload;
      },
      setSnackbar(state, payload) {
        state.snackbar.show = true;
        state.snackbar.message = payload.message;
        state.snackbar.color = payload.color || "green";
      },
      editTask(state, payload) {
        state.task.name = payload.name;
        // state.task.status = payload.status;
        state.task.id = payload.id;
      },
      setAllTasks(state, payload) {
        state.tasks = payload;
      },
    },
    actions: {
      getSnackbar({ commit }, payload) {
        commit("setSnackbar", payload);
      },
      setTask({ commit }, payload) {
        commit("editTask", payload);
      },
      getAllTasks({ commit }, payload) {
        commit("setAllTasks", payload);
      },
    },
  });
};

export default createStore;
