import { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import info from "../core/utils/info";
import EditorProfileView from "./views/EditorProfile.view";
import EditorsListView from "./views/EditorsList.view";
import Home from "./views/Home.view";
import NotFound404 from "./views/NotFound404.view";
import PostCreateView from "./views/PostCreate.view";
import PostEditView from "./views/PostEdit.view";

export default function App () {
  useEffect(() => {
    window.onunhandledrejection = function (error: PromiseRejectionEvent) {
      console.log(error)
      info({
        title: error.reason.response?.data.title || 'Erro',
        description: error.reason.response?.data.detail || error.reason.message
      })
    }
  }, [])

  return <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/editores" exact component={EditorsListView} />
      <Route path="/editores/:id" exact component={EditorProfileView} />
      <Route path="/posts/criar" exact component={PostCreateView} />
      <Route path="/posts/editar/:id" exact component={PostEditView} />
      <Route component={NotFound404} />
    </Switch>
  </BrowserRouter>
}