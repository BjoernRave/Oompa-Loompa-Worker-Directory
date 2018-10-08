import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchDetails } from "../actions";

class WorkerDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moreDetails: false
    };
  }

  componentDidMount() {
    this.props.fetchDetails(this.props.match.params.id);
  }

  render() {
    if (this.props.details !== null) {
      const details = this.props.details;
      return (
        <DetailPage>
          <h1>
            Worker Details of {details.first_name} {details.last_name}
          </h1>
          <SmallDetails>
            <Image src={details.image} alt="Oompa Loompa Worker" />

            <table>
              <tr>
                <td>Profession:</td>
                <td>{details.profession}</td>
              </tr>
              <tr>
                <td>Gender:</td>
                <td>{details.gender === "M" ? "Male" : "Female"}</td>
              </tr>
              <tr>
                <td>Height: </td>
                <td>{details.height}</td>
              </tr>
              <tr>
                <td>Origin:</td>
                <td> {details.country}</td>
              </tr>
              <tr>
                <td>Age:</td>
                <td>{details.age}</td>
              </tr>
            </table>
          </SmallDetails>

          <DetailsButton
            onClick={() => {
              this.setState({ moreDetails: !this.state.moreDetails });
            }}
          >
            {this.state.moreDetails
              ? "Too many details"
              : "Give me all the details"}
          </DetailsButton>

          {this.state.moreDetails && (
            <>
              <p>favorite Color:</p>
              <p> {details.favorite.color}</p>
              <p>favorite Food:</p>
              <p> {details.favorite.food}</p>
              <p>favorite Random String:</p>
              <p>{details.favorite.random_string}</p>
              <p>favorite Song:</p>
              <p>{details.favorite.song}</p>
              <p>Quota:</p>
              <p>{details.quota}</p>
            </>
          )}
        </DetailPage>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    details: state.details
  };
};

export default connect(
  mapStateToProps,
  { fetchDetails }
)(WorkerDetails);

const DetailPage = styled.div`
  padding-top: 100px;
  padding: 50px;
  text-align: center;
  word-break: break-all;
`;

const SmallDetails = styled.div`
  padding-bottom: 30px;
  display: flex;
  flex-direction: row;
  font-size: 1.3rem;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  height: 300px;
  padding-right: 40px;
`;

const DetailsButton = styled.button`
  font-size: 1.3rem;
  padding: 8px;
  border-radius: 5px;
  box-shadow: unset;
  border: 1px solid black;
  cursor: pointer;
`;
