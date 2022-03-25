export default {
  LOGIN({ commit }, authData) {
    return new Promise((resolve, reject) => {
      this.$httpClient
        .post("/api/utils/authentication", {
          email: authData.email,
          password: authData.password,
        })
        .then((response) => {
          console.log(response);
          commit(`LOGIN`, response.data.user);
          this.$httpClient.defaults.headers.common.Authorization = `Bearer ${response.data.user.tokenSession}`;
          console.log(this.$httpClient.defaults.headers.common.Authorization);
          resolve();
        })
        .catch((err) => reject(err.message));
    });
  },
  REGISTER({ commit }, user) {
    return new Promise((resolve, reject) => {
      this.$httpClient
        .post("/api/utils/register", {user})
        .then((response) => {
          console.log('response.data.tokenSession',response);
          console.log(commit);

          const dataSession = {
            domain: "localhost",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          };

          this.$cookies.set("tokenSession", response.data, dataSession);

          commit(`REGISTER`, response.data.user);
          this.$httpClient.defaults.headers.common.Authorization = `Bearer ${response.data.user.tokenSession}`;
          resolve();
        })
        .catch((err) => reject(err.message));
    });
  },
  LOGOUT({ commit }) {
    return new Promise((resolve, reject) => {
      commit(`LOGOUT`);
      this.$cookies.remove("tokenSession");
      delete this.$httpClient.defaults.headers.common.Authorization;

      resolve();
    });
  },
};
