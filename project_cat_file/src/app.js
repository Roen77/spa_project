import { getNodeList } from "./api";
import Breadcrumb from "./components/Breadcrumb";
import ImageView from "./components/ImageView";
import Nodes from "./components/Nodes";

export default function App({ $target }) {
  this.state = {
    nodes: [],
    depth: [],
    depthCount: 0,
    isRoot: true,
    selectedFilePath: "",
  };

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    $target.innerHTML = "";
    this.render();
  };

  this.getData = async () => {
    const data = await getNodeList();
    this.setState({
      nodes: data,
      depth: data,
      isRoot: true,
      depthCount: 0,
    });
  };
  this.getDetailData = async (id) => {
    const data = await getNodeList(id);
    console.log("data", id, data);

    let directory = [];

    if (!this.state.depth.filter((v) => v.id === data[0].id).length) {
      directory = data.filter((v) => v.type !== "FILE");
    }

    this.setState({
      depth: [
        ...(this.state.isRoot
          ? this.state.depth.filter((v) => v.id === id)
          : this.state.depth),
        ...directory,
      ],
      isRoot: false,
      nodes: data,
    });
  };

  const onClose = () => {
    this.imageView.setState("");
  };

  const onClickNode = async ({ id, type }) => {
    if (!id) {
      if (this.state.depthCount > 1) {
        await this.getDetailData(this.state.depth[0].id);
        this.setState({
          depthCount: this.state.depthCount - 1,
        });
      } else {
        await this.getData();
      }
      //   await this.getData();
      return;
    }
    if (type === "DIRECTORY") {
      await this.getDetailData(id);
      this.setState({
        depthCount: this.state.depthCount + 1,
      });
    } else if (type === "FILE") {
      const selectedFile = this.state.nodes.filter((v) => v.id === id);
      this.imageView.setState(
        selectedFile.length ? selectedFile[0].filePath : ""
      );
    }
  };
  this.getData();
  this.render = async () => {
    this.breadcrumb = new Breadcrumb({
      $target,
      initialState: this.state,
    });
    this.nodes = new Nodes({
      $target,
      initalState: this.state,
      onClick: onClickNode,
    });
    this.imageView = new ImageView({
      $target,
      initialState: "",
      onClose,
    });
  };

  this.render();
}
