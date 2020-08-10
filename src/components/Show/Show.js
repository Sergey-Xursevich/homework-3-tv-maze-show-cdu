import React, { Component } from "react";
import { getShowInfo } from "../../api";
import "./Show.css";

export default class Show extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showId: '',
      data: {}
    }
  }

  componentDidUpdate() {
    const { showId } = this.props;

    if (showId && showId !== this.state.showId) {
      getShowInfo(this.props.showId).then(res => {
        this.setState({
          showId: this.props.showId,
          data: res,
        })
      });
    }
  }
  
  render() {
    const { showId, data: { image, name, genres, summary } } = this.state;

    return (
      showId ? 
        <div className="show">
          <img className="show-image" src={image["medium"]} alt={name} />
          <h2 className="show-label t-show-name">{name}</h2>
          <p className="show-text t-show-genre">
            <b>Жанр: </b>
            {genres.join(", ")}
            </p>
          <p className="show-text t-show-summary" dangerouslySetInnerHTML={{ __html: summary }} />
        </div>
        : <p className="show-inforation t-show-info">Шоу не выбрано</p>
    )
  }
}