import axios from "axios"

const Http = axios.create()

class Service {
  protected static Http = Http
}

Http.defaults.baseURL = 'http://localhost:8080'

export default Service