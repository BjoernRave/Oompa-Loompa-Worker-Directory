import React, { Component } from "react";
import { fetchWorker } from "../actions";
import { connect } from "react-redux";
import styled from "styled-components";
import ListItem from "./ListItem";
import Icon from "../images/ic_search.png";

let loadingNewData = false;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      worker: "",
      query: ""
    };
    this.searchWorker = this.searchWorker.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchWorker(false);
    this.mapWorker(this.props.worker.results);
    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  mapWorker(workerData) {
    const worker = workerData.map(details => {
      return (
        <ListItem
          key={details.id}
          id={details.id}
          image={details.image}
          firstName={details.first_name}
          lastName={details.last_name}
          gender={details.gender}
          profession={details.profession}
        />
      );
    });
    this.setState({ worker });
  }

  searchWorker(e) {
    const input = e.target.value.toLowerCase();
    console.log(input);
    this.setState({ query: input });

    let filteredWorker = this.props.worker.results.filter(item => {
      if (
        item.first_name.toLowerCase().includes(input) ||
        item.last_name.toLowerCase().includes(input) ||
        item.profession.toLowerCase().includes(input)
      ) {
        return true;
      }
      return false;
    });
    this.mapWorker(filteredWorker);
  }

  onScroll = async () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 700 &&
      !loadingNewData &&
      this.props.worker.current < 20 &&
      this.state.query === ""
    ) {
      loadingNewData = true;
      await this.props.fetchWorker(true);
      this.mapWorker(this.props.worker.results);
      loadingNewData = false;
    }
  };

  render() {
    return (
      <MainPage>
        <SearchBox
          value={this.state.query}
          onChange={this.searchWorker}
          placeholder="Search..."
        />
        <SearchIcon src={Icon} alt="searchIcon" />
        <h1>Find your Oompa Loompa</h1>
        <h3>There are more than 100k</h3>
        <WorkerListBox>{this.state.worker}</WorkerListBox>
      </MainPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    worker: state.worker
  };
};

export default connect(
  mapStateToProps,
  { fetchWorker }
)(App);

const MainPage = styled.div`
  padding-top: 100px;
  text-align: center;
`;

const WorkerListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 40px;
  padding: 40px;
`;

const SearchBox = styled.input`
  padding: 7px;
  border-radius: 8px;
  box-shadow: unset;
  border: 1px solid black;
`;

const SearchIcon = styled.img`
  height: 20px;
  margin-left: -30px;
  margin-bottom: -5px;
  cursor: pointer;
`;
