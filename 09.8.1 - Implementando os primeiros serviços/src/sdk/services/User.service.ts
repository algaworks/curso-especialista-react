import { User } from "../@types";
import Service from "../Service";

class UserService extends Service {
  static getAllEditors () {
    return this.Http
      .get<User.EditorSummary[]>('/users/editors')
      .then(this.getData)
  }

  static getExistingEditor (editorId: number) {
    return this.Http
      .get<User.EditorDetailed>(`/users/editors/${editorId}`)
      .then(this.getData)
  }

  static getDetailedUser (userId: number) {
    return this.Http
      .get<User.Detailed>(`/users/${userId}`)
      .then(this.getData)
  }
}

export default UserService